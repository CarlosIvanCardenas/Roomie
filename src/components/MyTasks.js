'use strict'

import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native'
import commonStyles from "../styles/common.css";

class MyTasks extends Component{
    render(){
        return(
            <View style={commonStyles.container} >
                <Text>MyTasks</Text>
            </View>
            
        );
    }
}

module.exports = MyTasks;