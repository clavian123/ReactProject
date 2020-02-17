import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, KeyboardAvoidingView, Alert, ToastAndroid } from 'react-native';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import SafeAreaView from 'react-native-safe-area-view';

class PinRegistration extends Component {
    constructor(){
        super();
        this.submit = () =>{
            const { navigate } = this.props.navigation;
            let pin = this.state.pin
            if(pin == ''){
                ToastAndroid.show('PIN can not be empty', ToastAndroid.SHORT);
            }else if(pin.length < 6){
                ToastAndroid.show('PIN must have 6 characters', ToastAndroid.SHORT);
            }else if(isNaN(pin)){
                ToastAndroid.show('PIN must be numeric', ToastAndroid.SHORT);
            }else{
                navigate('Registration');
            }
        }
    }

    state = {
        pin: ''
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center'}}>
                <KeyboardAvoidingView behavior="padding">
                    <View style={styles.headerContainer}>
                        <Text style={styles.header}>Please Input Your PIN Number</Text>
                    </View>
                    <TextInput secureTextEntry={true} style={styles.input} keyboardType='numeric' maxLength={6} 
                    placeholder="PIN Number" onChangeText={(text) => this.setState({pin : text})}/>
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
export default PinRegistration

const styles= StyleSheet.create({
    headerContainer:{
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
        marginHorizontal: 20,
        paddingLeft: 10,
        marginVertical: 15,
        borderColor: 'rgba(0,0,0,0.2)',
        textAlign: 'center',
        borderBottomWidth:2,
        borderBottomColor:'#b83b5e',
    },

    button: {
        marginTop: 30,
        elevation:2,
        backgroundColor: '#b83b5e',
        height: 70,
        marginHorizontal: 20,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },


})