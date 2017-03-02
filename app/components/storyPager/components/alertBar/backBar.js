import React, { Component } from 'react'
import  {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

// TODO unduplication
const BACK_BAR_HEIGHT = 60
const SUGGESTION_HEIGHT = 70


const TEXT_PADDING = 15
const CENTER_PADDING = 10


export default class BackBar extends Component {

  componentWillUnmount () {

  }

  render(bubbleOpen) {

    return (
      <View style={styles.backWrap}>
        <TouchableOpacity style={styles.buttonContainer} onPress={this.props.onPress}>
          <View><Icon name='ios-arrow-back' size={30} color='white'/></View>
        </TouchableOpacity>
        <Text style={styles.titleText}> { this.props.title } </Text>
      </View>
    )
  }

}


const styles = StyleSheet.create({
  backWrap: {
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  buttonContainer: {
    height:BACK_BAR_HEIGHT,
    width:BACK_BAR_HEIGHT/2,
    paddingTop:TEXT_PADDING+8,
  },
  titleText: {
    flex:1,
    color:'white',
    fontSize:30,
    fontFamily: "Karla-Regular",
    textAlign:'center',
    paddingRight: CENTER_PADDING+5,
    paddingTop:TEXT_PADDING-3,
  },
})
