// vendor components
import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  Linking,
  TouchableOpacity
} from 'react-native'
import Hyperlink from 'react-native-hyperlink'

import i18n from 'react-native-i18n'

import { connect } from 'react-redux'

// components
import FormPage  from '../components/FormPage'


@connect(
  state => ({
    email: state.scenes.login.form.username,
  }),
)
export default class resetEmail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      valid: false,
      code: '',
    }
  }

  onPress = () => {
    if (this.state.valid) {
      this.props.checkCode(this.state.code, this.props.token)
    }
    this.props.trackEvent('Reset Code Set', {
      properties: {
        code: this.state.code,
      },
    })
  }



  onSubmit = () => {
    this.onPress()
  }

  openUrl = (url) => {
    Linking.openURL(url)
  }


  render() {
    const img = require('app/assets/img/lock_key.png')
    return (
      <FormPage backgroundColor="white" arrowColor="black" backAction={this.props.backAction}>
        <View style={this.props.wrapperStyle}>
          <Image source={img} style={{ width: 52, height: 54, marginTop: 0, marginBottom: 5 }} />
          <Text style={styles.subtitle}>
            {i18n.t('login.forgotPassword.resetEmail.subtitle1')}
          </Text>
          <Text style={styles.subtitle}>
            {"\nhelp@joinstorytime.com\n\n"}
          </Text>
          <Text style={styles.subtitle}>
            {i18n.t('login.forgotPassword.resetEmail.subtitle2')}
          </Text>
          <Text style={styles.bold}>
            RESET
          </Text>
        </View>
      </FormPage>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontFamily: 'Karla-Bold',
  },
  subtitle: {
    fontSize: 20,
    fontFamily: 'Karla-Regular',
    textAlign: 'center',
  },
  bold: {
    fontSize: 25,
    fontFamily: 'Karla-Bold',
    textAlign: 'center',
  },
  linkStyle: {
    textAlign: 'center',
    color: 'darkblue',
    fontSize: 25,
    fontWeight: 'bold',
  },
});
