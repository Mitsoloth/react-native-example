import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';

export default class Note extends React.Component {
    render(){
        return (
            <View key={this.props.keyval} style={styles.note}>
                
                <Text style={[styles.noteText, {borderLeftColor: this.props.val.isComplete ? 'green' : 'red'}]}>{this.props.val.date}</Text>
                <Text style={[styles.noteText, {borderLeftColor: this.props.val.isComplete ? 'green' : 'red'}]}>{this.props.val.note}</Text>

                <TouchableOpacity onPress={this.props.deleteMethod} style={styles.noteDelete}>
                    {/* <Text style={styles.noteDeleteText}>D</Text> */}
                    <Image source={require('./images/delete.png')} style={{width:25, height:25}} />
                </TouchableOpacity>
                {!this.props.val.isComplete ?
                <TouchableOpacity onPress={this.props.editMethod} style={styles.noteEdit}>
                    <Image source={require('./images/edit.png')} style={{width:25, height:25}} />
                </TouchableOpacity> : null
                
                }
                {this.props.val.isComplete ?
                <TouchableOpacity onPress={this.props.deleteMethod} style={styles.noteDone}>
                    <Text style={styles.noteDoneText}>Clear</Text>
                </TouchableOpacity> : 
                <TouchableOpacity onPress={this.props.doneMethod} style={styles.noteDone}>
                <Text style={styles.noteDoneText}>Done</Text>
                </TouchableOpacity>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    note: {
        position: 'relative',
        padding: 20,
        paddingRight: 100,
        borderBottomWidth: 2,
        borderBottomColor: '#ededed',
    },
    noteText: {
        paddingLeft: 20,
        borderLeftWidth: 10,
        borderLeftColor: 'black',
    },
    noteDelete: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems : 'center',
        // backgroundColor: '#2980b9',
        backgroundColor: '#FFFFFF',
        padding: 10,
        top: 10,
        bottom: 10,
        right: 10,
    },
    noteDeleteText: {
        color: 'white',
    },
    noteEdit: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems : 'center',
        // backgroundColor: '#2980b9',
        backgroundColor: '#FFFFFF',
        padding: 10,
        top: 10,
        bottom: 10,
        right: 50,
    },
    noteEditText: {
        color: 'yellow',
    },
    noteDone: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems : 'center',
        backgroundColor: '#FFFFFF',
        padding: 10,
        top: 10,
        bottom: 10,
        right: 100,
    },
    noteDoneText: {
        color: 'green',
    }

});