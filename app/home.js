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
        event:[
            // {title: 'Registration', reward: 10}, 
            // {title:'Login', reward: 10}, 
            // {title: 'Debit', reward: 15}
        ],
    }

    constructor(){
        super();
        this.logout = () => {
            this.props.navigation.reset(({
                index: 0,
                routes: [{ name: 'Index'}]
            }));
        }
        axios.get("http://192.168.43.220/localhost:8080/api/v1/dummyCustomer").then(res => {
            const data = res.data
            console.log(data)
            // for(let i = 0; i < data.length; i++){
            //     if(data[i].completed == true) {
            //         this.setState({ event: [...this.state.event, data[i]]})
            //     }
            // }
        })
        
    }

    render() {
        const totalPoints = () => {
            let totalPoints = 0;
            for (let i = 0; i < this.state.event.length; i++) {
                totalPoints += this.state.event[i].reward;
            }
            return totalPoints;
        }

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
                        <Text style={styles.totalText}>Total Points: {totalPoints()} Points</Text>
                    </View>
                    <FlatList
                        keyExtractor={item => item.id}
                        data={this.state.event}
                        renderItem={itemData => (
                            <Card title={itemData.item.title} reward={itemData.item.reward} />
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
        fontSize: 17
    }
});

export default Home;