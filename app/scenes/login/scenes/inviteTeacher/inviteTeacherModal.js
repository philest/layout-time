import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Linking,
} from 'react-native'

import i18n from 'react-native-i18n'

import Modal from 'react-native-simple-modal'
import ParsedText from 'react-native-parsed-text'
import Communications from 'react-native-communications'

import { VERSION } from  'app/constants'

export default class InviteTeacherModal extends Component {

  onUrlPress(url) {
    Linking.openURL(url);
  }

  onPhonePress(phone) {
    Communications.phonecall(phone, true);
  }

  render() {
    return (
      <Modal
        open={this.props.visible}
        offset={0}
        overlayBackground={'rgba(0, 0, 0, 0.75)'}
        animationDuration={200}
        animationTension={40}
        modalDidOpen={()=>{}}
        modalDidClose={this.props.closeModal}
        closeOnTouchOutside={true}
        containerStyle={{
          justifyContent: 'center',
        }}
        modalStyle={{
          borderRadius: 2,
          margin: 30,
          backgroundColor: '#F5F5F5',
        }}>
        <View>
          <Text style={[styles.text, { fontSize: 18 }]}>
            {i18n.t('login.invite.forgottxt1')}
          </Text>
          <ParsedText style={styles.text}
            parse={[
              { type: 'phone', style: styles.link, onPress: this.onPhonePress },
            ]}
          >
            {i18n.t('login.invite.forgottxt2', { phone: '(561) 212-5831' })}
          </ParsedText>
          <Text style={[styles.text, { fontSize: 18, paddingBottom: 10 }]}>
            {i18n.t('login.invite.forgottxt3')}
          </Text>
          <Text style={[styles.text, { fontSize: 10, textAlign: 'left', paddingTop: 10 }]}>
            StoryTime app v{VERSION}.
          </Text>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Karla-Regular',
    fontSize: 25,
    textAlign: 'center',
    padding: 5,
  },
  link: {
    color: 'darkblue',
    textDecorationLine: 'underline',
  },
})
