// vendor components
import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  StyleSheet,
} from 'react-native'

import i18n from 'react-native-i18n'

import { connect } from 'react-redux'

// action creators
import { SET_PASSWORD } from 'app/scenes/login/state'

// components
import { InputGroup, Input } from 'native-base'
import FormPage  from '../components/FormPage'
import NextFooter from '../components/NextFooter'

import { FORGOT_PASSWORD_PRESSED } from '../../state'



@connect(
  state => ({
    email: state.scenes.login.username,
    submitting: state.data.user.account.isGetting,
    usernameType: state.scenes.login.form.usernameType,
  }),
  dispatch => ({
    setPassword(password) {
      dispatch({ type: SET_PASSWORD, password })
    },
    startForgotPasswordFlow(resetMethod) {
      dispatch({ type: FORGOT_PASSWORD_PRESSED, resetMethod })
    },
  }),
)
export default class EnterPassword extends Component {

  constructor(props) {
    super(props)
    this.state = {
      valid: false,
      password: '',
    }
  }

  onPress = () => {
    this.setState({
      triggered: true,
    })
    if (this.state.valid) {
      this.props.setPassword(this.state.password)
    }
    this.props.trackEvent('Password Entered', {
      properties: {
        validInput: this.state.valid,
      },
    })
  }

  onSubmit = () => {
    this.onPress()
  }

  validatePassword = (t) => {
    this.setState({ password: t })
    this.setState({
      valid: t.length >= 0,
    })
  }


  render() {
    const img = require('app/assets/img/lock_key.png')
    return (
      <FormPage backgroundColor="white" arrowColor="black" backAction={this.props.backAction}>
        <View style={this.props.wrapperStyle}>
          <Image source={img} style={{ width: 52, height: 54, marginTop: 40, marginBottom: 5 }} />
          <Text>{i18n.t('login.password.login.subtitle')}</Text>
          <InputGroup
            height={47}
            borderType="underline"
            borderWidth={2}
            backgroundColor="white"
            margin={40}
            marginBottom={30}
            marginTop={15}
          >
            <Input
              height={45}
              marginLeft={10}
              fontSize={23}
              placeholder={i18n.t('login.password.input')}
              value={this.state.password}
              onChangeText={this.validatePassword}
              onSubmitEditing={this.onSubmit}
              autoFocus
              secureTextEntry
            />
          </InputGroup>

          <TouchableOpacity
            style={{ height: 50 }}
            onPress={() => this.props.startForgotPasswordFlow(this.props.usernameType)}
          >
            <View style={styles.forgotPhoneView}>
              <Text style={styles.forgotPhoneText}>
                {i18n.t('login.phone.forgot')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <NextFooter
          backgroundColor={!this.state.valid ? 'grey' : '#ed7a44'}
          height={this.state.valid ? 50 : 0}
          onPress={this.onPress}
          disabled={!this.state.valid}
          loading={this.props.submitting}
          text={i18n.t('login.next')}
        />

      </FormPage>
    )
  }
}

const styles = StyleSheet.create({
  forgotPhoneText: {
    fontFamily: 'Karla-Regular',
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
  forgotPhoneView: {
    width: 200,
    alignSelf: 'center',
    height: 30,
  },
})

