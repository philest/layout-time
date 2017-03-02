import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { Spinner } from 'native-base'

const NextFooter = ({ backgroundColor, text, disabled, loading, height, onPress }) => {
  // render() {
  return (
    <TouchableOpacity
      style={bottomButton.touch}
      onPress={onPress}
      disabled={disabled}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          height: height,
          backgroundColor: backgroundColor,
        }}
      >
        { loading ? <Spinner color="white" /> : <Text style={bottomButton.text}> {text} </Text> }
      </View>
    </TouchableOpacity>
  )
  // }
}


NextFooter.defaultProps = {
  backgroundColor: 'red',
  disabled: false,
  height: 40,
}

NextFooter.propTypes = {
  backgroundColor: React.PropTypes.string,
  text: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  loading: React.PropTypes.bool,
  height: React.PropTypes.number,
  onPress: React.PropTypes.func,
}


const bottomButton = StyleSheet.create({
  touch: {
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  text: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 20,
    fontFamily: 'Karla-Bold',
  },
})

export default NextFooter
