import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

import AlphaScrollFlatList from '../src/components/AlphaScrollFlatList';
import people from '../src/constants/people';

const WIDTH = Dimensions.get('window').width;
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50
  },
  itemContainer: {
    width: WIDTH,
    flex: 1,
    flexDirection: 'column',
    height: ITEM_HEIGHT
  },
  itemTitle: {
    fontWeight: 'bold',
    color: '#888',
    padding: 5
  },
  itemSubtitle: {
    color: '#ddd',
    padding: 5,
    paddingTop: 0
  }
});
