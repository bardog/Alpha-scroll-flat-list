# Alpha scroll flat list

This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

Below you'll find information about performing common tasks. The most recent version of this guide is available [here](https://github.com/react-community/create-react-native-app/blob/master/react-native-scripts/template/README.md).

## Description

This package provides an alphabetical scrolling capable FlatList. It supports thousands of items and runs smoothly on phones. It works the same 
as native FlatList works, has the same props, and we add a vertical sidebar where the user can slide to quickly navigate the list by letter. It supports 
changing color scheme, reversed list and different screen sizes on Android and iOS (portrait and landscape).

## Demo

https://expo.io/@nicolasepiscopo/alpha-scroll-flat-list

## Props

- hideSideBar (bool | default: false): if true the alphabetical sidebar wouldn't be shown.
- scrollKey (string | default: 'name'): the property name from the item list that would be used for scrolling.
- activeColor (string | default: '#52bad5'): the color of the alphabetical sidebar pointer.
- reverse (bool | default: false): by default the alphabetical sidebar is from A to Z. If reverse is true, it would be Z to A.
- itemHeight (number | default: 20): the height of each rendered item (this is needed to calculate the scrollToIndex on the FlatList).

## Installation

`npm install alpha-scroll-flat-list`

## Usage

```
import AlphaScrollFlatList from 'alpha-scroll-flat-list';
const ITEM_HEIGHT = 50;

export default class App extends React.Component {
  renderItem ({item}) {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text style={styles.itemSubtitle}>{item.company}</Text>
      </View>
    );
  }

  keyExtractor (item) {
    return item.id;
  }

  render() {
    return (
      <View style={styles.container}>
        <AlphaScrollFlatList
          keyExtractor={this.keyExtractor.bind(this)}
          data={people.sort((prev, next) => prev.name.localeCompare(next.name))}
          renderItem={this.renderItem.bind(this)}
          scrollKey={'name'}
          reverse={false}
          itemHeight={ITEM_HEIGHT}
        />
      </View>
    );
  }
}
```