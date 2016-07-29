'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Keyboard, Dimensions, Image, Platform} from 'react-native';
import {pushNewRoute, replaceRoute} from '../../actions/route';
import {loginUser} from '../../auth/actions';

import {Container, Content, Text, InputGroup, Input, TextInput, Button, Icon, View} from 'native-base';
import {Grid, Col, Row} from "react-native-easy-grid";

import login from './login-theme';
import styles from './styles';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            visibleHeight: Dimensions.get('window').height,
            offset: {
                x:0,
                y:0
            }
        };
        this.constructor.childContextTypes = {
            theme: React.PropTypes.object,
        }
    }

    componentWillMount () {
        Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this))
        Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this))
    }

    keyboardWillShow (e) {
        let newSize = Dimensions.get('window').height - e.endCoordinates.height
        this.setState({offset :{y: 80}});
    }

    keyboardWillHide (e) {
        this.setState({offset :{y: 0}});
    }

    replaceRoute(route) {
        this.props.replaceRoute(route);
    }

    pushNewRoute(route) {
        this.props.pushNewRoute(route);
    }

    submitLogin() {
      this.props.loginUser(this.state.email, this.state.password);
    }

    render() {
        return (
            <Container>
                <Content contentOffset={this.state.offset} scrollEnabled={false}>
                    <View theme={login} >
                        <Image source={require('../../../images/BG.png')} style={styles.background} >
                            <Image source={require('../../../images/logo.png')} style={Platform.OS === 'android' ? styles.aShadow : styles.iosShadow} />
                            <View style={ Platform.OS === 'android' ? styles.abg : styles.bg}>
                                <InputGroup borderType="rounded" style={[Platform.OS === 'android' ? styles.inputGrp : styles.iosInputGrp, {borderWidth: 0, paddingLeft: 15}]}>
                                    <Icon name="ios-person-outline" />
                                    <Input placeholder="Email" style={styles.input} keyboardType="email-address" value={this.state.email} onChangeText={email => this.setState({email})} />
                                </InputGroup>
                                <InputGroup borderType="rounded" style={[Platform.OS === 'android' ? styles.inputGrp : styles.iosInputGrp, {borderWidth: 0, paddingLeft: 15}]}>
                                    <Icon name="ios-unlock-outline" />
                                    <Input placeholder="Password" secureTextEntry={true} style={styles.input} onChangeText={password => this.setState({password})}/>
                                </InputGroup>

                                <Button rounded block large
                                  primary={!this.props.isAuthenticating}
                                  bordered={this.props.isAuthenticating}
                                  style={styles.loginBtn}
                                  textStyle={Platform.OS === 'android' ? {marginTop: 5,fontSize: 16} : {fontSize: 16,marginTop: -10,fontWeight: '900'}}
                                  onPress={() => this.submitLogin()}>
                                    Get Started
                                </Button>

                                {this.props.statusText ? <Text>{this.props.statusText}</Text> : null}
                            </View>
                        </Image>
                    </View>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
  isAuthenticating   : state.auth.isAuthenticating,
  statusText         : state.auth.statusText
});

function bindActions(dispatch){
    return {
        replaceRoute:(route)=>dispatch(replaceRoute(route)),
        pushNewRoute:(route)=>dispatch(pushNewRoute(route)),
        loginUser:(email, password)=>dispatch(loginUser(email, password))
    }
}

export default connect(mapStateToProps, bindActions)(Login);
