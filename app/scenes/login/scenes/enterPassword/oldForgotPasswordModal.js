import Modal from 'react-native-simple-modal'
import ParsedText from 'react-native-parsed-text'
import Communications from 'react-native-communications'

// vendor components
import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Keyboard,
} from 'react-native'


import i18n from 'react-native-i18n'

import { VERSION } from 'app/constants'





const THE_WIDTH = 300
export default class ForgotPasswordModal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      index: 0,
    }
  }

  onUrlPress(url) {
    Linking.openURL(url);
  }

  onPhonePress(phone) {
    Communications.phonecall(phone, true);
  }

  openModal = () => {
    Keyboard.dismiss()
  }

  navigateTo = (index) => {
    const x = index * THE_WIDTH
    return this.scroller.scrollTo({x})
  }

  backAction = (index) => {
    if (!index) {
      return this.closeModal()
    }
    return this.navigateTo(index-1)
  }

  closeModal = () => {
    this.props.closeModal()
  }


  render() {
    return <Modal
      open={this.props.visible}
      offset={0}
      overlayBackground={'rgba(0, 0, 0, 0.75)'}
      animationDuration={200}
      animationTension={40}
      modalDidOpen={this.openModal}
      modalDidClose={this.closeModal}
      closeOnTouchOutside={true}
      containerStyle={{
         justifyContent: 'center'
      }}
      modalStyle={{
         borderRadius: 2,
         margin: 30,
         backgroundColor: '#F5F5F5',
         height:150,
      }}>
        <View>
          <Text style={[styles.text, {fontSize:18, paddingBottom:10}]}>
            {i18n.t('login.phone.forgottxt')}
          </Text>
          <ParsedText style={styles.text}
            parse={[
              {type: 'phone', style: styles.link, onPress: this.onPhonePress},
            ]}
          >
            (561) 212-5831
          </ParsedText>
        </View>
          <Text style={[styles.text], {fontSize:10, textAlign:'left', paddingTop:10}}>
            StoryTime app v{VERSION}.
          </Text>

      </Modal>

  }
}

const styles= StyleSheet.create({
  text: {
    fontFamily:'Karla-Bold',
    fontSize:30,
    textAlign:'center',
    padding:5
  },
  link: {
    color: 'darkblue',
    textDecorationLine: 'underline',
  },
})
