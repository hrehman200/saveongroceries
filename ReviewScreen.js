import React, {Component} from 'react';
import {Platform, StyleSheet, View, Image, AsyncStorage} from 'react-native';
import {Button, Text} from 'react-native-elements';
import { StackNavigator } from 'react-navigation';

class ReviewScreen extends Component {

    static navigationOptions = {
        title: 'Review and Submit',
    };

    constructor(props) {
        super(props);
        this.state = {
            store: '',
            product_picture: '',
            product_sku: ''
        };
    }

    componentDidMount = () => {
        this.getKey('store');
        this.getKey('product_picture');
        this.getKey('product_sku');
    }

    gotoStoreScreen = () => {
        this.props.navigation.navigate('Stores');
    }

    gotoCameraScreen = () => {
        this.props.navigation.navigate('CameraScreen');
    }

    gotoBarcodeScreen = () => {
        this.props.navigation.navigate('BarcodeScreen');
    }

    async saveKey (key, value) {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            // Error saving data
        }
    }

    async getKey (key) {
        try {
            const value = await AsyncStorage.getItem(key);
            this.setState({[key]: JSON.parse(value)});
        } catch (error) {
            // Error retrieving data
        }
    }

    writeToXmlFile = () => {

    }

    render() {
        return(
            <View style = { styles.container }>

                <View style={{flexDirection: 'row'}}>
                    <Text h3 style={{
                        alignItems: 'flex-start'
                    }}>Store : </Text>
                    <Text h3>{this.state.store.name}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text h3>Product SKU : </Text>
                    <Text h3>{this.state.product_sku}</Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                    <Image source={{uri: this.state.product_picture, isStatic:true}} style={styles.logo}  />
                </View>

                <Button
                    raised
                    icon={{name:'save'}}
                    buttonStyle={styles.button}
                    title = 'Submit'
                    onPress = { this.writeToXmlFile }
                />

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
        backgroundColor: "#159588"
    }
});

export default ReviewScreen;
