import Modal from 'react-native-simple-modal'
import ParsedText from 'react-native-parsed-text'
import Communications from 'react-native-communications'

// vendor components
import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
} from 'react-native'


import i18n from 'react-native-i18n'
import MDIcon from 'react-native-vector-icons/Ionicons'

import { ST_ORANGE } from 'app/constants'
import { VERSION } from 'app/constants'


import { Button } from 'native-base';

const DEFAULT_ARRW_DIM = 30
const ARR_PAD = 10

  // createPassword: () => CreatePassword,
  // enterPassword: () => EnterPassword, // for logging back in
  // pickRole: () => PickRole,
  // inputName: () => InputName,
  // inputCode: () => InputCode,
  // doneScreen: () => DoneScreen,
  // inviteTeacher: () => InviteTeacher,


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
      closeOnTouchOutside={false}
      containerStyle={{
         justifyContent: 'center'
      }}
      modalStyle={{
         borderRadius: 2,
         margin: 30,
         backgroundColor: '#F5F5F5',
         height:200,
      }}>

        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ref={(ref)=>{this.scroller = ref}}
          style={{ width: THE_WIDTH }}
          horizontal={true}
          pagingEnabled={true}
          scrollEnabled={false}
        >

          <View style={{ flex: 1, width: THE_WIDTH, alignItems:'center', justifyContent:'center' }}>
            <Text style={[styles.text, {fontSize:18, color:'black', paddingBottom:10}]}>
              {i18n.t('login.forgotPass.usuredawg?')}
            </Text>
            <Button danger style={{ alignSelf: 'center'}} onPress={()=>this.navigateTo(1)}>
              <ActivityIndicator />
            </Button>

          </View>

          <View style={{flex:1,  width:THE_WIDTH}}>
            <Text style={[styles.text, {fontSize:18, paddingBottom:10}]}>
              {i18n.t('login.forgotPass.forgottxt')}
            </Text>
            <ParsedText style={styles.text}
              parse={[
                {type: 'phone', style: styles.link, onPress: this.onPhonePress},
              ]}
            >
              (561) 212-5831
            </ParsedText>
          </View>


        </ScrollView>


        <Text style={[styles.text], {fontSize:10, textAlign:'left', paddingTop:10}}>
          StoryTime app v{VERSION}
        </Text>

        <TouchableOpacity
            onPress={this.props.closeModal}
            style={{
              width: this.props.arrowSize || DEFAULT_ARRW_DIM,
              height: this.props.arrowSize || DEFAULT_ARRW_DIM,
              margin: ARR_PAD,
              position: 'absolute',
              bottom: 2,
              right: 0,
            }}
          >
            <MDIcon
              name="md-close-circle"
              size={this.props.arrowSize || DEFAULT_ARRW_DIM}
              color={this.props.arrowColor || 'black'}
            />
        </TouchableOpacity>

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
