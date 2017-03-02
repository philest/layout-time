import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  Image,
  Keyboard,
} from 'react-native'
import { connect } from 'react-redux'
import i18n  from 'react-native-i18n'
import Modal from 'react-native-simple-modal'

import reactMixin from 'react-mixin'
import TimerMixin from 'react-timer-mixin'

import { setLocale, setNextLocale } from 'app/reducer'

const ST_ORANGE  = '#ed7a44'

@reactMixin.decorate(TimerMixin)
class TransitionModal extends Component {

  constructor (props) {
    super(props)
  }

  _open = (fn) => {
    Keyboard.dismiss()
    const nL = this.props.nextLocale
    this.props.setTheRealLocale(nL)
    this.setTimeout(this.props.closeModal, 1500)
  }

  render () {
    return (<Modal
      open={this.props.open}
      offset={0}
      overlayBackground={'white'}
      animationDuration={200}
      animationTension={40}
      modalDidOpen={this._open}
      modalDidClose={()=>undefined}
      closeOnTouchOutside={false}
      containerStyle={{
         justifyContent: 'center',
      }}
      modalStyle={{
         borderRadius: 2,

      }}>
        <View style={{ flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
          <View>
            <Image
              resizeMode='contain'
              style={{width:90, height:90}}
              source={{uri:'sammy'}}/>
          </View>
          <View>
            <Image
              resizeMode='contain'
              style={{width:300, height:90, top:-30}}
              source={{uri:'st_logo'}}/>
          </View>
          <View style={{ width:300, top:-30, right:10}}>
            <Text style={{fontSize:23, textAlign:'right', color:ST_ORANGE, fontFamily:"Karla-Bold"}}>{i18n.t('transition', {locale:this.props.nextLocale})}</Text>
          </View>
        </View>
      </Modal>
    )
  }
}

import { setHomePageIndex, setPagerRef, closeModal, openModal } from '../../state'

const mapStateToProps = (state) => ({
  nextLocale: state.global.nextLocale
})

const mapDispatchToProps = (dispatch) => ({
  closeModal: (arg) => {
    dispatch(setNextLocale(arg))
  },
  setTheRealLocale: (arg) => {
    dispatch(setLocale(arg))
  },
})

export default connect(mapStateToProps,mapDispatchToProps)(TransitionModal)

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Karla-Regular',
    fontSize: 15,
    textAlign: 'center',
    padding: 5,
  },
})
