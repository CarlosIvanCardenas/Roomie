'use strict'

import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native'
import commonStyles from "../styles/common.css";

class NewTask extends Component{
    render(){
        return(
            <View style={commonStyles.container} >
                <Text>New Task</Text>
            </View>
            
        );
    }
}

module.exports = NewTask;