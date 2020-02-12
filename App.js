import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, AppRegistry } from 'react-native';
import { NativeRouter, Route, Link } from 'react-router-native'
// import { TextInput } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import SafeAreaView from 'react-native-safe-area-view'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Index from './app/index'
import Verification from './app/verification'


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

function Login() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>asdasdasd</Text>
      </View>
    </SafeAreaView>
  );
}

function Home({navigation}) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home</Text>
      </View>
    </SafeAreaView>
  );
}

export default class App extends Component {

  render() {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Index" component={Index} options={{headerShown: false}}/>
            <Stack.Screen name="Verification" component={Verification} options={{headerShown: false}}/>
          </Stack.Navigator>
        </NavigationContainer>    
      </SafeAreaProvider>
    );
  }
}

const Stack = createStackNavigator()

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
    shadowOffset: { width: 10, height: 10 },
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
