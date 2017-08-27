'use strict'

import React, { Component } from 'react'
import { Actions } from "react-native-router-flux";
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  Alert,
  TextInput
} from 'react-native'
import commonStyles from "../styles/common.css";
import * as firebase from 'firebase';

class loginView extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '' };
    }

    componentWillMount(){
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                Actions.dashboard();
            }
        })
    }

    login(){
        firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then((user)=>{
            console.log(user)
            Actions.dashboard()
        }).catch((e)=>{
            console.log(e)
            alert(e.message)
        })
    }

    render() {
        return(
                <View style={commonStyles.container} >
                    <Image style={commonStyles.logo} source={require('../../assets/img/roomie.png')} />
                    <TextInput 
                        style={commonStyles.input} 
                        onChangeText={(email) => this.setState({email})}
                        value={this.state.email}
                        placeholder={'Usuario'}
                        placeholderTextColor="white"
                        underlineColorAndroid='transparent'
                    />
                    <TextInput  
                        style={commonStyles.input}
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}
                        placeholder={'Contraseña'}
                        secureTextEntry={true}
                        placeholderTextColor="white"
                        underlineColorAndroid='transparent'
                    />
                    <TouchableHighlight onPress={this.login.bind(this)} style={commonStyles.boton} >
                        <Text style={commonStyles.textoBoton} >Iniciar sesión</Text>
                    </TouchableHighlight>
                    <Text style={commonStyles.register} onPress={() => Actions.signup()} > No tienes cuenta? </Text>
                </View>
        )
    }
}

module.exports = loginView;