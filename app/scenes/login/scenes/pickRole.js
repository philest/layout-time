// vendor components
import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
} from 'react-native'

import i18n from 'react-native-i18n'
import MDIcon from 'react-native-vector-icons/Ionicons'

import { connect } from 'react-redux'

// components
import FormPage  from './components/FormPage'
import Router from 'app/router'
import TouchableTracker from 'app/components/touchableTracker'

// exnav stuff
import {
  NavigationActions,
} from '@exponent/ex-navigation'

import { setFormValue } from '../state'


// TODO: prevent double selection...
@connect()
export default class PickRole extends Component {

  onPress = (role) => {
    this.props.dispatch(setFormValue('role', role)) // TODO: change
    this.props.dispatch(NavigationActions.push('login', Router.getRoute('inputName')))
  }

  renderButton = (text, img, x, y, role) => {
    return (
      <TouchableTracker
        style={btnStyles.touch}
        onPress={()=>this.onPress(role)}
        eventName={'Role Selected'}
        payload={{
          properties: {
            role,
          },
        }}
      >
        <View style={btnStyles.wrapper}>
          <Image source={img} style={{ width: x, height: y, resizeMode: 'contain', marginLeft: 10, marginRight: 20 }} />
          <Text style={btnStyles.text}> {i18n.t('login.role.iam')} {text} </Text>
          <MDIcon name="ios-arrow-forward" size={25} color="#D3D3D3" style={btnStyles.icon} />
        </View>
      </TouchableTracker>
    )
  }

  render() {
    const img = require('app/assets/img/faces.png')
    const heart = require('app/assets/img/heart.png')
    const apple = require('app/assets/img/apple.png')
    const pencil = require('app/assets/img/pencil.png')
    return (
      <FormPage
        dismissKeyboardOnMount
        backAction={this.props.backAction}
        fixed
      >
        <View style={this.props.wrapperStyle}>
          <Image source={img} style={{ width: 171, height: 97, marginTop: 30 }} />
          <Text style={styles.titleText}>
            {i18n.t('login.role.title')}
          </Text>
          <Text style={{ fontSize: 13, marginTop: 8 }}>  {i18n.t('login.role.subtitle')} </Text>
        </View>
        { this.renderButton(i18n.t('login.role.admin'), pencil, 27, 30, 'admin') }
        { this.renderButton(i18n.t('login.role.teacher'), apple, 27, 35, 'teacher') }
        { this.renderButton(i18n.t('login.role.parent'), heart, 30, 28, 'parent') }
      </FormPage>
    )
  }
}

const btnStyles = StyleSheet.create({
  touch: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    height: 75,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#D3D3D3',
  },
  text: {
    alignSelf: 'center',
    fontSize: 20,
    fontFamily: 'Karla-Regular',
    color: 'black',
  },
  icon: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
})

const styles = StyleSheet.create({
  titleText: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 8,
  },
})
