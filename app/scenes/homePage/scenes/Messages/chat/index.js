import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import i18n from 'react-native-i18n'
import {
  GiftedChat,
  Actions,
  Bubble,
  Avatar,
  Composer,
  LoadEarlier
} from 'app/vendor/react-native-gifted-chat';
import CustomView from './CustomView'
import CustomDay from './CustomDay'
import CustomBubble from './CustomBubble'
import CustomMessage from './CustomMessage'
import CustomMessageText from './CustomMessageText'
import CustomAvatar from './CustomAvatar'

import {
  messageGetRequest,
  messageGetSuccess,
  messageGetError,
} from 'app/data/user/state'



import { connect } from 'react-redux'

import { notifyAdmins } from 'app/reducer'

function messageSentByUser(dispatch, msg, formattedMsg) {
  dispatch(messageGetSuccess({ en: formattedMsg, es: formattedMsg }))
  dispatch(notifyAdmins('Message Sent from App', {
    message: msg,
  }))
}


@connect()
export default class STChat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      loadEarlier: true,
      typingText: null,
      isLoadingEarlier: false,
    }

    this._isMounted = false
    this.renderCustomActions = this.renderCustomActions.bind(this)

    this.renderFooter = this.renderFooter.bind(this)

    this._isAlright = null
  }

  componentWillMount() {
    this._isMounted = true
    this.setState(() => {
      return {
        messages: this.props.messages[this.props.locale],
      }
    })
  }

  componentWillReceiveProps(next) {
    if (next.locale!=this.props.locale) {
      if (this.chat) {
        this.setState({
            messages: this.props.messages[next.locale],
        })
        this.chat.setState({
          isInitialized:false,
        })
      }
    }


    // NOTE: the order of these checks does matter here
    // check if previous messages are empty
    if (!this.state.messages.length) {
      this.setState({
        messages: next.messages[next.locale],
      })
      return
    }

    // check if next messages are empty
    if (!next.messages[next.locale].length) {
      return // not sure if this is really what I want to do
    }


    if (next.messages[next.locale][0]._id !== this.state.messages[0]._id) {
      this.setState({
        messages: next.messages[next.locale],
      })
    }

  }


  componentWillUnmount() {
    this._isMounted = false;
  }

  // onLoadEarlier = () => {
  //   this.setState((previousState) => {
  //     return {
  //       isLoadingEarlier: true,
  //     }
  //   })

  //   setTimeout(() => {
  //     if (this._isMounted === true) {
  //       this.setState((previousState) => {
  //         return {
  //           messages: GiftedChat.prepend(previousState.messages, require('./data/old_messages.js')),
  //           loadEarlier: false,
  //           isLoadingEarlier: false,
  //         }
  //       })
  //     }
  //   }, 1000) // simulating network
  // }

  onSend = (messages = []) => {
    const idMessages = messages.map(m => ({...m, _id: Math.round(Math.random() * 1000000)}))
    // this.setState({
    //    messages: GiftedChat.append(this.state.messages, messages),
    // })
    messages.map(m => m.user._id === 1 ? messageSentByUser(this.props.dispatch, m.text, idMessages) : null)

    // for demo purpose
    // this.answerDemo(messages);
  }


  onReceive = (text) => {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, {
          _id: Math.round(Math.random() * 1000000),
          text: "Thanks for trying out the StoryTime demo! :) In a future update, you'll be able to chat with your child's teacher here.",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'StoryTime',
            // avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        }),
      }
    })
  }

  answerDemo = (messages) => {
    if (messages.length > 0) {
      if ((messages[0].image || messages[0].location) || !this._isAlright) {
        this.setState((previousState) => ({
          typingText: 'StoryTime is typing',
        }))
      }
    }

    setTimeout(() => {
      if (this._isMounted === true) {
        if (messages[0].image) {
          this.onReceive('Nice picture!');
          if (messages.length > 0) {
          } else if (messages[0].location) {
            this.onReceive('My favorite place')
          } else if (!this._isAlright) {
            this._isAlright = true;
            this.onReceive('Alright')
          }
        }
      }

      this.onReceive('Alright') // for some reasdon the conditional above doesn't do anything

      this.setState((previousState) => ({
        typingText: null,
      }))
    }, 1000)
  }

  renderCustomActions(props) {
    if (Platform.OS === 'ios') {
      return ( <CustomActions {...props} /> )
    }
    const options = {
      ':)': (props) => {
        alert('option 1');
      },
      'Cancel': () => {},
    };
    return ( <Actions {...props} options={options} /> )
  }

  renderBubble(props) {
    return (
      <CustomBubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#f0f0f0',
            marginRight: 20,
          },
        }}
      />
    );
  }

  renderCustomView = (props) => {
    if (!props.currentMessage) {
      return null
    }

    const key = props.currentMessage.newStory
    const s = props.bookList[key]

    if (!key) {
      return null
    }

    return (
      <CustomView
        {...props}
        touchText={i18n.t('chat.tap2read', { locale:props.locale })}
        imageSrc={[
          { uri: `https://s3.amazonaws.com/st-native-mobile/${props.locale}/${s.awsKey}/${s.awsKey}_spine.png`, width: 400, height: 400 },
        ]}
        onPress={() => {
          this.props.imagePressHandle(key)
          this.props.trackBookOpened(s.awsKey, 'chat')
        }}
      />
    )
  }

  renderFooter(props) {
    if (this.state.typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            {this.state.typingText}
          </Text>
        </View>
      );
    }
    return null;
  }

  renderDay(props) {
    return (<CustomDay {...props} />)
  }

  renderAvatar (props) {
    if (props.currentMessage.user._id === 2) {
      return( <View style={{flex:1, width:30}}>
        <CustomAvatar {...props} />
      </View>)
    }
  }

  renderMessageText = (props) => {
    return ( <CustomMessageText {...props} /> )
  }

  renderComposer = (props) => {
    return ( <Composer
      placeholder={i18n.t('chat.inputprompt'), {locale:props.locale}} />
    )
  }

  renderMessage = (props) => {
    return ( <CustomMessage {...props} /> )
  }

  renderLoadEarlier = (props) => {
    return ( <LoadEarlier {...props}
      label={i18n.t('chat.load_msgs')}
      />
    )
  }


  render() {

    return (
      <View style={{ flex: 1, backgroundColor: this.props.backgroundColor }}>
        <GiftedChat
          ref={c => this.chat = c}
          messages={this.state.messages}
          onSend={this.onSend}
          // loadEarlier={this.state.loadEarlier}
          // onLoadEarlier={this.onLoadEarlier}
          // isLoadingEarlier={this.state.isLoadingEarlier}

          user={{
            _id: 1, // sent messages should have same user._id
          }}
          renderTime={()=>null}
          isAnimated={false}
          renderDay={this.renderDay}
          renderBubble={this.renderBubble}
          // renderActions={this.renderCustomActions}
          // renderComposer={this.renderComposer}
          renderCustomView={this.renderCustomView}
          renderFooter={this.renderFooter}
          renderAvatar={this.renderAvatar}
          renderMessageText={this.renderMessageText}
          locale={this.props.locale}
          // renderLoading={()=>{return (<Text>{i18n.t('chat.loading')}</Text>)}}
          bookList={this.props.bookList}
          isFirstTimeOpeningApp={this.props.isFirstTimeOpeningApp}
          renderComposer={(props)=><Composer {...props} placeholder={i18n.t('chat.inputprompt', {locale:this.props.locale})}/>}
          // renderMessage={this.renderMessage}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
});
