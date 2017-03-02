// vendor components
import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'

import i18n from 'react-native-i18n'
import * as Animatable from 'react-native-animatable'
import { Icon, InputGroup, Input, Spinner } from 'native-base'
import { connect } from 'react-redux'

// components
import FormPage  from './components/FormPage'
import NextFooter from './components/NextFooter'


import { startLoginFlow } from 'app/data/credentials/state'


import { setFormValue } from '../state'
import { getUsernameType, stripPhone, stripEmail } from '../helpers'


const formatPhone = (phone) => {
  const stripped = phone.replace(/\D/g, '');
  const l = stripped.length
  if (l > 9) {
    return `(${stripped.slice(0, 3)}) ${stripped.slice(3, 6)}-${stripped.slice(6, 20)}`
  }
  // if (l > 5) {
  //   return `(${stripped.slice(0,3)}) ${stripped.slice(3,9)}`
  // }
  // if (l >=4) {
  //   return `(${stripped.slice(0,3)}) ${stripped.slice(3,5)}`
  // }
  return stripped
}


@connect(
  state => ({
    u: state.global.keyboardUp,
    submitting: state.data.user.account.isGetting,
  }),
  dispatch => ({
    // TODO: decide if I wanna consolidate all of this behavior into the saga...
    setUsernameStuff(username, usernameType) {
      dispatch(setFormValue('username', username))
      dispatch(setFormValue('usernameType', usernameType))
    },
    startLoginFlow(username) {
      dispatch(startLoginFlow(username))
    },
  }),
)
export default class EnterUsername extends Component {

  constructor(props) {
    super(props)
    this.state = {
      valid: false,
      triggered: false,
      username: '',
      showModal: false,
    }
  }

  onPress = () => {
    this.setState({ triggered: true })
    const unstripped = this.state.username
    const usernameType = getUsernameType(unstripped)
    let strippedName
    if (usernameType === 'phone') {
      strippedName = stripPhone(unstripped)
    } else if (usernameType === 'email') {
      strippedName = stripEmail(unstripped)
    }


    if (this.state.valid) {
      this.props.setUsernameStuff(strippedName, usernameType) // TODO: change
      this.props.startLoginFlow(strippedName, usernameType)
    }

    this.props.trackEvent('Username Entered', {
      properties: {
        validInput: this.state.valid,
        username: this.state.setUsername,
        type: usernameType,
      },
    })

  }


  onSubmit = () => {
    this.onPress()
  }



  validate = (t) => {
    const usernameType = getUsernameType(t)
    this.setState({
      valid: (usernameType !== 'unclear'),
      username: t,
    })
  }




  renderIcon = () => {
    if (this.state.valid) {
      return <Icon name="ios-checkmark-circle" style={{ color: '#00C497', marginTop: 5 }} />;
    }
    return this.state.triggered ? <Icon name="ios-close-circle" style={{ color: 'red' }} /> : null;
  }




  render() {
    const img = require('app/assets/img/bg_login.jpg')
    return (
      <FormPage
        backgroundImage={img}
        backgroundColor="pink"
        isFirstPage
      >
        <View style={this.props.wrapperStyle}>
          <View style={[styles.storyTimeContainer, { marginTop: this.props.u ? 40   : -70 }]}>
            <Text style={styles.storyTimeText}>
              StoryTime
            </Text>
          </View>

          <View style={styles.subtitleContainerub}>
            <Animatable.Text
              style={[styles.subtitleText, { maxHeight: this.props.u ? 0 : 25 }]}
              transition="maxHeight"
              duration={300}
            >
              {i18n.t('login.phone.subtitle')}
            </Animatable.Text>
          </View>
          <View style={{ width: 400 }}>
            <InputGroup
              borderRadius={8}
              backgroundColor="white"
              height={50}
              borderWidth={5}
              margin={40}
              marginBottom={0}
              marginTop={20}
              iconRight
              success={this.state.valid}
              error={this.state.triggered && !this.state.valid}
            >
              { this.renderIcon() }
              <Input
                placeholder={i18n.t('login.phone.input')}
                fontFamily="Karla-Regular"
                height={50}
                marginLeft={10}
                fontSize={17}
                value={this.state.username}
                onChangeText={this.validate}
                onSubmitEditing={this.onSubmit}
              />
            </InputGroup>
            <View style={styles.spinnerWrapper}>
              {this.props.submitting ? <Spinner color="white" style={{ alignSelf: 'center' }} /> : null }
            </View>
          </View>
        </View>

        <NextFooter
          backgroundColor={this.state.triggered && !this.state.valid ? 'grey' : '#ed7a44'}
          height={50}
          onPress={this.onPress}
          disabled={this.state.triggered && !this.state.valid}
          text={i18n.t('login.next')}
        />
      </FormPage>
    )
  }
}

const styles = StyleSheet.create({
  spinnerWrapper: {
    alignSelf: 'center',
    top: -12,
    width: 50,
    height: 50,
  },
  subtitleContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    width: 320,
  },
  subtitleText: {
    fontFamily: 'Karla-Regular',
    color: 'white',
    fontSize: 18,
  },
  storyTimeContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    width: 320,
  },
  storyTimeText: {
    fontFamily: 'DKCoolCrayon',
    color: 'white',
    fontSize: 50,
  },
})
