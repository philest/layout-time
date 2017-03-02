// vendor components
import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
} from 'react-native'

import i18n from 'react-native-i18n'


import { connect } from 'react-redux'

import TouchableTracker from 'app/components/touchableTracker'


// components
import FormPage  from './components/FormPage'

import Router from 'app/router'

// exnav stuff
import {
  NavigationActions,
} from '@exponent/ex-navigation'

import { setFormValue } from '../state'

const buttonH = 50
const buttonW = 300

@connect()
export default class TestTracker extends Component {

  constructor(props) {
    super(props)
  }

  onPress = (role) => {
    this.props.dispatch(setFormValue('role', role)) // TODO: change
    this.props.dispatch(NavigationActions.push('login', Router.getRoute('inputName'))) // TODO, offload this behavior to index.js
  }

  render() {
    return (
      <FormPage
        dismissKeyboardOnMount
        backAction={this.props.backAction}
        fixed
      >
        <View style={{ flex: 1, flexDirection: 'column' }}>
          {/* no children */}
          <TouchableTracker
            style={{ height: buttonH, width: buttonW, backgroundColor: 'red' }}
            onPress={()=>console.log('Pee')}
            eventName="Event with no payload"
          />
          <TouchableTracker
            style={{ height: buttonH, width: buttonW, backgroundColor: 'green' }}
            onPress={()=>console.log('Poo')}
            eventName="Event with payload"
            payload={{
              pee: 'Poo',
              piss: 'pee',
              three: 3,
            }}
          />
          <TouchableTracker
            style={{ height: buttonH, width: buttonW, backgroundColor:'pink' }}
            eventName="Event with payload, but no onPress"
            payload={{
              properties: {
                pee: 'Poo',
                piss: 'pee',
                three: 2,
              },
            }}
          />
          <TouchableTracker
            style={{ height: buttonH, width: buttonW, backgroundColor:'yellow' }}
            eventName="Event empty payload"
            payload={{}}
          />
          <TouchableTracker
            style={{ height: buttonH, width: buttonW, backgroundColor:'blue' }}
            eventName="Event with touchableProps"
            payload={{
              properties: {
                pee: 'Poo',
                piss: 'pee',
                three: 3,
              },
            }}
            touchableProps={{
              disabled: false,
              onLongPress: () => {alert('hey long press')},
            }}
          />
          <TouchableTracker
            style={{ height: buttonH, width: buttonW, backgroundColor:'grey' }}
            eventName="Disabled via touchableProps"
            payload={{
              properties: {
                pee: 'Poo',
                piss: 'pee',
                three: 3,
              },
            }}
            touchableProps={{
              disabled: true,
            }}
          />


          {/* with children */}
          <TouchableTracker
            style={{ height: buttonH, width: buttonW, backgroundColor:'black' }}
            eventName="Event with text, payload, and onPress"
            payload={{
              properties: {
                pee: 'Poo',
                piss: 'pee',
                three: 3,
              },
            }}
            onPress={()=>console.log('Farts')}
          >
            <Text style={{fontWeight:'bold', color:'white', fontSize:20, marginTop:8}}>
              {i18n.t('login.role.title')}
            </Text>
          </TouchableTracker>

          <TouchableTracker
            style={{ height: buttonH, width: buttonW }}
            eventName="Event with just view"
            payload={{
              properties: {
                pee: 'Poo',
                piss: 'pee',
                three: 3,
              },
            }}
            onPress={()=>console.log('Farts')}
          >
            <View style={{backgroundColor:'purple', flex:1}}/>
          </TouchableTracker>

          <TouchableTracker
            style={{ height: buttonH, width: buttonW }}
            eventName="Event with just view"
            payload={{
              properties: {
                pee: 'Poo',
                piss: 'pee',
                three: 3,
              },
            }}
            onPress={()=>console.log('Farts')}
          >
            <View style={{backgroundColor:'brown', flex:1}}/>
          </TouchableTracker>

        </View>
      </FormPage>
    )
  }
}

btnStyles = StyleSheet.create({
  touch: {
    alignSelf:'stretch',
    flexDirection:'row',
    height: 75,
  },
  wrapper:{
    flex:1,
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    borderTopWidth:1,
    borderTopColor: '#D3D3D3'
  },
  text:{
    alignSelf:'center',
    fontSize:20,
    fontFamily:'Karla-Regular',
    color:'black'
  },
  icon: {
    position:'absolute',
    right:20,
    bottom:20
  }
})
