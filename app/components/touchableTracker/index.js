import React, { Component } from 'react'
import { TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { connect } from 'react-redux'
import { trkrTrack } from 'app/data/eventTracker/state'


@connect()
export default class TouchableTracker extends Component {

  onPress = () => {
    const eventName       = this.props.eventName

    // track event (side-effect picked up by )
    this.props.dispatch(trkrTrack({
      event: eventName,
      ...this.props.payload,
    }))

    // do any other activies specified by user
    if (this.props.onPress) {
      try {
        this.props.onPress()
      } catch (err) {
        console.log(`ERR: sumin went wrong with onPress @ event track ${eventName}, but the event was probably correcly reported`)
        throw err // TODO: what else should we be doin?
      }
    }
  }

  render() {
    const Touchable = TouchableOpacity
    const {
      onPress: deadOnPress,
      style: deadStyle,
      disabled: deadDisabled,
      ...touchPropsMinusOnPressAndStyle
    } = this.props.touchableProps

    if (deadOnPress || deadStyle || deadDisabled) {
      console.log('WARNING: onpress/style/disabled in _touchableProps_ (not TouchableTracker itself) will be ignored')
    }

    return (
      <Touchable
        {...touchPropsMinusOnPressAndStyle}
        style={this.props.style}
        onPress={this.onPress}
        disabled={this.props.disabled}
      >
        {this.props.children}
      </Touchable>
    )
  }
}


TouchableTracker.defaultProps = {
  touchableType: 'opacity',
  payload: {},
  style: {},
  touchableProps: {},
  disabled: false,
};

TouchableTracker.propTypes = {
  touchableType: React.PropTypes.oneOf(['opacity', 'highlight', 'withoutFeedback']),
  eventName: React.PropTypes.string.isRequired,
  payload: React.PropTypes.object,
  touchableProps: React.PropTypes.object,
  onPress: React.PropTypes.func,
  disabled: React.PropTypes.bool,
}
