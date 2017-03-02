import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  Image,
  Keyboard,
  BackAndroid
} from 'react-native'

import i18n  from 'react-native-i18n'
import Modal from 'react-native-simple-modal'

import { AndroidBackButtonBehavior } from '@exponent/ex-navigation'

export default class DoneScreen extends Component {

  _open = () => {
    Keyboard.dismiss()
  }




  render() {
    return (

      <AndroidBackButtonBehavior isFocused={true} onBackButtonPress={()=>Promise.resolve(console.log('heyyyy'))}>
      <View style={{ flex:1, flexDirection:'column', alignItems:'center', justifyContent:'center', backgroundColor:'black'}}>
        <View>
          <Image
            resizeMode='contain'
            style={{width:90, height:90}}
            source={{uri:'sammy'}}/>{/*TODO: change this to assets folder -_-*/}
        <View>
          <Image
            resizeMode='contain'
            style={{width:300, height:90, top:-30}}
            source={{uri:'st_logo'}}/>
        </View>
        <View style={{ width:300, top:-30, right:10}}>
          <Text style={styles.text}>
            {i18n.t('login.successModal', {locale:this.props.locale})}
          </Text>
        </View>
      </View>
    </View>
    </AndroidBackButtonBehavior>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Karla-Regular',
    fontSize: 23,
    textAlign: 'center',
    padding: 5,
    color: 'white',
  },
})
