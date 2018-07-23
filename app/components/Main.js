import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import Note from './Note';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            noteArray: [{date:"1/1/1989",note:"Mimic Ms. Anna",isComplete:false},
            {date:"13/12/1989",note:"Send Daily Spam",isComplete:true}],
            noteText: '',
            editing: false,
            editingKey: null,
        }
    }
    
    render(){

        let notes = this.state.noteArray.map((val,key) => {
            return <Note key={key} keyval={key} val={val}
            deleteMethod={ ()=> this.deleteNote(key)} editMethod={ ()=> this.editNote(key)} doneMethod={ ()=> this.doneNote(key)} />
        })

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}> My Todo App!</Text>    
                </View>

                
                <ScrollView style={styles.scrollContainer}>
                    {notes}
                </ScrollView>

                
                <KeyboardAvoidingView style={styles.footer} behavior="padding" enabled>
                    
                    <TextInput
                    ref={(input) => { this.editTextInput = input; }}
                    style={styles.textInput}
                    onChangeText={(noteText) => this.setState({noteText})}
                    value={this.state.noteText}
                    placeholder='Type your task!'
                    placeholderTextColor='white'
                    underlineColorAndroid='transparent'
                    autoFocus={this.editing}
                    // focus={this.state.editing}
                    >

                    </TextInput>
                    
                </KeyboardAvoidingView>

                <TouchableOpacity onPress={this.state.editing ? this.saveNote.bind(this) : this.addNote.bind(this)} style={styles.addButton}>
                    <Text style={styles.addButtonText}>{this.state.editing ? 'Save' : 'New'}</Text>
                </TouchableOpacity>

            </View>
        )
    }

    addNote() {
        if (this.state.noteText) {
            var d = new Date();
            this.state.noteArray.push({
                'date': d.getFullYear() +
                "/" + (d.getMonth() + 1) +
                "/" + d.getDate(),
                'note': this.state.noteText,
                'isComplete': false,
            });
            this.setState({ noteArray: this.state.noteArray })
            this.setState({ noteText: '' });
        }
    }

    saveNote(key) {
        if (this.state.noteText) {
            this.state.noteArray[this.state.editingKey].note = this.state.noteText
            this.setState({ noteArray: this.state.noteArray, editing: false, editingKey: null })
            this.setState({ noteText: '' });
        }
    }

    deleteNote(key) {
        this.state.noteArray.splice(key, 1);
        this.setState({ noteArray: this.state.noteArray })
    }

    editNote(key) {
        this.state.editing= true;
        this.setState({ editing: this.state.editing, editingKey: key })
        this.editTextInput.focus();
    }

    doneNote(key) {
        this.state.noteArray[key].isComplete = true;
        this.setState({ noteArray: this.state.noteArray })
    }

}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    header: {
        backgroundColor: '#4286f4',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 10,
        borderBottomColor: '#ddd',
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        padding: 26,
    },
    scrollContainer: {
        flex:1,
        marginBottom: 100,
    },
    footer: {
        position: 'absolute',
        bottom: 40,
        left: 0,
        right: 0,
        zIndex:10,
    },
    textInput: {
        alignSelf: 'stretch',
        color: '#fff',
        padding: 20,
        backgroundColor: '#252525',
        borderTopWidth: 2,
        // borderTopColor: '#ededed',
    },

    addButton: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 90,
        backgroundColor: '#4286f4',
        width:90,
        height: 90,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 24,
    }
});