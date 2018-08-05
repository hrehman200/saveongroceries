import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Dimensions, AsyncStorage} from 'react-native';
import Camera from 'react-native-camera';
import {Button} from 'react-native-elements';

class CameraScreen extends Component {

    static navigationOptions = {
        title: 'Take Product Picture',
    };

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

    saveAndGoBack = (data) => {
        console.log(data);
        this.saveKey('product_picture', data.path);
        this.props.navigation.goBack();
    }

    takePicture() {
        this.camera.capture()
            .then((data) => {
                console.log(data);
                this.saveAndGoBack(data);
            })
            .catch(err => console.error(err));
    }

    render() {
        return (
            <Camera
                ref={cam => {
                    this.camera = cam;
                }}
                style={styles.preview}
                aspect={Camera.constants.Aspect.fill}
                captureTarget={Camera.constants.CaptureTarget.disk}
                flashMode={Camera.constants.FlashMode.auto}
            >
                <Button
                    raised
                    title="Capture"
                    icon={{name:'camera'}}
                    buttonStyle={styles.button}
                    onPress = {this.takePicture.bind(this)}
                />
            </Camera>

        );
    }
}

const styles = StyleSheet.create({
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    },
    button: {
         backgroundColor: "#159588"
    }
});

export default CameraScreen;
