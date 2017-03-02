import React, { Component }     from 'react'
import { View, Text } from 'react-native'
import { connect }              from 'react-redux'

import STGridView               from './GridView'
import STListView               from './ListView'
import Header from './BookShelfHeader'
import Footer from './BookShelfFooter'

import { pushStorySplashPage }      from 'app/composedActions'

import i18n from 'react-native-i18n'




const ALL = 'ALL'

const getVisibleBooks = (books, curriculum, storyNumber, locale, filter = ALL) => {
  // console.log("HELLO the locale is " + locale)
  // console.log(locale)
  // console.log(books)
  const booksLocale = books[locale]
  const curriculumLocale = curriculum[locale]
  switch (filter) {
    case ALL:
      const revealedBooks = curriculumLocale.slice(0, storyNumber+1).map((bookKey, i) => Object.assign({}, booksLocale[bookKey], { key: i }))
      return revealedBooks.reverse()
    default:
      throw new Error('ERR: invalid book filter' + filter)
  }
}



@connect(
  state => ({
    currentStoryNumber: state.data.user.account.storyNumber,
    visibleBooks: getVisibleBooks(
      state.data.user.books.specs.bookList,
      state.data.user.books.specs.curriculum,
      Math.min(state.data.user.account.items.storyNumber, state.data.user.books.specs.curriculum[state.global.locale].length),
      state.global.locale, // todo: switch to user locale
      ALL,
    ),
    // displayFormat: state.components.bookShelf.bookShelfDisplayFormat,
    locale: state.global.locale,
  }),
)
export default class BookShelf extends Component {

  render() {
    return (
      <STGridView
        items={[...this.props.visibleBooks, { dummy: true }]}
        itemsPerRow={2}
        onPress={storyKey => {
          this.props.dispatch(pushStorySplashPage(storyKey))
          this.props.trackBookOpened(storyKey, 'bookshelf')
        }}
        renderHeader={() => (
          <Header
            heading={i18n.t('bookShelf.heading', { locale: this.props.locale })}
            subtitle={i18n.t('bookShelf.subtitle', { name: this.props.schoolName })}
          />
        )}
        renderFooter={Footer}
        locale={this.props.locale}
      />
    )
  }
}



