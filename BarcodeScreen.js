import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Dimensions, AsyncStorage} from 'react-native';

import Camera from 'react-native-camera';

class BarcodeScreen extends Component {
    static navigationOptions =
    {
        title: 'Select Store',
    };

    constructor(props) {
        super(props);
        this.state = {
        }
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
            if (value !== null) {
                console.log(value);
            }
        } catch (error) {
            // Error retrieving data
        }
    }

    saveAndGoToReviewScreen = (data) => {
        this.saveKey('product_sku', data);
        this.props.navigation.navigate('ReviewScreen');
    }

    onBarCodeRead = (e) => {
        this.saveAndGoToReviewScreen(e.data);
    }

    render() {
        return (
            <View  style={styles.container}>
                <Camera
                    style={styles.preview}
                    onBarCodeRead={this.onBarCodeRead}
                    ref={cam => this.camera = cam}
                    aspect={Camera.constants.Aspect.fill}
                >
                    <Text style={{
                        backgroundColor: 'white'
                    }}>{this.state.qrcode}</Text>
                </Camera>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
});

export default BarcodeScreen;
