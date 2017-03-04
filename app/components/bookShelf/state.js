/* regular actions */
export const SET_GRID_VIEW     = 'components/bookShelf/SET_GRID_VIEW'
export const SET_LIST_VIEW     = 'components/bookShelf/SET_LIST_VIEW'
export const SET_CURRENT_STORY = 'components/bookShelf/SET_CURRENT_STORY'

export const setGridView = () => ({
  type: SET_GRID_VIEW,
})

export const setListView = () => ({
  type: SET_LIST_VIEW,
})

export const setCurrentStoryKey = (key) => ({
  type: SET_CURRENT_STORY,
  key,
})

import { updateObject, updateItemInArray } from 'app/reducerUtils'

export default readerState = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_STORY:
      return updateObject(state, {currentStoryKey: action.key})
    case SET_GRID_VIEW:
      return updateObject(state, {bookShelfDisplayFormat: 'grid'})
    case SET_LIST_VIEW:
      return updateObject(state, {bookShelfDisplayFormat: 'list'})
    default:
      return state
  }
}

import { INIT_PAGE, INIT_STORY } from 'app/config'

const initialState = {
  bookShelfDisplayFormat: 'grid',
  currentStoryKey: INIT_STORY,
  initialPage: INIT_PAGE,
}
