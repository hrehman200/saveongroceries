import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ListView} from 'react-native';
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

    componentWillUnmount = () => {
        this.closeDatabase();
    }

    errorCallback = (err) => {
        console.log(err);
        this.updateProgress(err.response);
    }

    okCallback = () => {
        console.log("Db opened");
    }

    closeCallback = () => {
        console.log('Db closed');
    }

    deleteCallback = () => {
        this.updateProgress("Database DELETED");
    }

    loadAndQueryDB = () => {
        db = SQLite.openDatabase({name : DB_NAME, createFromLocation : 1}, this.okCallback, this.errorCallback);
        db.transaction(this.queryStores, this.errorCallback,() => {
            this.updateProgress("Processing completed");
        });
    }

    queryStores = (tx) => {
        tx.executeSql('SELECT * FROM stores', [], this.queryStoresSuccess, this.errorCallback);
    }

    queryStoresSuccess = (tx,results) => {
        this.updateProgress("Query completed");
        console.log(results.rows);
        for (let i = 0; i < results.rows.length; i++) {
            let row = results.rows.item(i);
            this.updateProgress(`Store Name: ${row.name}, ID: ${row.id}`);
        }
    }

    closeDatabase = () => {
        if (db) {
            db.close(this.closeCallback, this.errorCallback);
        }
    }

    deleteDatabase = () => {
        this.updateProgress("Deleting database");
        SQLite.deleteDatabase(DB_NAME, this.deleteCallback, this.errorCallback);
    }

    runDemo = () => {
        this.loadAndQueryDB();
    }

    renderProgressEntry = (entry) => {
        return (<View style={listStyles.li}>
            <View>
                <Text style={listStyles.liText}>{entry}</Text>
            </View>
        </View>)
    }

    render = () => {
        return (<View style={styles.mainContainer}>
            <View style={styles.toolbar}>
                <Text style={styles.toolbarButton} onPress={this.runDemo}>
                    Run Demo
                </Text>
                <Text style={styles.toolbarButton} onPress={this.closeDatabase}>
                    Close DB
                </Text>
                <Text style={styles.toolbarButton} onPress={this.deleteDatabase}>
                    Delete DB
                </Text>
            </View>
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
    toolbar: {
        backgroundColor: '#51c04d',
        paddingTop: 30,
        paddingBottom: 10,
        flexDirection: 'row'
    },
    toolbarButton: {
        color: 'blue',
        textAlign: 'center',
        flex: 1
    },
    mainContainer: {
        flex: 1
    }
});

export default StoreScreen;
