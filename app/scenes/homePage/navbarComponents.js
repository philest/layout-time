import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ViewPagerAndroid,
  Keyboard
} from 'react-native';
import STText from 'app/assets/font/STText'
import { connect } from 'react-redux'
import i18n from 'react-native-i18n'
import {setLocale, setNextLocale} from 'app/reducer'

const QuestionMark =  <View><STText>?</STText></View>

class BimodalButton_ extends Component {
  static defaultProps = {
    buttons: [QuestionMark, QuestionMark]
  }
  _renderButton (mode) {
    const padding = 24
    const position = this.props.position
    const page = this.props.buttons[mode].goto
    const button = this.props.buttons[mode].button
    const onPress = (Number.isInteger(page) ? () => {this.props.setPage(page); this.props.pager.setPage(page)} : ()=>{Keyboard.dismiss();this.props.open()})

    return <TouchableOpacity style={{flex:1, paddingLeft: position=='left'?padding:0, paddingRight:position=='right'?padding:0}} onPress={ onPress } >
      <View style={{alignItems:'center', flex:1, justifyContent:'center'}}>
        { button }
      </View>
    </TouchableOpacity>
  }
  render () { return this._renderButton(this.props.mode) }
}

class BimodalTitle_ extends Component {
  static defaultProps = {
    titles: ['0','1']
  }

  _onPress = (props) => {
    if (this.props.locale=='es') {
      this.props.dispatch(setNextLocale('en'))
    } else {
      this.props.dispatch(setNextLocale('es'))
    }
  }

  _renderTitle(mode) {
    const input = this.props.titles[mode]
    const str =  (!mode) ? i18n.t(input,{locale:this.props.locale}) : this.props.school || input
    return <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
      <TouchableOpacity onPress={this._onPress}>
        <STText style={[this.props.style,{fontSize:25}]}> {str} </STText>
      </TouchableOpacity>
    </View>
  }
  render () { return this._renderTitle(this.props.mode) }
}



// connect these babies up!
import { setHomePageIndex, openModal } from './state'

const mapStateToProps = (state) => ({
  mode: state.scenes.homePage.index,
  pager: state.scenes.homePage.pagerRef,
  locale: state.global.locale,
  school: state.data.user.account.items.schoolName,

})

const mapDispatchToProps = (dispatch) => ({
  setPage: (page) => {
    dispatch(setHomePageIndex(page))
  },
  open: ()=> {
    dispatch(openModal())
  }
})

export const BimodalButton = connect(mapStateToProps, mapDispatchToProps)(BimodalButton_)
export const BimodalTitle = connect(mapStateToProps)(BimodalTitle_)
