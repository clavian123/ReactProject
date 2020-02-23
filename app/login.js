import React, { Component } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ToastAndroid } from 'react-native';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import SafeAreaView from 'react-native-safe-area-view';
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios'

class Login extends Component {

    state = {
        username: '',
        password: ''
    }

    // componentDidMount(){
    //     this.setState({
    //         username: this.props.route.params.username
    //     })
    // }

    constructor() {
        super();


        this.submit = ({ nativeEvent }) => {

            if (nativeEvent.state == State.END) {
                const { navigate } = this.props.navigation;
                let username = this.state.username;
                let password = this.state.password;
                let num = /^[0-9a-zA-Z]+$/

                if (username.length == 0) {
                    ToastAndroid.show('Username harus diisi', ToastAndroid.SHORT);
                } else if (password.length == 0) {
                    ToastAndroid.show('Password harus diisi', ToastAndroid.SHORT);
                } else {
                    axios.post("http://192.168.0.104:8080/login", {
                        username: username,
                        password: password
                    }).then(res => {
                        const data = res.data
                        console.log(data)
                        if (data.usernameIsValid == false) {
                            ToastAndroid.show("Username yang anda masukkan tidak valid", ToastAndroid.SHORT)
                        } 
                        else {
                            if(data.loginSuccess == false){
                                ToastAndroid.show("Password yang anda masukkan tidak valid", ToastAndroid.SHORT)
                            }
                            else{
                                navigate('Home', {
                                    username: username
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
            <SafeAreaView style={styles.screen}>
                <KeyboardAvoidingView behavior="padding">
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Login to Your Account</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.input} placeholder="Username" onChangeText={(text) => this.setState({ username: text })} defaultValue={this.state.username}/>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput secureTextEntry={true} style={styles.input} placeholder="Password" onChangeText={(text) => this.setState({ password: text })} />
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
        // backgroundColor:'red',
        // height: 200,
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

export default Login;