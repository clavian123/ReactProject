import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, KeyboardAvoidingView, Alert, ToastAndroid } from 'react-native';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import SafeAreaView from 'react-native-safe-area-view';
import axios from 'axios';

class PinRegistration extends Component {
    state = {
        PIN: '',
        PAN: '',
        cif_code: ''
    }
    constructor() {

        super();

        this.submit = ({ nativeEvent }) => {
            this.setState({
                PAN: this.props.route.params.PAN,
                cif_code: this.props.route.params.cif_code
            })

            if (nativeEvent.state === State.END) {

                const { navigate } = this.props.navigation;
                let pin = this.state.PIN
                let pan = this.state.PAN
                let cif_code = this.state.cif_code
                let num = /^[0-9]+$/
                // console.log(pin, pan, cif_code)


                if (pin.length == 0) {
                    ToastAndroid.show('PIN must not be empty', ToastAndroid.SHORT);
                } else if (pin.length != 6) {
                    ToastAndroid.show('PIN must have 6 characters', ToastAndroid.SHORT);
                } else if (!num.test(pin)) {
                    ToastAndroid.show('PIN must be numeric', ToastAndroid.SHORT)
                } else {

                    axios.post("http://192.168.43.220:8080/checkPin", {
                        cif_code: cif_code,
                        pan: pan,
                        pin: pin
                    }).then(res => {
                        const data = res.data
                        if (data.cekPin == false) {
                            ToastAndroid.show("PIN yang anda masukkan tidak valid", ToastAndroid.SHORT)
                        } 
                        else {
                            if (data.type == "Registration") {
                                navigate('Registration', {
                                    cif_code: cif_code
                                })
                            }
                            else {
                                navigate('ChangePassword', {
                                    cif_code: cif_code
                                })
                            }
                        }
                    }).catch(function (error) {
                        ToastAndroid.show(error, ToastAndroid.SHORT)
                    })


                }
            }
        }
    }



    render() {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
                <KeyboardAvoidingView behavior="padding">
                    <View style={styles.headerContainer}>
                        <Text style={styles.header}>Please Input Your ATM PIN Number</Text>
                    </View>
                    <TextInput secureTextEntry={true} style={styles.input} keyboardType='numeric' maxLength={6}
                        placeholder="PIN Number" onChangeText={(text) => this.setState({ PIN: text })} />
                    <TapGestureHandler onHandlerStateChange={this.submit}>
                        <View style={{ ...styles.button }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>SUBMIT</Text>
                        </View>
                    </TapGestureHandler>
                </KeyboardAvoidingView>
            </SafeAreaView>
        )
    }
}
export default PinRegistration

const styles = StyleSheet.create({
    headerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    header: {
        fontSize: 30,
        textAlign: 'center',
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
        borderBottomWidth: 2,
        borderBottomColor: '#b83b5e',
    },

    button: {
        marginTop: 30,
        elevation: 2,
        backgroundColor: '#b83b5e',
        height: 70,
        marginHorizontal: 20,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },


})