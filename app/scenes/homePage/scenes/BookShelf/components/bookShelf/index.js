import React, { Component }     from 'react'
import { View, Text } from 'react-native'
import { connect }              from 'react-redux'

import STGridView               from './GridView'
import STListView               from './ListView'
import Header from './BookShelfHeader'
import Footer from './BookShelfFooter'

import { pushStorySplashPage }      from 'app/composedActions'

import i18n from 'react-native-i18n'

export const BookShelf = ({ visibleBooks, displayFormat, navigation, dispatch, locale, schoolName }) => {
  return (
    <STGridView
      items      ={ [...visibleBooks, {dummy:true}] }
      itemsPerRow={2}
      onPress={ (storyKey) => dispatch(pushStorySplashPage(storyKey)) }
      renderHeader={()=>(
        <Header
          heading={i18n.t('bookShelf.heading', { locale })}
          subtitle={i18n.t('bookShelf.subtitle', { name: school })}
        />
      )}
      renderFooter={Footer}
      locale={locale}
    />
  )
}

const ALL = 'ALL'

const getVisibleBooks = (books, curriculum, storyNumber, locale, filter = ALL) => {
  // console.log("HELLO the locale is " + locale)
  // console.log(locale)
  // console.log(books)
  const booksLocale = books[locale]
  console.log(booksLocale)
  const curriculumLocale = curriculum[locale]
  switch (filter) {
    case ALL:
      const revealedBooks = curriculumLocale.slice(0, storyNumber+1).map((bookKey, i) => Object.assign({}, booksLocale[bookKey], { key: i }))
      return revealedBooks.reverse()
    default:
      throw new Error('ERR: invalid book filter' + filter)
  }
}

const mapStateToProps = (state) => ({
  currentStoryNumber: state.data.user.account.storyNumber,
  visibleBooks: getVisibleBooks(
    state.data.user.books.specs.bookList,
    state.data.user.books.specs.curriculum,
    Math.min(state.data.user.account.items.storyNumber, state.data.user.books.specs.curriculum[state.global.locale].length),
    // state.data.user.account.items.storyNumber,
    state.global.locale, // todo: switch to user locale
    ALL,
  ),
  displayFormat: state.components.bookShelf.bookShelfDisplayFormat,
  locale: state.global.locale,
})

export default connect(mapStateToProps)(BookShelf)
