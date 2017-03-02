import React,  { Component } from 'react'
import { View, Text, Image, StyleSheet, Dimensions, Keyboard, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux'
import MDIcon from 'react-native-vector-icons/Ionicons'

const DEFAULT_ARRW_DIM = 45
const ARR_PAD = 5
const { Wx, Wy } = Dimensions.get('window') // TODO: this is not a reliable way to do this
                                            // we should really establish a max global height first
                                            // or don't center stuff
@connect((state) => ({
  height: state.global.height,
  navigators: state.navigation.navigators,
}))
export default class FormPage extends Component {
  componentWillMount() {
    this.props.dismissKeyboardOnMount ? Keyboard.dismiss() : null
  }


  render() {
    const Wrapper = (this.props.backgroundImage ?  Image : View)
    return (
      <View style={{flex:1, backgroundColor:this.props.backgroundColor||'white', height:900}}>
        <Wrapper
          transition="maxHeight"
          resizeMode="cover"
          source={this.props.backgroundImage}
          style={[styles.container, { width: Wx, maxHeight: this.props.fixed ? Wy : this.props.height, backgroundColor: this.props.backgroundColor }]}
        >
          { this.props.children }
        </Wrapper>

        {(!this.props.isFirstPage)
          ? <TouchableOpacity
              onPress={this.props.backAction}
              style={{
                width: this.props.arrowSize || DEFAULT_ARRW_DIM,
                height: this.props.arrowSize || DEFAULT_ARRW_DIM,
                margin: ARR_PAD,
                position: 'absolute',
                top: (Platform.OS === 'ios') ? 10 : 0,
                left: 5,
              }}
            >
              <MDIcon
                name="md-arrow-back"
                size={this.props.arrowSize || DEFAULT_ARRW_DIM}
                color={this.props.arrowColor || 'black'}
              />
            </TouchableOpacity>
          : null
        }
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: 'pink',
  },
})
