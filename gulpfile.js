const gulp = require('gulp');
const runSequence = require('run-sequence');
const concat = require('gulp-concat');
const jeditor = require('gulp-json-editor');
const run = require('gulp-run');

// dev dependencies
const devDependencies = {
  "jest-expo": "~27.0.0",
  "react-native-scripts": "1.14.0",
  "react-test-renderer": "16.3.1"
};
// dependencies for npm publishing
const npmDeps = {
    "lodash": "^4.17.10",
    "react": "16.3.1",
    "react-native": "~0.55.2",
    "prop-types": "^15.6.2"
};
// additional dependencies for expo app
const expoDeps = {
    "expo": "^27.0.1",
    "babel-loader": "^7.1.5",
    "expo": "^27.0.1",
    "gulp": "^3.9.1",
    "gulp-concat": "^2.6.1",
    "gulp-json-editor": "^2.4.2",
    "gulp-run": "^1.7.1",
    "lodash": "^4.17.10",
    "react": "16.3.1",
    "react-native": "~0.55.2",
    "prop-types": "^15.6.2",
    "run-sequence": "^2.2.1",
};

// main for npm publishing
const npmMain = 'index.js';
// main for expo app
const expoMain = "./node_modules/react-native-scripts/build/bin/crna-entry.js";

const paths = {
  src: './src/',
  build: './dist/'
};

/****package.json stuff****/

// read the package.json and update it for npm publishing
gulp.task('forNPM', done => {
  gulp
    .src('./package.json')
    .pipe(
      jeditor(json => {
        json.peerDependencies = npmDeps;
        json.main = npmMain;
        delete json.dependencies;
        delete json.devDependencies;

        return json;
      })
    )
    .pipe(concat('package.json'))
    .pipe(gulp.dest('./'));
  done();
});

gulp.task('npm-publish', done => {
  return run('npm publish').exec();
  done();
});

gulp.task('forExpo', done => {
  gulp
    .src('./package.json')
    .pipe(
      jeditor(json => {
        json.dependencies = expoDeps;
        json.devDependencies = devDependencies;
        json.main = expoMain;
        delete json.peerDependencies;

        return json;
      })
    )
    .pipe(concat('package.json'))
    .pipe(gulp.dest('./'));
  done();
});

gulp.task('publish', done => {
  runSequence(['forNPM', 'npm-publish', 'forExpo'], done);
});