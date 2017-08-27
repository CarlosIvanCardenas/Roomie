'use strict'

import React, {
  Component
} from 'react'

import {
  View,
  Text,
  Image,
  TouchableHighlight,
  Alert,
  StyleSheet,
  TextInput
} from 'react-native'

import {Actions} from "react-native-router-flux";

import commonStyles from "../styles/common.css";

import * as firebase from 'firebase';

class signupView extends Component {

    static navigationOptions = {
        title: 'Sign Up',
    };

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            user: "",
            password: "",
        };

    }

    signup(){
        firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then((user)=>{
            console.log(user);
            user.updateProfile({
                displayName: this.state.user
            })
            Actions.dashboard();
        }).catch((e)=>{
            console.log(e);
            alert(e.message)
        })
    }


    render() {
        return(
                <View style={commonStyles.container} >
                    <Image style={styles.img} source={require('../../assets/img/user.png')} />
                    <Text style={commonStyles.title} >Crear nuevo usuario</Text>
                    <TextInput 
                        style={commonStyles.input} 
                        onChangeText={(email) => this.setState({email})}
                        value={this.state.email}
                        placeholder={'Correo electronico'}
                        placeholderTextColor="white"
                        underlineColorAndroid='transparent'
                    />
                    <TextInput 
                        style={commonStyles.input} 
                        onChangeText={(user) => this.setState({user})}
                        value={this.state.user}
                        placeholder={'Nombre de usuario'}
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
                    <TouchableHighlight onPress={this.signup.bind(this)} style={commonStyles.boton} >
                        <Text style={commonStyles.textoBoton} >Registrarse</Text>
                    </TouchableHighlight>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    img:{
        width: 100, 
        height: 100,
        marginTop: 40,
        marginBottom: 10,
    },
})

module.exports = signupView;