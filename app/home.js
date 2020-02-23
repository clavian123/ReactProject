import React, { Component } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, ImageBackground, Button, ToastAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Bg from '../image/Bg.jpg';
import AvatarBg from '../image/AvatarBg.jpg';
import Card from '../components/Card';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios'

class Home extends Component {
    state = {
        voucher:
        [
            // {"cifCode: "7397026581", "createdDate": "2020-02-23T00:00:00.000+0000", "expiryDate": "2020-03-23T00:00:00.000+0000", "idUserVoucher": 78, "idVoucher": 1, "loginName": "Jun", "redeemCounter": 0, "redeemDate": null, "status": 1}, 
            // {"cifCode": "7397026581", "createdDate": "2020-02-23T00:00:00.000+0000", "expiryDate": "2020-03-23T00:00:00.000+0000", "idUserVoucher": 79, "idVoucher": 2, "loginName": "Jun", "redeemCounter": 0, "redeemDate": null, "status": 1}
        ],
        username: ''
    }

    constructor(){
        super();
        this.logout = () => {

            this.props.navigation.reset(({
                index: 0,
                routes: [{ name: 'Index'}]
            }));
        }
    }

    componentDidMount(){
        
        axios.post("http://192.168.0.104:8080/userVoucher", {
            username: this.props.route.params.username
        }).then(res => {
            const data = res.data
            this.setState({
                voucher: data
            })
            console.log(this.state.voucher);

        }).catch(function (error) {
            ToastAndroid.show(error, ToastAndroid.SHORT)
        })

    }

    render() {

        const avatarName = (string) => {
            let name = '';
            for (let i = 0; i < string.length; i++) {
                if(i == 0){
                    name += string[i];
                }
                if(string[i] == ' '){
                    name += string[i+1];
                    break;
                }  
            }
            return name;
        };


        return (
            <SafeAreaView style={styles.screen}>
                <KeyboardAvoidingView>
                    <View style={styles.imgContainer}>
                        <ImageBackground style={styles.imgBg} source={Bg}>
                            <View style={styles.logout}>
                                <Button onPress={this.logout} color="red" title="Log Out"></Button>
                            </View>
                            <View style={styles.profileContainer}>
                                <ImageBackground style={styles.avatarBg} imageStyle={{ borderRadius: 40 }} source={AvatarBg}>
                                    <Text style={styles.avatarText}>{avatarName(this.props.route.params.username)}</Text>
                                </ImageBackground>
                                <View style={styles.nameContainer}>
                                    <Text style={styles.greeting}>Welcome,</Text>
                                    <Text style={styles.name}>{this.props.route.params.username}</Text>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={styles.totalContainer}>
                    <Text style={styles.totalText}>Total Voucher: {this.state.voucher.length} Voucher</Text>
                    </View>
                    <FlatList
                        keyExtractor={item => item.id}
                        data={this.state.voucher}
                        renderItem={itemData => (
                            <Card title={itemData.item.voucher.voucherCode} reward={itemData.item.voucher.description} />
                        )}
                    />
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    imgContainer: {
        width: '100%',
        height: 150
    },
    imgBg: {
        width: '100%',
        height: '100%'
    },
    logout: {
        position: 'absolute',
        width: '21%',
        top: 15,
        right: 20,
        fontWeight: 'bold'
    },
    profileContainer: {
        width: '100%',
        height: '14%',
        marginHorizontal: 10,
        marginTop: '17%',
        flexDirection: 'row',
        textAlign: 'center'
    },
    avatarBg: {
        width: 65,
        height: 65,
        justifyContent: 'center'
    },
    avatarText: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: '#696969'
    },
    nameContainer: {
        justifyContent: 'center',
    },
    greeting:{
        color: 'white',
        marginHorizontal: 10,
        fontSize: 15,
        fontWeight: 'bold'
    }, 
    name: {
        color: 'white',
        marginHorizontal: 10,
        fontWeight: 'bold',
        fontSize: 18
    },
    totalContainer:{
        marginHorizontal: 10,
        marginTop: 10
    },
    totalText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20
    }
});

export default Home;