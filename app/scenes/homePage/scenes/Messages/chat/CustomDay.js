import React from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'

import moment from 'moment'

import STText from 'app/assets/font/STTextRegular'
import * as Animatable from 'react-native-animatable'
import Day from 'app/vendor/react-native-gifted-chat/src/Day'
import i18n from 'react-native-i18n'

export default class CustomDay extends React.Component {

  renderLastThursday (props) {
    const createdAt = moment(props.currentMessage.createdAt)
    if (createdAt.diff(Date.now(), 'days') >= -7) {
      const day = i18n.t(`date.${createdAt.format('dddd')}`, {locale: props.locale})
      const str = i18n.t('chat.last_XXX', {day:day, locale: props.locale})
      return <STText style={styles.dateText}>
        { str  }
      </STText>
    }
    return <STText style={styles.dateText}>{moment(createdAt).format('ll')}</STText>
  }

  renderToday (locale) {
    return <STText style={styles.dateText}> { i18n.t('chat.today',{ locale })} </STText>
  }

  renderYourStory (onlyToday, locale) {
    return <Animatable.Text transition={['fontSize']} style={[styles.yourStorySmall, {fontSize: onlyToday ? 32 : 20}]}>
      {i18n.t('chat.your_story', {locale})}
    </Animatable.Text>
  }

  renderYourStoryHelper = (isToday, onlyToday, locale) => {
    if ( this.props.currentMessage.user._id==1) { // don't render your story when user makes first move of day
      return null
    }
    return (isToday) ? this.renderYourStory(onlyToday, locale) : null
  }

  render() {
    const isToday = this.props.isSameDay(this.props.currentMessage, {createdAt: new Date(Date.now())})
    const onlyToday = this.props.loadEarlier
    const locale = this.props.locale
    if (!this.props.isSameDay(this.props.currentMessage, this.props.previousMessage)) {
      return (
        <View style={[styles.container, this.props.containerStyle]}>
          <View style={[styles.wrapper, this.props.wrapperStyle]}>
            <View style={styles.lineLeft}/>
              { isToday ? this.renderToday(locale) : this.renderLastThursday(this.props) }
            <View style={styles.lineRight}/>
          </View>
          { this.renderYourStoryHelper(isToday, onlyToday, locale)}
        </View>
      );
    }
    return null
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  dateText: {
    fontSize: 12,
    color:'black',
    fontFamily:'Karla-Regular',
    fontWeight:'normal'
  },
  lineLeft: {
    marginLeft:25,
    flex:3,
    borderTopWidth:1,
    borderColor:'grey',
    alignSelf: 'center'
  },
  lineRight: {
    marginRight:25,
    flex:3,
    borderTopWidth:1,
    borderColor:'grey',
    alignSelf: 'center'
  },
  wrapper: {
    flexDirection:'row',
    // backgroundColor: '#ccc',
    // borderRadius: 10,
    // paddingLeft: 10,
    // paddingRight: 10,
    paddingTop: 10,
    // paddingBottom: 5,
  },
  text: {
    backgroundColor: 'transparent',
    color: '#b2b2b2',
    fontSize: 12,
    fontWeight: '600',
  },
  yourStory: {
    color:'black',
    marginBottom:15,
    fontWeight:'bold',
    fontSize:32,
    fontFamily:'Karla-Italic'
  },
  yourStorySmall: {
    color:'black',
    marginBottom:15,
    fontWeight:'bold',
    fontSize:20,
    fontFamily:'Karla-Italic'
  }
});

Day.contextTypes = {
  getLocale: React.PropTypes.func,
};

Day.defaultProps = {
  isSameDay: () => {},
  currentMessage: {
    // TODO test if crash when createdAt === null
    createdAt: null,
  },
  previousMessage: {},
  containerStyle: {},
  wrapperStyle: {},
  textStyle: {},
};

Day.propTypes = {
  isSameDay: React.PropTypes.func,
  currentMessage: React.PropTypes.object,
  previousMessage: React.PropTypes.object,
  containerStyle: View.propTypes.style,
  wrapperStyle: View.propTypes.style,
  textStyle: Text.propTypes.style,
};
