import React, { Component } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ToastAndroid, NativeEventEmitter } from 'react-native';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import SafeAreaView from 'react-native-safe-area-view';
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios'

class ChangePassword extends Component {



    constructor() {
        super()

        this.state = {
            cif_code: '',
            password: '',
            confPassword: ''
        }

        this.submit = ({ nativeEvent }) => {

            this.setState({
                cif_code: this.props.route.params.cif_code
            })

            if (nativeEvent.state == State.END) {
                const { navigate } = this.props.navigation
                let password = this.state.password
                let confPassword = this.state.confPassword
                let cif_code = this.state.cif_code

                if (password != confPassword) {
                    ToastAndroid.show("Password dan Confirm Password harus sama", ToastAndroid.SHORT)
                } 
                else if(password.length < 8){
                    ToastAndroid.show("Password minimum 8 karakter", ToastAndroid.SHORT)
                }
                else {
                    axios.post("http://192.168.0.104:8080/resetPassword", {
                        cif_code: cif_code,
                        password: password
                    }).then(res => {
                        const data = res.data
                        console.log(data)
                        if (data == false) {
                            ToastAndroid.show("Password yang anda masukkan tidak valid", ToastAndroid.SHORT)
                        } 
                        else {
                            navigate('Login')
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
            <SafeAreaView style={styles.screen}>
                <KeyboardAvoidingView behavior="padding">
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Reset Your Account Password</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput secureTextEntry={true} style={styles.input} placeholder="Password" secureTextEntry={true} onChangeText={(password) => this.setState({ password: password })} />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput secureTextEntry={true} style={styles.input} placeholder="Confirm Password" secureTextEntry={true} onChangeText={(confPassword) => this.setState({ confPassword: confPassword })} />
                    </View>
                    <TapGestureHandler onHandlerStateChange={this.submit}>
                        <View style={{ ...styles.buttonContainer }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>SUBMIT</Text>
                        </View>
                    </TapGestureHandler>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    };
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center'
    },
    titleContainer: {
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10
    },
    title: {
        fontSize: 30,
        textAlign: "center",
        color: "black",
        fontWeight: "bold"
    },
    inputContainer: {
        marginVertical: 15,
        marginHorizontal: 30,
        borderBottomWidth: 2,
        borderBottomColor: '#b83b5e'
    },
    input: {
        fontSize: 20
    },
    buttonContainer: {
        backgroundColor: '#b83b5e',
        height: 70,
        marginHorizontal: 20,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        marginTop: 30,
    },
});

export default ChangePassword;