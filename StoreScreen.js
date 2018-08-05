import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ListView, AsyncStorage} from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const DB_NAME = 'savongroceries.db';
let db;

class StoreScreen extends Component {

    static navigationOptions = {
        title: 'Select Store',
    };

    constructor() {
        super();
        this.progress = [];
        this.state = {
            progress: [],
            ds: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2}
            )
        };
    }

    updateProgress = (text, resetState) => {
        let progress = [];
        if (!resetState) {
            progress = [...this.progress];
        }
        progress.push(text);
        this.progress = progress;
        this.setState({
            progress
        });
    }

    componentWillMount = () => {
        this.loadAndQueryDB();
    }

    componentWillUnmount = () => {
        this.closeDatabase();
    }

    errorCallback = (err) => {
        console.log(err);
    }

    okCallback = () => {
        console.log("Db opened");
    }

    closeCallback = () => {
        console.log('Db closed');
    }

    loadAndQueryDB = () => {
        db = SQLite.openDatabase({name : DB_NAME, createFromLocation : 1}, this.okCallback, this.errorCallback);
        db.transaction(this.queryStores, this.errorCallback,() => {

        });
    }

    queryStores = (tx) => {
        tx.executeSql('SELECT * FROM stores', [], this.queryStoresSuccess, this.errorCallback);
    }

    queryStoresSuccess = (tx,results) => {
        console.log(results.rows);
        for (let i = 0; i < results.rows.length; i++) {
            let row = results.rows.item(i);
            this.updateProgress(row);
        }
    }

    closeDatabase = () => {
        if (db) {
            db.close(this.closeCallback, this.errorCallback);
        }
    }

    deleteDatabase = () => {
        SQLite.deleteDatabase(DB_NAME, this.deleteCallback, this.errorCallback);
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

    saveAndGoBack = (row) => {
        console.log(row);
        this.saveKey('store', row);
        //this.props.navigation.goBack();
        this.props.navigation.navigate('ReviewScreen');
    }

    renderProgressEntry = (entry) => {
        return (<View style={listStyles.li} >
            <View>
                <Text onPress={this.saveAndGoBack.bind(this, entry)} style={listStyles.liText}>
                    {entry.name}
                </Text>
            </View>
        </View>)
    }

    render = () => {
        return (<View style={styles.mainContainer}>
            <ListView
                enableEmptySections={true}
                dataSource={this.state.ds.cloneWithRows(this.state.progress)}
                renderRow={this.renderProgressEntry}
                style={listStyles.liContainer}/>
        </View>);
    }
}

var listStyles = StyleSheet.create({
    li: {
        borderBottomColor: '#c8c7cc',
        borderBottomWidth: 0.5,
        paddingTop: 15,
        paddingRight: 15,
        paddingBottom: 15,
    },
    liContainer: {
        backgroundColor: '#fff',
        flex: 1,
        paddingLeft: 15,
    },
    liIndent: {
        flex: 1,
    },
    liText: {
        color: '#333',
        fontSize: 17,
        fontWeight: '400',
        marginBottom: -3.5,
        marginTop: -3.5,
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    mainContainer: {
        flex: 1
    }
});

export default StoreScreen;
