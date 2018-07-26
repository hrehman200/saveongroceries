import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import {Button} from 'react-native-elements';
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

                <Image source={require('./img/logo.jpg')} style={styles.logo}  />

                <View style = { styles.buttonHolder }>
                    <Button
                        raised
                        large
                        icon={{name:'store'}}
                        buttonStyle={styles.button}
                        title = 'SELECT STORE'
                        onPress = { this.gotoStoreScreen }
                    />
                    <Button
                        raised
                        large
                        icon={{name:'camera'}}
                        buttonStyle={styles.button}
                        title = 'TAKE PRODUCT PICTURE'
                        onPress = { this.gotoCameraScreen }
                    />
                    <Button
                        raised
                        large
                        icon={{name:'texture'}}
                        buttonStyle={styles.button}
                        title = 'SCAN BARCODE'
                        onPress = { this.gotoBarcodeScreen }
                    />
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
        borderRadius: 0,
        borderWidth: 4,
        borderColor: '#d6d7da',

    },
    text: {
        fontSize: 25,
        color: 'black'
    },
    logo: {
        width:150,
        height:150,
        marginBottom:50
    },
    buttonHolder: {
        paddingTop: 0
    },
    button: {
        marginBottom: 16,
        backgroundColor: "#159588"
    }
});

export default MainScreen;
