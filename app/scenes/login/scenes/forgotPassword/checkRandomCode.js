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
// import ForgotphoneModal from './oldForgotphoneModal'
import { CODE_CHECK_REQUEST } from 'app/data/forgotPassword/state'




@connect(
  state => ({
    phone: state.data.forgotPassword.phone,
    token: state.data.forgotPassword.access.tkn,
    submitting: state.data.forgotPassword.isGetting,
  }),
  dispatch => ({
    checkCode: (code, accessToken) => dispatch({ type: CODE_CHECK_REQUEST, code, accessToken }),
  }),
)
export default class Enterphone extends Component {

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


  validate = (t) => {
    this.setState({
      valid: t.length > 0,
      code: t,
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
            {i18n.t('login.forgotPassword.checkRandomCode.title')}
          </Text>
          <Text style={styles.subtitle}>
            {i18n.t('login.forgotPassword.checkRandomCode.subtitle', { phone: this.props.phone })}
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
              placeholder={i18n.t('login.forgotPassword.checkRandomCode.input')}
              fontSize={23}
              value={this.state.code}
              onChangeText={this.validate}
              onSubmitEditing={this.onSubmit}
              keyboardType='numeric'
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
  },
  subtitle: {
    fontSize: 15,
    fontFamily: 'Karla-Bold',
    textAlign: 'center',
  },
});
