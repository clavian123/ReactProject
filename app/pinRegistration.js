import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, KeyboardAvoidingView } from 'react-native';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import SafeAreaView from 'react-native-safe-area-view'


class PinRegistration extends Component {
    constructor(){
        super();
        this.submit = () =>{
            const { navigate } = this.props.navigation;
            navigate('Login');
        }
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1}}>
                <KeyboardAvoidingView behavior="padding">
                    <View style={styles.headerContainer}>
                        <Text style={styles.header}>Please Input Your PIN Number</Text>
                    </View>
                    <TextInput style={styles.input} keyboardType='numeric' maxLength={6}/>
                    <TapGestureHandler onHandlerStateChange={this.submit}>
                        <View style={{ ...styles.button, elevation: 2, marginTop: 150 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>SUBMIT</Text>
                        </View>
                    </TapGestureHandler>
                </KeyboardAvoidingView>
            </SafeAreaView>
        )
    }
}
export default PinRegistration

const styles= StyleSheet.create({
    headerContainer:{
        // backgroundColor: 'red',
        height: 200,
        alignItems:'center',
        justifyContent: 'center',
    },

    header:{
        fontSize:30,
        textAlign:'center',
        fontWeight: 'bold',
        color: 'black'
    },

    input: {
        fontSize: 20,
        height: 70,
        borderRadius: 10,
        // borderWidth: 1,
        marginHorizontal: 20,
        paddingLeft: 10,
        marginVertical: 15,
        borderColor: 'rgba(0,0,0,0.2)',
        textAlign: 'center',
        borderBottomWidth:2,
        borderBottomColor:'#b83b5e',
    },

    button: {
        backgroundColor: '#b83b5e',
        height: 70,
        marginHorizontal: 20,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },


})