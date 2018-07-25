const gulp = require('gulp');
const concat = require('gulp-concat');
const jeditor = require('gulp-json-editor');
const bump = require('gulp-bump');
const webpack_stream = require('webpack-stream');
const webpackConfig = require('./webpack.config');
const run = require('gulp-run');
const package = require('./package.json');

// dependencies for npm publishing
const npmDeps = {
    "lodash": "^4.17.10",
};
// additional dependencies for expo app
const expoDeps = {
    "expo": "^27.0.1",
    "react": "16.3.1",
    "react-native": "~0.55.2"
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

const updatePackageJSONforNPM = json => {};
// read the package.json and update it for npm publishing
gulp.task('forNPM', done => {
  gulp
    .src('./package.json')
    .pipe(bump())
    .pipe(
      jeditor(function(json) {
        json.dependencies = npmDeps;
        json.main = npmMain;
        return json;
      })
    )
    .pipe(concat('package.json'))
    .pipe(gulp.dest('./'));
  done();
});

// read and bump the package version in config.js so that it
// matches the version number about to be published
gulp.task('editConfig', done => {
  gulp
    .src('./config.js')
    .pipe(bump({ key: 'PACKAGE_VERSION' }))
    .pipe(concat('config.js'))
    .pipe(gulp.dest('./'));
  done();
});

// pack the files
gulp.task('build-package', done => {
  return webpack_stream(webpackConfig).pipe(gulp.dest(`${paths.build}`));
  done();
});

gulp.task('npm-publish', done => {
  return run('npm publish').exec();
  done();
});

gulp.task('git-add', done => {
  return run('git add .').exec();
  done();
});

gulp.task('git-commit', done => {
  return run(`git commit -m "Publishing version ${package.version} to npm"`).exec();
  done();
});

gulp.task('git-push', done => {
  return run('git push origin master').exec();
  done();
});

gulp.task('forExpo', done => {
  gulp
    .src('./package.json')
    .pipe(
      jeditor({
        dependencies: expoDeps,
        main: expoMain
      })
    )
    .pipe(concat('package.json'))
    .pipe(gulp.dest('./'));
  done();
});

gulp.task('publish', ['forNPM', 'editConfig', 'build-package', 'git-add', 'git-commit', 'git-push', 'npm-publish', 'forExpo']);