// @flow
'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Image, View} from 'react-native';

import {replaceRoute} from '../../actions/route';
import {openDrawer} from '../../actions/drawer';
import {getCurrentLocation} from '../../currentLocation/actions';

import {Container, Header, Content, Text, Button, Icon} from 'native-base';

import theme from '../../themes/base-theme';
import styles from './styles';

class Home extends Component {
  replaceRoute(route) {
    this.props.replaceRoute(route);
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.getCurrentLocation(this.props.authToken);
    }, 1000);
  }

  render() {
    return (
      <Container theme={theme}>
        <Image source={require('../../../images/BG-signUp.png')} style={styles.container} >
          {/*<Header>
            <Button transparent style={{padding: 20}}  onPress={() => this.replaceRoute('login')}>
              <Icon name="ios-power" />
            </Button>

            <Image source={require('../../../images/Header-Logo.png')} style={styles.logoHeader} />

             <Button transparent onPress={this.props.openDrawer}  style={{padding: 20,paddingTop: 33}}>
              <Icon name="ios-menu" />
            </Button>
          </Header>*/}

          <Content padder>
            <View>
              <Text>
                Welcome {this.props.userName}, we're fetching your booking data...
              </Text>
            </View>
          </Content>
        </Image>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  userName: state.auth.userName,
  authToken: state.auth.token
});

function bindAction(dispatch) {
  return {
    openDrawer: ()=>dispatch(openDrawer()),
    replaceRoute: (route)=>dispatch(replaceRoute(route)),
    getCurrentLocation: (authToken)=>dispatch(getCurrentLocation(authToken))
  }
}

export default connect(mapStateToProps, bindAction)(Home);
