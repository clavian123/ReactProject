import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ImageBackground, KeyboardAvoidingView, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Index from './app/index'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

export default class App extends Component {

  render() {
    return (
      <Index></Index>
    );
  }
}

const styles = StyleSheet.create({

  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 150,
    paddingTop: 30,
  },

  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: 'black',
  },

  subHeader: {
    fontSize: 17,
    color: 'black',
  },

  backgroundColor: {
    flex: 1,
    alignItems: 'center',
  },

  inputContainer: {
    width: 370,
    height: 65,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    borderColor: '#017df8',
    shadowOffset: {width: 10, height: 10},
    shadowColor: '#017df8',
    shadowOpacity: 1,
    shadowRadius: 10,
    borderWidth: 2,
    elevation: 5,
    marginBottom: 20
  },

  input: {
    width: '100%',
    height: '100%',
    fontSize: 18,
    textAlign: 'center',
    color: '#017df8',
  }
});
