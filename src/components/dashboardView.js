'use strict'

import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native'
import Drawer from 'react-native-drawer'
import commonStyles from "../styles/common.css";
import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import Box from './Box'

class dashboardView extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: '',
            page: 'tasks'
        };
    }

    componentWillMount() {
        var user = firebase.auth().currentUser;
        this.setState({
            user: user.displayName
        })
    }

    closeControlPanel = () => {
        this._drawer.close()
    };
    openControlPanel = () => {
        this._drawer.open()
    };

    render() {
        return(
            <Drawer
                ref={(ref) => this._drawer = ref}
                type="static"
                content={<Box />}
                openDrawerOffset={100}
                style={{elevation: 10, width: 100}}
                tweenHandler={Drawer.tweenPresets.parallax}
                acceptTap={true}
                > 
                    <View style={styles.navBar} >
                        <View style={styles.container} >
                            <Icon 
                                name="bars" 
                                size={30} 
                                color="white" 
                                style={{marginRight: 30}}
                                onPress={this.openControlPanel.bind(this)}
                            />
                            <Text style={styles.navTitle} >Dashboard</Text>
                        </View>
                    </View>
                    
            </Drawer>
            
        )
    }
}

const styles = StyleSheet.create({
    navBar: {
        height: 55,
        backgroundColor: '#1f2229',  
        elevation: 3,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 20,
    },
    navTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    }
})

module.exports = dashboardView;