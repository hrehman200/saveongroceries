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

    gotoCameraScreen = () => {
        this.props.navigation.navigate('CameraScreen');
    }

    gotoBarcodeScreen = () => {
        this.props.navigation.navigate('BarcodeScreen');
    }

    render() {
        return(
            <View style = { styles.container }>
                <View style = { styles.buttonHolder }>
                    <Button style = { styles.button } onPress = { this.gotoStoreScreen } title = 'Select Store'/>
                    <Button style = { styles.button } onPress = { this.gotoCameraScreen } title = 'Take Product Picture'/>
                    <Button style = { styles.button } onPress = { this.gotoBarcodeScreen } title = 'Scan Barcode'/>
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
        paddingTop: 0
    },
    button: {
        backgroundColor: '#1279C9',
        color: 'white',
        fontSize: 22
    }
});

export default MainScreen;
