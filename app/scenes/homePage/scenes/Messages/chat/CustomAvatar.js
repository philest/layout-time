import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  View,
} from 'react-native';

import GiftedAvatar from 'app/vendor/react-native-gifted-chat/src/GiftedAvatar';

const IMAGE_DIAMETER = 30

export default class Avatar extends Component {

  isSameUserOrLastMessage = (currentMessage, nextMessage) => {
    return this.props.isSameUser(currentMessage, nextMessage) || Object.keys(nextMessage).length === 0
  }

  renderAvatar() {
    if (this.props.renderAvatar) {
      const {renderAvatar, ...avatarProps} = this.props;
      return this.props.renderAvatar(avatarProps);
    }
    return (
      <GiftedAvatar
        avatarStyle={StyleSheet.flatten([styles[this.props.position].image, this.props.imageStyle[this.props.position]])}
        user={this.props.currentMessage.user}
      />
    );
  }

  render() {
    if (this.props.isSameUser(this.props.currentMessage, this.props.nextMessage) && this.props.isSameDay(this.props.currentMessage, this.props.nextMessage)) {
      return (
        <View style={[styles[this.props.position].container, this.props.containerStyle[this.props.position]]}>
          <GiftedAvatar
            avatarStyle={StyleSheet.flatten([styles[this.props.position].image, this.props.imageStyle[this.props.position]])}
          />
        </View>
      )
    }
    return (
      <View style={[styles[this.props.position].container, this.props.containerStyle[this.props.position]]}>
        {this.renderAvatar()}
      </View>
    );
  }
}

const styles = {
  left: StyleSheet.create({
    container: {
      marginRight: 0,
    },
    image: {
      height: IMAGE_DIAMETER,
      width: IMAGE_DIAMETER,
      borderRadius: IMAGE_DIAMETER/2,
    },
  }),
  right: StyleSheet.create({
    container: {
      marginLeft: 0,
    },
    image: {
      height: IMAGE_DIAMETER,
      width: IMAGE_DIAMETER,
      borderRadius: IMAGE_DIAMETER/2,
    },
  }),
};

Avatar.defaultProps = {
  isSameDay: () => {},
  isSameUser: () => {},
  position: 'left',
  currentMessage: {
    user: null,
  },
  nextMessage: {},
  containerStyle: {},
  imageStyle: {},
};

Avatar.propTypes = {
  isSameDay: React.PropTypes.func,
  isSameUser: React.PropTypes.func,
  position: React.PropTypes.oneOf(['left', 'right']),
  currentMessage: React.PropTypes.object,
  nextMessage: React.PropTypes.object,
  containerStyle: View.propTypes.style,
  imageStyle: React.PropTypes.oneOfType([View.propTypes.style, Image.propTypes.style]),
};
