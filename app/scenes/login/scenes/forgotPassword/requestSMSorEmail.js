// vendor components
import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native'

import i18n from 'react-native-i18n'

import { connect } from 'react-redux'

// components
import { InputGroup, Input } from 'native-base'
import FormPage  from '../components/FormPage'
import NextFooter from '../components/NextFooter'
// import ForgotusernameModal from './oldForgotusernameModal'
import { SMS_REQUEST_REQUEST } from 'app/data/forgotPassword/state'

import { getUsernameType, stripPhone, stripEmail } from '../../helpers'

    // stripped: t.replace(/\D/g, ''),
    // stripped: t.replace(/\s/g, ''),


@connect(
  state => ({
    username: state.scenes.login.form.username,
    submitting: state.data.forgotPassword.isGetting,
  }),
  dispatch => ({
    requestSMS: (username) => dispatch({ type: SMS_REQUEST_REQUEST, username }),
    startFlow: (username, resetMethod) => dispatch({ type: 'RESET_START', username, resetMethod }),
  }),
)
export default class RequestSMSorEmail extends Component {

  constructor(props) {
    super(props)
    const usernameType = getUsernameType(props.username)
    this.state = {
      valid: usernameType !== 'unclear',
      username: props.username,
    }
  }

  onPress = () => {
    const unstripped = this.state.username
    const usernameType = getUsernameType(unstripped)
    let strippedName

    // TODO: clean this up
    if (this.state.valid) {
      if (usernameType === 'phone') {
        strippedName = stripPhone(unstripped)
        this.props.startFlow(strippedName, usernameType)
      } else if (usernameType === 'email') {
        strippedName = stripEmail(unstripped, usernameType)
        this.props.startFlow(strippedName, usernameType)
      } else {
        // TODO: what the hell
      }
    }
    const eventName = (usernameType === 'phone') ? 'SMS Code Requested' : 'Email Reset Requested'
    this.props.trackEvent(eventName, {
      properties: {
        username: this.state.username,
        validInput: this.state.valid,
      },
    })
  }


  validate = (t) => {
    const usernameType = getUsernameType(t)
    this.setState({
      valid: usernameType !== 'unclear',
      username: t,
    })
  }


  onSubmit = () => {
    this.onPress()
  }

  render() {
    const img = require('app/assets/img/lock_key.png')
    return (
      <FormPage backgroundColor="white" arrowColor="black" backAction={this.props.backAction}>
        <View style={this.props.wrapperStyle}>
          <Image source={img} style={{ width: 52, height: 54, marginTop: 40, marginBottom: 5 }} />
          <Text style={styles.title}>
            {i18n.t('login.forgotPassword.requestSMS.title')}
          </Text>
          <Text style={styles.subtitle}>
            {i18n.t('login.forgotPassword.requestSMS.subtitle')}
          </Text>
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
              placeholder={i18n.t('login.forgotPassword.requestSMS.input')}
              fontSize={23}
              value={this.state.username}
              onChangeText={this.validate}
              onSubmitEditing={this.onSubmit}
              autoFocus
            />
          </InputGroup>
        </View>

        <NextFooter
          backgroundColor={!this.state.valid ? 'grey' : '#ed7a44'}
          height={50}
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
  title: {
    fontSize: 18,
    fontFamily: 'Karla-Bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    fontFamily: 'Karla-Bold',
  },
});
