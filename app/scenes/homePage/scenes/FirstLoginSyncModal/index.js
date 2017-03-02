import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Keyboard,
} from 'react-native'

import i18n  from 'react-native-i18n'
import Modal from 'react-native-simple-modal'


export default class FirstLoginModal extends Component {

  _open = () => {
    Keyboard.dismiss()
  }

  render() {
    return (
      <Modal
        open={this.props.open}
        offset={0}
        overlayBackground={'rgba(0, 0, 0, 1)'}
        animationDuration={200}
        animationTension={40}
        modalDidOpen={this._open}
        modalDidClose={()=>undefined}
        closeOnTouchOutside={false}
        containerStyle={{ justifyContent:'center' }}
        modalStyle={{ borderRadius: 2, backgroundColor: 'transparent' }}
      >
        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <View>
            <Image
              resizeMode='contain'
              style={{ width: 90, height: 90}}
              source={{ uri: 'sammy' }}/> {/*TODO: change this to assets folder -_-*/}
            <View>
              <Image
                resizeMode='contain'
                style={{ width: 300, height: 90, top: -30 }}
                source={{ uri:'st_logo' }}/>
            </View>
            <View style={{ width: 300, top: -30, right:10 }}>
              <Text style={styles.text}>
                {i18n.t('login.successModal', { locale: this.props.locale })}
              </Text>
            </View>
          </View>
        </View>
      </Modal>
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
