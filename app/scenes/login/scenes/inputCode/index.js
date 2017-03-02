// vendor components
import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Keyboard,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native'

import i18n from 'react-native-i18n'
import { InputGroup, Input } from 'native-base'

import { connect } from 'react-redux'
// components
import FormPage  from '../components/FormPage'
import NextFooter from '../components/NextFooter'


import { submitSignupForm, setFormValue } from '../../state'

import CodeModal from './forgotCodeModal'

@connect(state => ({
  u: state.global.keyboardUp,
  wholeForm: state.scenes.login.form,
  submitting: state.data.user.account.isGetting,
}))
export default class CreatePassword extends Component {

  constructor(props) {
    super(props)
    this.state = {
      classcode: '',
      valid: false,
    }
  }

  onPress = () => {
    if (this.state.valid) {
      const timeZone = ((new Date()).getTimezoneOffset() / 60) - 1
      this.props.dispatch(setFormValue('classCode', this.state.classcode)) // TODO: fix the capitalization
      this.props.dispatch(submitSignupForm({
        ...this.props.wholeForm,
        classCode: this.state.classcode,
        timeZone,
      }))
    }
    this.props.trackEvent('Class Code Entered', {
      properties: {
        validInput: this.state.valid,
        classCode: this.state.classcode,
      },
    })
  }


  onSubmit = () => {
    this.onPress()
    return this.state.valid ? Keyboard.dismiss() : null
  }

  validateCode = t => {
    this.setState({
      classcode: t,
      valid: t.length > 0,
    })
  }


  showModal = () => {
    this.setState({ showModal: true })
    this.props.trackEvent('Forgot Class Code Opened', {
      properties: {
        validInput: this.state.valid,
        classCode: this.state.classcode,
      },
    })
  }

  render() {
    const img = require('app/assets/img/pencil.png')
    return (
      <FormPage backgroundColor='white' arrowColor='black' backAction={this.props.backAction}>
          <View style={this.props.wrapperStyle}>
            <Image source={img} style={{width:27, height:30, marginTop:50, marginBottom:10}} />
            <Text style={styles.titleText}>{i18n.t('login.code.title')}</Text>
            <Text style={{fontSize:13, color: 'gray'}}>{i18n.t('login.code.subtitle')}</Text>

            <View style={styles.inputContainer}>
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
                  placeholder={i18n.t('login.code.input')}
                  autoFocus
                  value={this.state.classcode}
                  onChangeText={this.validateCode}
                  onSubmitEditing={this.onSubmit} />
              </InputGroup>
            <TouchableOpacity  style={{height:50}} onPress={this.showModal}>
              <View style={styles.forgotCodeView}>
                <Text style={styles.forgotCodeText}> {i18n.t('login.code.forgot')} </Text>
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
  titleText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  forgotCodeView: {
    flex: 1,
    alignSelf: 'center',
    height: 30,
  },
  forgotCodeText: {
    fontFamily: 'Karla-Regular',
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
  inputContainer: {
    flex:1,
    alignSelf:'stretch'
  },
})


