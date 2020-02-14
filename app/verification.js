import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, KeyboardAvoidingView } from 'react-native';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import SafeAreaView from 'react-native-safe-area-view'



class Verification extends Component {
    constructor() {
        super()
        this.submit = () => {
            const { navigate } = this.props.navigation;
            navigate('PinRegistration')
        }
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center'}}>
                <KeyboardAvoidingView behavior="padding">
                    <View style={styles.headerContainer}>
                        <Text style={styles.header}>Please Check Your Email and Input the Code We've Sent</Text>
                    </View>
                    <TextInput style={styles.input} keyboardType='numeric' maxLength={6} placeholder="Verification Code"/>
                    <TapGestureHandler onHandlerStateChange={this.submit}>
                        <View style={{ ...styles.button}}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>SUBMIT</Text>
                        </View>
                    </TapGestureHandler>
                </KeyboardAvoidingView>
            </SafeAreaView>
        )
    }
}
export default Verification

const styles= StyleSheet.create({
    headerContainer:{
        alignItems:'center',
        justifyContent: 'center',
    },

    header:{
        fontSize:25,
        textAlign:'center',
        fontWeight: 'bold',
        color: 'black',
        marginHorizontal: 10
    },

    input: {
        fontSize: 20,
        height: 70,
        borderRadius: 10,
        marginHorizontal: 20,
        paddingLeft: 10,
        marginVertical: 15,
        borderColor: 'rgba(0,0,0,0.2)',
        textAlign: 'center',
        borderBottomColor:'#b83b5e',
        borderBottomWidth: 2
    },

    button: {
        backgroundColor: '#b83b5e',
        height: 70,
        marginHorizontal: 20,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:30,
        elevation:2,
    },


})