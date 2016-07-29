'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Keyboard, Dimensions, Image, Platform} from 'react-native';
import {pushNewRoute, replaceRoute} from '../../actions/route';
import {attemptLogin} from '../../actions/auth';

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
      this.props.attemptLogin(this.state.email, this.state.password);
      // this.replaceRoute('home');
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

                                <Button rounded primary block large style={styles.loginBtn}  textStyle={Platform.OS === 'android' ? {marginTop: 5,fontSize: 16} : {fontSize: 16,marginTop: -10,fontWeight: '900'}}  onPress={() => this.submitLogin()}>
                                    Get Started
                                </Button>

                                <View style={Platform.OS === 'android' ? styles.aOtherLinksContainer : styles.iosOtherLinksContainer}>
                                    <Grid>
                                        <Col>
                                            <Button transparent style={{alignSelf: 'flex-start'}}>
                                                <Text style={styles.helpBtns}>
                                                    Create Account
                                                </Text>
                                            </Button>
                                        </Col>
                                        <Col>
                                            <Button transparent style={{alignSelf: 'flex-end'}}>
                                                <Text style={styles.helpBtns}>
                                                    Need Help?
                                                </Text>
                                            </Button>
                                        </Col>
                                    </Grid>
                                </View>
                            </View>
                        </Image>
                    </View>
                </Content>
            </Container>
        )
    }
}


function bindActions(dispatch){
    return {
        replaceRoute:(route)=>dispatch(replaceRoute(route)),
        pushNewRoute:(route)=>dispatch(pushNewRoute(route)),
        attemptLogin:(email, password)=>dispatch(attemptLogin(email, password))
    }
}

export default connect(null, bindActions)(Login);
