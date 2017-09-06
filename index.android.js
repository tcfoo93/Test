/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import ReactNative, { AppRegistry, ListView, View, Alert, TextInput } from 'react-native';
import * as firebase from 'firebase';
const StatusBar = require('./component/StatusBar');
const ActionButton = require('./component/ActionButton');
const ListItem = require('./component/ListItem');
const styles = require('./styles.js');

const firebaseConfig = {
  apiKey: "AIzaSyClTY1jT1dItc3-KIt4MLKjsh0hql2g7Ug",
  databaseURL: "https://test-3b2b1.firebaseio.com/",
  storageBucket: "gs://test-3b2b1.appspot.com/",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

class Test extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({
        newTitle: 'Hi',
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    this.itemsRef = this.getRef().child('items');

    this.itemsRef.set({
      title: "Hello World!",
      author: "Simon",
      location: {
        city: "Muenster",
        state: "Germany",
        zip: 48155
      }
    });
  }

  getRef() {
    return firebaseApp.database().ref();
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().title,
          _key: child.key
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });

    });
  }

  componentDidMount() {
    // When a todo is added
    this.itemsRef.on('child_added', (dataSnapshot) => {
      this.items.push({ id: dataSnapshot.key(), text: dataSnapshot.val() });
      this.setState({
        todoSource: this.state.todoSource.cloneWithRows(this.items)
      });
    });

    // When a todo is removed
    this.itemsRef.on('child_removed', (dataSnapshot) => {
      this.items = this.items.filter((x) => x.id !== dataSnapshot.key());
      this.setState({
        todoSource: this.state.todoSource.cloneWithRows(this.items)
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>

        <StatusBar title="Grocery List" />

        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          enableEmptySections={true}
          style={styles.listview} />

        <ActionButton onPress={this._addItem.bind(this)} title="Add" />

      </View>
    )
  }

  _addItem() {
    Alert.alert(
      'Add New Item',
      null,
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        {
          text: 'Add',
          onPress: (text) => {
            if (this.state.newTitle !== '') {
              this.itemsRef.push({
                todo: this.state.newTitle
              });
            }
          }
        },
      ],
      'plain-text'
    );
  }

  _renderItem(item) {

    const onPress = () => {
      Alert.alert(
        'Complete',
        null,
        [
          { text: 'Complete', onPress: (text) => this.itemsRef.child(item._key).remove() },
          { text: 'Cancel', onPress: (text) => console.log('Cancelled') }
        ]
      );
    };

    return (
      <ListItem item={item} onPress={onPress} />
    );
  }

}

// export default class Test extends Component {
//   render() {
//     let pic = {
//       uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
//     };
//     return (
//       <Image source={pic} style={{ width: 300, height: 150 }} />
//     );
//   }
// }

AppRegistry.registerComponent('Test', () => Test);
