import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, KeyboardAvoidingView, ToastAndroid } from 'react-native';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import SafeAreaView from 'react-native-safe-area-view'
import axios from 'axios'



class Verification extends Component {
    constructor() {
        super()

        this.state={
            PAN:'',
            token:'',
            cif_code: '',
        }
        
        this.submit = ({ nativeEvent }) => {
            this.setState({
                PAN: this.props.route.params.PAN,
                cif_code: this.props.route.params.cif_code
            })

            if(nativeEvent.state === State.END){
                
                console.log(this.state.cif_code);
                console.log(this.state.PAN)
                
                const { navigate } = this.props.navigation;
                let token = this.state.token;
                let PAN = this.state.PAN;
                let cif_code = this.state.cif_code
                let num = /^[0-9]+$/
    
                if(token.length == 0){
                    ToastAndroid.show("Kode Verifikasi harus diisi", ToastAndroid.SHORT)
                }
                else if(token.length != 6){
                    ToastAndroid.show('Kode Verifikasi harus 6 digit', ToastAndroid.SHORT)
                }
                else if(!num.test(token)){
                    ToastAndroid.show('Kode Verifikasi harus angka', ToastAndroid.SHORT)  
                }
                else{
                    axios.post("http://192.168.43.220:8080/checkToken", {
                        cif_code: cif_code,
                        token: token
                    }).then(res => {
                        const data = res.data
                        if(data == false){
                            ToastAndroid.show("Kode Verifikasi tidak sesuai", ToastAndroid.SHORT)
                        }else{
                            navigate('PinRegistration',{
                                PAN:PAN,
                                cif_code: cif_code
                            })
                        }
                    }).catch(function (error){
                        console.log(error)
                        ToastAndroid.show(error, ToastAndroid.SHORT)
                    })
                }
            }

            
            
        }
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center'}}>
                <KeyboardAvoidingView behavior="padding">
                    <View style={styles.headerContainer}>
                        <Text style={styles.header}>Please Check Your Email and Input the Verification Code We've Sent</Text>
                    </View>
                    <TextInput style={styles.input} keyboardType='numeric' maxLength={6} placeholder="Verification Code" onChangeText={(token)=> this.setState({token: token})}/>
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