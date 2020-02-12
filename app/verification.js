import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, KeyboardAvoidingView } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import SafeAreaView from 'react-native-safe-area-view'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const { width, height } = Dimensions.get("window")


class Verification extends Component {
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#f08a5d' }}>
                <KeyboardAvoidingView>
                    <View>
                        <Text style={styles.header}>Please Check Your Email and Input the Code We've Sent</Text>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        )
    }
}
export default Verification

const styles= StyleSheet.create({
    header:{
        fontSize:20,
        // alignItems: 'center',
        // justifyContent:'center',
        textAlign:'center',
        fontWeight: 'bold',
        color: 'white'
    }
})