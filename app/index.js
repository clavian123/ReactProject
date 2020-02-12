import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, KeyboardAvoidingView } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import SafeAreaView from 'react-native-safe-area-view';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, StackActions } from '@react-navigation/native';


const { width, height } = Dimensions.get("window")
const { Value, event, block, cond, eq, set, Clock, startClock, stopClock, debug, timing, clockRunning, interpolate, Extrapolate, concat } = Animated


function runTiming(clock, value, dest) {
    const state = {
        finished: new Value(0),
        position: new Value(0),
        time: new Value(0),
        frameTime: new Value(0),
    };

    const config = {
        duration: 500,
        toValue: new Value(0),
        easing: Easing.inOut(Easing.ease),
    };

    return block([
        cond(clockRunning(clock), 0, [
            set(state.finished, 0),
            set(state.time, 0),
            set(state.position, value),
            set(state.frameTime, 0),
            set(config.toValue, dest),
            startClock(clock)
        ]),
        timing(clock, state, config),
        cond(state.finished, debug('stop clock', stopClock(clock))),
        state.position,
    ]);
}

class Index extends Component {
    constructor() {
        super()
        this.buttonOpacity = new Value(1)
        // this.Y = new Value(0)
        this.submit = ()=>{
            const { navigate } = this.props.navigation;
            navigate('Verification')
        }

        this.onStateChange = event([
            {
                nativeEvent: ({ state }) => block([
                    cond(eq(state, State.END), set(this.buttonOpacity, runTiming(new Clock, 1, 0))),
                    // cond(eq(state, State.END), set(this.Y, runTiming(new Clock, 0, 400))),
                ])
            }
        ])

        this.onCloseState = event([
            {
                nativeEvent: ({ state }) => block([
                    cond(eq(state, State.END), set(this.buttonOpacity, runTiming(new Clock, 0, 1))),
                ])
            }
        ])

        this.buttonY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [1000, 0],
            extrapolate: Extrapolate.CLAMP
        });

        this.bgY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [-height / 6 * 5, 0],
            extrapolate: Extrapolate.CLAMP
        });

        this.inputY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [0, 1000],
            extrapolate: Extrapolate.CLAMP
        });

        this.inputOpacity = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [1, 0],
            extrapolate: Extrapolate.CLAMP
        });

        this.Y = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [height / 1.75, 0],
            extrapolate: Extrapolate.CLAMP
        });
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={height / 1.8}>
                    <Animated.View style={{ ...StyleSheet.absoluteFill, transform: [{ translateY: this.bgY }] }}>
                        <View style={{ backgroundColor: '#f08a5d', flex: 1, height: null, width: null, justifyContent: 'center', alignItems: 'center', zIndex: 1 }}>
                            <Animated.View style={{ transform: [{ translateY: this.Y }] }}>
                                <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white' }}>Let's get started!</Text>
                            </Animated.View>
                        </View>

                        <View style={{ ...styles.buttonContainer }}>
                            <TapGestureHandler onHandlerStateChange={this.onStateChange}>
                                <Animated.View style={{ ...styles.button, opacity: this.buttonOpacity, transform: [{ translateY: this.buttonY }] }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>REGISTER</Text>
                                </Animated.View>
                            </TapGestureHandler>
                        </View>
                    </Animated.View>
                    <Animated.View style={{
                        opacity: this.inputOpacity,
                        transform: [{ translateY: this.inputY }],
                        height: height / 6 * 5,
                        ...StyleSheet.absoluteFill,
                        top: null,
                        alignContent: 'center',
                    }}>
                        <TapGestureHandler onHandlerStateChange={this.onCloseState}>
                            <Animated.View style={styles.closeButton}>
                                <Animated.Text style={{ fontSize: 20 }}>X</Animated.Text>
                            </Animated.View>
                        </TapGestureHandler>

                        <Text style={{ fontSize: 30, marginTop: 50, textAlign: "center", fontWeight: 'bold', color: 'black' }}>Input Your Card Number</Text>
                        <TextInput style={{ ...styles.input, marginTop: 50 }} placeholder="16 digits">

                        </TextInput>
                        <TapGestureHandler onHandlerStateChange={this.submit}>
                            <Animated.View style={{ ...styles.button, elevation: 2, marginTop: 200 }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>SUBMIT</Text>
                            </Animated.View>
                        </TapGestureHandler>
                    </Animated.View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }


}

export default Index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },

    buttonContainer: {
        height: height / 3,
        backgroundColor: '#f08a5d',
    },

    button: {
        backgroundColor: '#b83b5e',
        height: 70,
        marginHorizontal: 20,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },

    closeButton: {
        height: 50,
        width: 50,
        backgroundColor: 'white',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        position: "absolute",
        top: -20,
        left: width / 2 - 20,
        elevation: 5
    },

    input: {
        fontSize: 20,
        height: 70,
        borderRadius: 35,
        borderWidth: 1,
        marginHorizontal: 20,
        paddingLeft: 10,
        marginVertical: 15,
        borderColor: 'rgba(0,0,0,0.2)',
        textAlign: 'center'
    },


})