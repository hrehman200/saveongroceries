import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

class StoreScreen extends Component {
    static navigationOptions =
    {
        title: 'Select Store',
    };

    render() {
        return (
            <View style={ styles.container }>
                <Text style={ styles.text }>
                    Select Store
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    text: {
        fontSize: 25,
        color: 'black'
    },
});

export default StoreScreen;
