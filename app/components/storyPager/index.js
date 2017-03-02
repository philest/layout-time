import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Image,
  UIManager,
  InteractionManager
} from 'react-native'
import { connect } from 'react-redux'
import _ from 'lodash' // TODO: get this outta here?
import i18n from 'react-native-i18n'
import * as Animatable from 'react-native-animatable'
import { ViewPager } from 'rn-viewpager'
// import Swiper from 'app/vendor/react-native-swiper'

// components
import AlertBar from './components/alertBar'
import StoryPage from './components/storyPage'

// actions
import { setCurrentIndex } from './state'
import { closeDrawer } from 'app/components/readingSuggestion/state'
import { hideBackBarAndUnselectBubble } from 'app/composedActions'

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

class StoryPager extends Component {

  constructor(props) {
    super(props)
    this._onMomentumScrollEnd = this._onMomentumScrollEnd.bind(this)
    this._onScrollBeginDrag = this._onScrollBeginDrag.bind(this)
    this.state = {
      pages: {},
    }
  }

  _onMomentumScrollEnd(e, state, context) {
    const oldIndex = this.props.currentKey
    const currentKey = state.index
    this.props.dispatch(setCurrentIndex(state.index))
    if (oldIndex != currentKey) {
      this.props.dispatch(closeDrawer())
    }
  }

  _onScrollBeginDrag() {
    this.props.dispatch(hideBackBarAndUnselectBubble())
  }

  componentDidMount() {
    // TODO: write a damn test for this
    this.props.dispatch(setCurrentIndex(0));
  }


  _renderPages(pages) {
    const pagesArr = [];


    for (let i = 0; i < pages.length; i++) {
      const p = pages[i]
      pagesArr.push(
        <View  key={i} >
          {/* <Text>Piss</Text> */}
          <StoryPage  pageInfo={p}  imageSource={{ uri: p.url }} />
        </View>,
      )
    }
    pagesArr.push(<View style={{ alignItems: 'center', justifyContent: 'center' }} key={pages.length}>
      <Image
        style={{ resizeMode: 'contain', width: 200, height: 200 }}
        source={require('app/assets/img/sammy.png')}
      />
    </View>)

    const pagesArr2 = pagesArr
    return pagesArr2
  }

  _onPageSelected(e) {
    const n = this.props.storyInfo.pagesToRender.length
    if (e.position === n) {
      this.props.backAction()
    }
  }


  render()  {
    const info = this.props.storyInfo
    // const STSwiper = ViewPagerAndroid // TODO: figure out what the problem is... :(
    const STSwiper = ViewPager
    return (
      <Animatable.View useNativeDriver animation="fadeIn" duration={200} style={{ flex: 1 }}>
        <STSwiper
          initialPage={this.props.savedPageNum || 0}
          style={styles.swiper}
          loop={false}
          showsPagination={false}
          onPageScroll={this._onScrollBeginDrag} // TODO: test this on iOS :/
          onPageSelected={this._onPageSelected.bind(this)}
          // renderPagination    = { this._renderPagination }
        >
          { this._renderPages(info.pagesToRender) }
        </STSwiper>
        { this.props.pushesEnabled ? <AlertBar titleText={info.title} onPress={this.props.backAction} /> : null}
      </Animatable.View>
    )
  }
}

const styles = StyleSheet.create({
  swiper: {
    flex: 1,
    backgroundColor: 'black',
    // alignSelf: 'flex-start',
  },
})

const storyInfo = (bookSpecsLocale, curriculum, storyKey, locale) => {
  const book = bookSpecsLocale[storyKey]
  if (!book) return {}

  const numPages = book.numPages
  const offset   = book.offset
  const awsKey   = book.awsKey
  const pagesToRender = _.times(numPages - offset, (i) => ({
    i,
    // url:`https://s3.amazonaws.com/st-messenger/STApp/${awsKey}/${awsKey}${i+1+offset}.jpg`,
    url: `https://s3.amazonaws.com/st-native-mobile/${locale}/${awsKey}/${awsKey}${i + 1 + offset}.jpg`,
    coverDims: book.coverDims,
    bubbles: (book.bubbles) ? book.bubbles[i + 1] : [], // TODO: test this...
  }))
  const storyInfo = {
    title: book.title,
    description: book.description,
    pagesToRender,
  }

  return storyInfo
}

const mapStateToProps = (state) => ({
  storyInfo: storyInfo(state.data.user.books.specs.bookList[state.global.locale],
                       state.data.user.books.specs.curriculum[state.global.locale],
                       state.components.bookShelf.currentStoryKey,
                       state.global.locale,
                     ),
  currentKey: state.components.storyPager.currentKey,
  pushesEnabled: state.global.pushesEnabled,
  locale: state.global.locale,
})

export default connect(mapStateToProps)(StoryPager)
