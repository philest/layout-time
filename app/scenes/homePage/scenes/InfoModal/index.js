import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  Keyboard,
} from 'react-native'
import { connect } from 'react-redux'
import Modal from 'react-native-simple-modal'

import ParsedText from 'react-native-parsed-text'
import Communications from 'react-native-communications'

import { logout } from 'app/data/credentials/state'

import { VERSION } from 'app/constants'

import { setHomePageIndex, setPagerRef, closeModal, openModal } from '../../state'

@connect(
  state => ({
    visible: state.scenes.homePage.modalVisible,
  }),
  dispatch => ({
    closeModal: () => { dispatch(closeModal()) },
    logout: () => { dispatch(logout('info modal')) }, // TODO: rename to logoutOfApp
  }),
)
export default class STModal extends Component {

  componentDidMount() {
    // TODO?
  }

  // onUrlPress(url) {
  //   Linking.openURL(url);
  // }

  onPhonePress(phone) {
    Communications.phonecall(phone, true);
  }

  onEmailPress(email) {
    Communications.email(email, null, null, null, null);
  }

  render() {
    return (
      <Modal
        open={this.props.visible}
        offset={0}
        overlayBackground={'rgba(0, 0, 0, 0.75)'}
        animationDuration={200}
        animationTension={40}
        modalDidOpen={Keyboard.dismiss()}
        modalDidClose={this.props.closeModal}
        closeOnTouchOutside={true}
        containerStyle={{
           justifyContent: 'center',
        }}
        modalStyle={{
          borderRadius: 2,
          margin: 30,
          backgroundColor: '#F5F5F5',
        }}
      >
        <View>
          <View style={{ alignSelf: 'center', flexDirection: 'row'}}>
            <Image
              resizeMode="contain"
              style={{ width: 90, height: 90, marginRight: 25 }}
              source={{ uri: 'sammy' }}/>
            <TouchableOpacity
              onPress={this.props.logout}
              style={{ height: 90, justifyContent: 'center' }}
            >
              <Text style={[styles.text, { fontSize: 25, color: 'black' }]}> Log Out </Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.text, { fontSize: 25 }]}>
            StoryTime helps teachers share picture books.{'\n'}
          </Text>

          <Text style={[styles.text, { fontSize: 15, paddingBottom: 10 }]}>
            Get in touch for help!
          </Text>

          <ParsedText style={styles.text}
            parse={[
              { type: 'phone', style: styles.link, onPress: this.onPhonePress },
            ]}
          >
            (561) 212-5831
          </ParsedText>
          <ParsedText style={styles.text}
            parse={[
              { type: 'email', style: styles.link, onPress: this.onEmailPress },
            ]}
          >
            support@joinstorytime.com
          </ParsedText>
          <Text style={[styles.text], { fontSize: 10, textAlign: 'left', paddingTop: 10 }}>
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
    fontSize: 15,
    textAlign: 'center',
    padding: 5,
  },
  link: {
    color: 'darkblue',
    textDecorationLine: 'underline',
  },
})
