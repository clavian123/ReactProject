import React, { Component } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ToastAndroid } from 'react-native';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import SafeAreaView from 'react-native-safe-area-view';
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios'

class Registration extends Component {
    constructor() {
        super();

        this.state = {
            cif_code: '',
            username: '',
            password: '',
            confPassword: '',
        }

        this.submit = ({ nativeEvent }) => {
            this.setState({
                cif_code: this.props.route.params.cif_code
            })

            if (nativeEvent.state == State.END) {
                const { navigate } = this.props.navigation
                let username = this.state.username
                let password = this.state.password
                let confPassword = this.state.confPassword
                let cif_code = this.state.cif_code
                let num = /^[0-9a-zA-Z]+$/

                if (confPassword != password) {
                    ToastAndroid.show('Password dan Confirm Password harus sama', ToastAndroid.SHORT)
                }
                else if (username.length == 0) {
                    ToastAndroid.show('Username harus diisi', ToastAndroid.SHORT)
                }
                else if (password.length == 0) {
                    ToastAndroid.show('Password harus diisi', ToastAndroid.SHORT)
                }
                else if (confPassword.length == 0) {
                    ToastAndroid.show('Confirm Password harus diisi', ToastAndroid.SHORT)
                }
                else if(password.length < 8){
                    ToastAndroid.show('Password minimum 8 karakter', ToastAndroid.SHORT)
                }
                else {

                    axios.post("http://192.168.43.220:8080/registration", {
                        cif_code: cif_code,
                        username: username,
                        password: password
                    }).then(res => {
                        const data = res.data
                        if (data == true) {
                            ToastAndroid.show("Username yang anda masukkan sudah digunakan", ToastAndroid.SHORT)
                        } 
                        else {
                            navigate('Home', {
                                username: username
                            })

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

                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Create a New Account</Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder="Username" onChangeText={(text) => this.setState({ username: text })} />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} onChangeText={(text) => this.setState({ password: text })} />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry={true} onChangeText={(text) => this.setState({ confPassword: text })} />
                </View>
                <TapGestureHandler onHandlerStateChange={this.submit}>
                    <View style={{ ...styles.buttonContainer }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>SUBMIT</Text>
                    </View>
                </TapGestureHandler>

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

export default Registration;