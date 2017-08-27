'use strict'

import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native'
import { Actions } from "react-native-router-flux";
import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import commonStyles from "../styles/common.css";

class Box extends Component{
    constructor(props) {
        super(props);
        this.state = { user: ''};
    }

    componentWillMount() {
        var user = firebase.auth().currentUser;
        this.setState({
            user: user.displayName
        })
    }

    onLogOut() {
        firebase.auth().signOut().then((user) => {
            console.log(user)
            Actions.login()
        }).catch((e) => {
            console.log(e)
            alert(e.message)
        })
    }

    myTask(){
        this.props.changeRoute('tasks')
    }

    newTask(){
        this.props.changeRoute('new')
    }

    render(){
        return(
            <View style={styles.container} >
                <View style={styles.user} >
                    <Icon 
                        name="user-circle-o" 
                        size={30} 
                        color="white" 
                    />
                    <Text style={styles.userText} >{this.state.user}</Text>
                    <View style={{flex: 1, flexDirection: 'column', alignItems: 'center',}} >
                        <Icon 
                            name="sign-out" 
                            size={25} 
                            color="white" 
                            onPress={this.onLogOut.bind(this)}
                        />
                        <Text style={{fontSize: 10, color: 'white', fontWeight: 'bold'}}>Cerrar sesión</Text>
                    </View>
                </View>
                <View>
                    <TouchableHighlight
                        onPress={this.myTask.bind(this)} style={commonStyles.boton}
                        >
                        <Text style={commonStyles.textoBoton} >Mis Tareas</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={this.newTask.bind(this)} style={commonStyles.boton}
                        >
                        <Text style={commonStyles.textoBoton} >Crear Tarea</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 25,
        backgroundColor: '#1f2229',
    },
    user: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: 'white',
        borderBottomWidth: 1
        
    },
    userText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 8,
        marginRight: 8
    }
})

module.exports = Box;