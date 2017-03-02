// vendor components
import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Keyboard,
  Text,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native'

import i18n from 'react-native-i18n'
import {  InputGroup, Input } from 'native-base'

import { connect } from 'react-redux'

// components
import FormPage  from '../components/FormPage'
import NextFooter from '../components/NextFooter'

import Router from 'app/router'

// exnav stuff
import {
  NavigationActions,
} from '@exponent/ex-navigation'

import { submitSignupForm, setFormValue } from '../../state'

import CodeModal from './inviteTeacherModal'

import { validateEmail } from '../../helpers'

@connect(state => ({
  u: state.global.keyboardUp,
  wholeForm: state.scenes.login.form,
  submitting: state.data.user.account.isGetting,
}))
export default class InviteTeacher extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      valid: false,
    }
  }

  onPress = () => {
    if (this.state.valid) {
      this.props.dispatch(setFormValue('teacherEmail', this.state.email)) // TODO: fix the capitalization
      this.props.dispatch(submitSignupForm({ ...this.props.wholeForm, freeagent: true, teacherEmail: this.state.email}))
    }
    this.props.trackEvent('Teacher Invited', {
      properties: {
        validInput: this.state.valid,
        teacherEmail: this.state.email,
      },
    })
  }

  onPressFooter = () => {
    this.props.dispatch(NavigationActions.push('login', Router.getRoute('inputCode')))
    this.props.trackEvent('Invite Teacher Skipped', {
      properties: {
        validInput: this.state.valid,
        teacherEmail: this.state.email,
      },
    })
  }

  onSubmit = () => {
    this.onPress()
    return this.state.valid ? Keyboard.dismiss() : null
  }

  validate = t => {
    this.setState({
      email: t,
      valid: validateEmail(t),
    })
  }

  openUrl = (url) => {
    Linking.openURL(url)
  }

  render() {
    const img = require('app/assets/img/book.png')
    return (
      <FormPage backgroundColor='white' arrowColor='black' backAction={this.props.backAction}>
        <View style={this.props.wrapperStyle}>
          <Image source={img} style={{ width: 60, height: 60, marginTop: 40, marginBottom: 10}} />
          <Text style={styles.inviteTitle}>
            {i18n.t('login.invite.title')}
          </Text>
          <Text style={styles.inviteSubtitle}>
            {i18n.t('login.invite.subtitle')}
          </Text>

          <View style={{ flex: 1, alignSelf: 'stretch' }}>
            <InputGroup
              success={this.state.valid}
              error={this.state.triggered && !this.state.valid}
              height={45}
              borderType='underline'
              borderWidth={2}
              backgroundColor='white'
              margin={40}
              marginBottom={15}
              marginTop={0}
            >
              <Input
                height={45}
                marginLeft={10}
                fontSize={18}
                fontFamily='Karla-Regular'
                placeholder={i18n.t('login.invite.input')}
                autoFocus
                value={this.state.classcode}
                onChangeText={this.validate}
                onSubmitEditing={this.onSubmit}
              />
            </InputGroup>
            <TouchableOpacity  style={{ height: 50 }} onPress={this.onPressFooter}>
              <View style={{ flex: 1, alignSelf: 'center', height: 30 }}>
                <Text style={styles.inviteContinue}>
                  {i18n.t('login.invite.continue')}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <NextFooter
          backgroundColor={this.state.valid ? '#ed7a44' : 'grey'}
          height={40}
          onPress={this.onPress}
          text={i18n.t('login.done')}
          loading={this.props.submitting}
        />
        <CodeModal
          visible={this.state.showModal}
          closeModal={() => { this.setState({ showModal: false }) }}
        />
      </FormPage>
    )
  }
}

const styles = StyleSheet.create({
  inviteContinue: {
    fontFamily: 'Karla-Regular',
    color: 'darkblue',
    fontSize: 16,
    textAlign: 'center',
  },
  inviteTitle: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  inviteSubtitle: {
    fontSize: 13,
    color: 'gray',
  },
})
