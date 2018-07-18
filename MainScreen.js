import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import { StackNavigator } from 'react-navigation';

class MainScreen extends Component {
    static navigationOptions = {
        title: 'First Screen',
    };

    gotoStoreScreen = () => {
        this.props.navigation.navigate('Stores');
    }

    render() {
        return(
            <View style = { styles.container }>
                <Text style = { styles.text }>
                    First Screen.
                </Text>

                <View style = { styles.buttonHolder }>
                    <Button style = { styles.button } onPress = { this.gotoStoreScreen } title = 'Select Store'/>
                </View>
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
    buttonHolder: {
        paddingTop: 25
    }
});

export default MainScreen;
