// vendor components
import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
} from 'react-native'

import i18n from 'react-native-i18n'
import {  InputGroup, Input } from 'native-base'

import { connect } from 'react-redux'


// components
import FormPage  from './components/FormPage'
import NextFooter from './components/NextFooter'

import { pushScene } from 'app/scenes/helpers'
import { submitSignupForm, setFormValue } from '../state'

@connect(
  state => ({
    role: state.scenes.login.form.role,
    form: state.scenes.login.form,
  }),
  dispatch => ({
    pushScene(navigator, route) {
      pushScene(dispatch, navigator, route)
    },
    setName(name) {
      dispatch(setFormValue('literalName', name))
    },
    // we have to pass in the name to avoid race condition were the setName doesn't
    // propagate in time
    submitForm(form, name) {
      dispatch(submitSignupForm({ ...form, freeagent: true, teacherEmail: '', literalName: name }))
    },
  }),
)
export default class InputName extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      valid: false,
    }
  }

  onPress = () => {
    if (this.state.valid) {
      this.props.setName(this.state.name)
      if (this.props.role === 'parent') {
        this.props.pushScene('login', 'inviteTeacher')
      } else {
        this.props.submitForm(this.props.form, this.state.name)
      }
    }
    this.props.trackEvent('Name Entered', {
      properties: {
        validInput: this.state.valid,
        name: this.state.name,
      },
    })
  }

  onSubmit = () => {
    this.onPress()
  }

  validatename = (t) => {
    this.setState({
      name: t,
      valid: t.length > 0, // don't really need this TODO
    })
  }

  render() {
    const img = require('app/assets/img/id_card.png')
    return (
      <FormPage  backgroundColor="white" arrowColor="black" backAction={this.props.backAction}>
        <View style={this.props.wrapperStyle}>
          <Image source={img} style={{ width: 63, height: 53, marginTop: 40, marginBottom: 5 }} />
          <Text style={styles.titleText}> {i18n.t('login.name.title')} </Text>
          <InputGroup
            success={this.state.name}
            height={47}
            borderType="underline"
            borderWidth={2}
            backgroundColor="white"
            margin={40}
            marginBottom={3}
            marginTop={0}>
            <Input
              autoFocus
              height={45}
              marginLeft={10}
              placeholder={i18n.t('login.name.input')}
              fontSize={18}
              fontFamily="Karla-Regular"
              returnKeyType="next"
              onChangeText={this.validatename}
              value={this.state.name}
              onSubmitEditing={this.onSubmit}
            />
          </InputGroup>
        </View>
        <NextFooter
          backgroundColor={!this.state.valid ? 'grey' : '#ed7a44'}
          disabled={!this.state.valid}
          height={50}
          onPress={this.onSubmit}
          text={i18n.t('login.next')}
        />
      </FormPage>
    )
  }
}



const styles = StyleSheet.create({
  titleText: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Karla-Regular',
  },
})

