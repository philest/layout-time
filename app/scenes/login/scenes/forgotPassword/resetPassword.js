// vendor components
import React, { Component } from 'react'
import {
  View,
  Text,
  Linking,
  Image,
  StyleSheet,
} from 'react-native'
import Hyperlink from 'react-native-hyperlink'

import i18n from 'react-native-i18n'

import { connect } from 'react-redux'

// components
import { InputGroup, Input } from 'native-base'
import FormPage  from '../components/FormPage'
import NextFooter from '../components/NextFooter'
// import ForgotphoneModal from './oldForgotphoneModal'
import { RESET_PASSWORD_REQUEST } from 'app/data/forgotPassword/state'




@connect(
  state => ({
    token: state.data.forgotPassword.refresh.tkn,
    submitting: state.data.forgotPassword.isGetting,
  }),
  dispatch => ({
    resetPassword: (password, refreshToken) => dispatch({ type: RESET_PASSWORD_REQUEST, password, refreshToken }),
  }),
)
export default class ResetPassword extends Component {

  constructor(props) {
    super(props)
    this.state = {
      valid: false,
      password: '',
    }
  }

  onPress = () => {
    if (this.state.valid) {
      this.props.resetPassword(this.state.password, this.props.token)
    }
    this.props.trackEvent('Password Reset Requested', {
      properties: {
        valid: this.state.valid,
      },
    })
  }

  onSubmit = () => {
    this.onPress()
  }

  validatePassword = (t) => {
    this.setState({
      password: t,
      valid: t.length >= 6,
    })
  }

  openUrl = (url) => {
    Linking.openURL(url)
  }


  render() {
    const img = require('app/assets/img/lock_key.png')
    return (
      <FormPage backgroundColor="white" arrowColor="black" backAction={this.props.backAction}>
        <View style={this.props.wrapperStyle}>
          <Image source={img} style={{ width: 52, height: 54, marginTop: 40, marginBottom: 5 }} />
          <Text style={styles.title}>
            {i18n.t('login.password.registration.title')}
          </Text>
          <Text style={styles.subtitle}>
            {i18n.t('login.password.registration.subtitle')},
          </Text>
          <InputGroup
            success={this.state.valid}
            error={this.state.triggered && !this.state.valid}
            height={47}
            borderType="underline"
            borderWidth={2}
            backgroundColor="white"
            margin={40}
            marginBottom={20}
            marginTop={15}
          >
            <Input
              secureTextEntry
              autoFocus
              height={45}
              marginLeft={10}
              placeholder={i18n.t('login.password.input')}
              fontSize={18}
              fontFamily="Karla-Regular"
              value={this.state.password}
              onChangeText={this.validatePassword}
              onSubmitEditing={this.onSubmit}
            />
          </InputGroup>

          <Hyperlink
            onPress={this.openUrl}
            style={styles.linkContainer}
            linkStyle={styles.linkStyle}
            linkText={(url) => {
              if (url === 'https://www.joinstorytime.com/privacy') {
                return i18n.t('login.password.ppolicy')
              } else if (url === 'https://www.joinstorytime.com/terms') {
                return i18n.t('login.password.tos')
              }
              return url
            }}
          >
            <Text style={styles.fineprintText}>
              {i18n.t('login.password.fineprint')}
            </Text>
          </Hyperlink>
        </View>
        <NextFooter
          backgroundColor={!this.state.valid ? 'grey' : '#ed7a44'}
          height={this.props.u || this.state.valid ? 50 : 0}
          onPress={this.onPress}
          disabled={!this.state.valid}
          text={i18n.t('login.next')}
        />
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
    fontSize: 15,
    fontFamily: 'Karla-Bold',
    textAlign: 'center',
  },
  fineprintText: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
    paddingRight: 30,
    paddingLeft: 30,
  },
  linkStyle: {
    color: 'gray',
    fontSize: 12,
    fontWeight: 'bold',
  },
  linkContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },
});
