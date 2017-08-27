'use strict'

import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TextInput,
} from 'react-native'
import ModalDropdown from 'react-native-modal-dropdown';
import commonStyles from "../styles/common.css";
import * as firebase from 'firebase';

class NewTask extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            name: '', 
            members: [],
            options: []
        };
    }

    componentWillMount(){
        var self = this;
        firebase.database().ref().child('users').on("value", function(snapshot) {
            snapshot.forEach(function(child) {
                self.state.options.push(child.val().name);
            });
        });
        console.log(this.state.options)
    }

    create(){
        firebase.database().ref().child('Task').push({
            name: this.state.name,
            members: this.state.members,
            current: this.state.members[0]
        })
        this.setState({
            name: '',
            members: []
        })
        alert('Tarea creada con exito')
    }

    addMember(idx, value){
        console.log(this.state.members.indexOf(value) < 0)
        if(this.state.members.indexOf(value) < 0){
            this.state.members.push(value)
            console.log(this.state.members)
        }
        else {
            alert('Ya agregaste este usuario')
        }
        
    }

    render(){
        return(
            <View style={commonStyles.container} >
                <Text style={commonStyles.title} >Nueva Tarea</Text>
                <TextInput 
                    style={commonStyles.input} 
                    onChangeText={(name) => this.setState({name})}
                    value={this.state.name}
                    placeholder={'Nombre de actividad'}
                    placeholderTextColor="white"
                    underlineColorAndroid='transparent'
                />
                <ModalDropdown 
                    options={this.state.options}
                    style={{width: 325, height: 55, backgroundColor: '#43434b', borderRadius: 8, justifyContent: 'center', paddingLeft: 20}}
                    textStyle={{color: 'white', fontSize: 16,}}
                    dropdownStyle={{width: 285, height: 100, marginTop: 5,}}
                    defaultValue={'Miembros'}
                    onSelect={(idx, value) => this.addMember(idx, value)}
                />
                <TouchableHighlight onPress={this.create.bind(this)} style={commonStyles.boton} >
                        <Text style={commonStyles.textoBoton} >Crear nueva tarea</Text>
                    </TouchableHighlight>
            </View>
            
        );
    }
}

module.exports = NewTask;