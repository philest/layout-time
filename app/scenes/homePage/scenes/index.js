import React, { Component } from 'react';
import {
  View,
  Image,
} from 'react-native'

import { connect } from 'react-redux'

import { ViewPager } from 'rn-viewpager'

import i18n from 'react-native-i18n'
import MIcon from 'react-native-vector-icons/MaterialIcons'
import MDIcon from 'react-native-vector-icons/Ionicons'

import { NavigationStyles } from '@exponent/ex-navigation'

import { pushStorySplashPage } from 'app/composedActions'

import { setHomePageIndex, setPagerRef, closeModal, openModal } from '../state'
import { trkrTrack } from 'app/data/eventTracker/state'

import { BimodalTitle, BimodalButton } from './navbarComponents'
import BookShelf from './BookShelf'
import Messages from './Messages'


// const DARK_BROWN = '#3f2a14'
const DARK_BROWN = 'white'
const BUTTON_SIZE = 32

const makeButton = (Font, size, name, style = {}) => <Font name={name} size={size} color="white" style={[{}, style]} />


const rightButtons = [
  { button: makeButton(MDIcon, BUTTON_SIZE, 'md-arrow-forward', { color: DARK_BROWN }), goto: 1 },
  { button: makeButton(MIcon, BUTTON_SIZE, 'info-outline', { color: DARK_BROWN }), goto(dispatch) {
    dispatch(openModal())
  } },
]

const bookImg = require('app/assets/img/bigbook.png')

const Book = (
  <View>
    { <Image style={{ width: 32, height: 32, resizeMode: 'contain' }} source={bookImg} /> }
  </View>
)

const leftButtons = [
  { button: null },
  { button: Book,  goto: 0 },
]


@connect(
  state => ({
    homePage: state.scenes.homePage,
    locale: state.global.locale,
    bookList: state.data.user.books.specs.bookList[state.global.locale],
    messages: state.data.user.chat.history,
    school: state.data.user.account.items.schoolName,
    isFirstTimeOpeningApp: state.global.isFirstTimeOpeningApp,
    storyNumber: state.data.user.account.items.storyNumber,
  }),
  dispatch => ({
    updateHomePageIndex: e => { dispatch(setHomePageIndex(e.position)) },
    setPager: pager => { dispatch(setPagerRef(pager)) },
    closeModal: () => { dispatch(closeModal()) },
    openStory: i => { dispatch(pushStorySplashPage(i)) },
    trackTabSwitch: i => {
      if (i === 0) {
        dispatch(trkrTrack({
          event: 'Library Viewed',
        }))
      } else if (i === 1) {
        dispatch(trkrTrack({
          event: 'Chat Viewed',
        }))
      }
    },
    _trackBook: (storyNumber, awsKey, source, payload = {}) => {
      dispatch(trkrTrack({
        event: 'Book Opened',
        properties: {
          awsKey,
          source,
          storyNumber,
          ...payload,
        },
      }))
    },
  }),
  function mergeProps(stateProps, dispatchProps, ownProps) {
    const { storyNumber } = stateProps
    const { _trackBook } = dispatchProps
    return {
      ...ownProps,
      ...stateProps,
      ...dispatchProps,
      trackBookOpened: (awsKey, source, payload = {}) => _trackBook(storyNumber, awsKey, source, payload),
    }
  },
)
export default class HomePage extends Component {
  static route = {
    styles: {
      ...NavigationStyles.SlideVertical,
    },
    navigationBar: {
      renderTitle: () => <BimodalTitle titles={['bookShelf.tab', 'StoryTime']} style={{ color: DARK_BROWN }} />,
      renderRight: () => <BimodalButton position="right" buttons={rightButtons} />,
      renderLeft: () => <BimodalButton position="left" buttons={leftButtons} />,
      tintColor: 'white',
      titleStyle: { color: DARK_BROWN },
    },
  }

  constructor(props) {
    super(props)
    this.state = {
      initPage: this.props.homePage.index,
    }
  }

  onPageSelected = (i) => {
    this.props.updateHomePageIndex(i)
    this.props.trackTabSwitch(i.position)
  }

  render() {
    return (

      <ViewPager
        ref={this.props.setPager}
        style={{ flex: 1 }}
        initialPage={this.state.initPage}
        keyboardDismissMode="on-drag"
        onPageSelected={this.onPageSelected}
      >
        <View style={{ flex: 1 }}>
          <BookShelf
            bookList={this.props.bookList}
            schoolName={this.props.school || i18n.t('bookShelf.defaultschool')}
            trackBookOpened={this.props.trackBookOpened}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Messages
            messages={this.props.messages}
            locale={this.props.locale}
            bookList={this.props.bookList}
            imagePressHandle={this.props.openStory}
            isFirstTimeOpeningApp={this.props.isFirstTimeOpeningApp}
            trackBookOpened={this.props.trackBookOpened}
          />
        </View>
      </ViewPager>
    )
  }
}
