import React, { Component } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';
import SafeAreaView from 'react-native-safe-area-view';
import { TextInput } from 'react-native-gesture-handler';

class Registration extends Component{
    constructor(){
        super();
        this.submit = () => {
            const { navigate } = this.props.navigation;
            navigate('Home');
        }
    }

    render(){
        return(
            <SafeAreaView style={styles.screen}>
                <KeyboardAvoidingView behavior="padding">
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Create a New Account</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.input} placeholder="Username" />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput secureTextEntry={true} style={styles.input} placeholder="Password" />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput secureTextEntry={true} style={styles.input} placeholder="Confirm Password" />
                    </View>
                    <TapGestureHandler onHandlerStateChange={this.submit}>
                        <View style={{ ...styles.buttonContainer}}>
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
        alignItems:'center',
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
    input:{
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