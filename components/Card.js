import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Card extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <View style={styles.eventContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{this.props.title}</Text>
                </View>
                <View style={styles.rewardContainer}>
                    <Text style={styles.rewardText}>{this.props.reward} Points</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    eventContainer: {
        borderWidth: 1,
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 10
    },
    titleContainer: {
        marginHorizontal: 10,
        marginVertical: 5,
    },
    titleText: {
        color: 'black',
        fontWeight: 'bold'
    },
    rewardContainer: {
        marginHorizontal: 10,
        marginVertical: 5,
        position: 'absolute',
        right: 0,
    },
    rewardText: {
        color: 'black',
        fontSize: 13
    }
});

export default Card;