// vendor components
import React, { Component } from 'react'
import {
  View,
  Keyboard,
  Text,
  Image,
  Linking,
  StyleSheet,
} from 'react-native'

import i18n from 'react-native-i18n'
import Hyperlink from 'react-native-hyperlink'


import { connect } from 'react-redux'

// actions
import { setFormValue, setPassword } from 'app/scenes/login/state'

// components
import FormPage  from './components/FormPage'
import NextFooter from './components/NextFooter'


import Router from 'app/router'

// exnav stuff
import { NavigationActions } from '@exponent/ex-navigation'

import { InputGroup, Input } from 'native-base'


@connect(state => ({
  email: state.scenes.login.email,
  h: state.global.height,
  u: state.global.keyboardUp,
}))
export default class CreatePassword extends Component {

  constructor (props) {
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
    const eventName = this.props.resetPassword ? 'Password Reset Submitted' : 'Password Created'
    if (this.state.valid) {
      if (this.props.resetPassword) {
        this.props.dispatch()
      } else {
        this.props.dispatch(setPassword(this.state.password))
        this.props.dispatch(setFormValue('password', this.state.password))
        this.props.dispatch(NavigationActions.push('login', Router.getRoute('pickRole')))
      }
    }
    this.props.trackEvent(eventName, {
      properties: {
        validInput: this.state.valid,
      },
    })
  }

  onSubmit = () => {
    this.onPress()
    return this.state.valid ? null : Keyboard.dismiss()
  }

  openUrl = (url) => {
    Linking.openURL(url)
  }

  validatePassword = (t) => {
    this.setState({ password: t })
    this.setState({
      valid: t.length >= 6,
    })
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
  title: {
    fontSize: 18,
    fontFamily: 'Karla-Bold',
  },
  subtitle: {
    fontSize: 15,
    fontFamily: 'Karla-Bold',
  },
});
