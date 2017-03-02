import React, { Component } from 'react'
import  {
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  View
} from 'react-native'
// import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/Ionicons'
/* based on the solution found here for custom navbar:
https://github.com/exponentjs/ex-navigator/issues/6#issuecomment-186581820 */
// TODO: implement own version of this

var COMPONENT_NAMES = ['Title', 'LeftButton', 'RightButton'];


const CENTER_PADDING = 10

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      height: new Animated.Value(0)
    }
  }

  componentWillReceiveProps (next) {
    Animated.timing(
      this.state.height,
      {toValue:next.height, duration:100}
    ).start();
  }

  render() {
    // const h = this.state.hidden ? 0 : this.state.openHeight
    // const h = this.props.height || 0
    // console.log(h);

    return (
      <Animated.View  style={{
        height:this.state.height,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'transparent',
        overflow: 'hidden',
      }}>
        <View style={styles.innerContainer}>
          { this.props.children }
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  navBarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  innerContainer: {
    flexDirection: 'row',
    backgroundColor:'rgba(0,0,0,0.8)',
    flex:1,
    alignItems:'center',
    paddingLeft: CENTER_PADDING
  }
})
