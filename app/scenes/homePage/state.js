export const SET_HOMEPAGE_INDEX = 'scenes/homePage/SET_HOMEPAGE_INDEX'
export const SET_PAGER_REF = 'scenes/homePage/SET_PAGER_REF'
export const OPEN_MODAL = 'scenes/homePage/OPEN_MODAL'
export const CLOSE_MODAL = 'scenes/homePage/CLOSE_MODAL'


export const setHomePageIndex = (index) => ({
  type: SET_HOMEPAGE_INDEX,
  index
})

// the purpose of this action is to allow the static navbar to access
// the ViewPager, which is how we flip between the chat and library pages.
// obvs this is bit convoluted, but it is unfortunately how ex-navigation works
export const setPagerRef = (pagerRef) => ({
  type: SET_PAGER_REF,
  pagerRef
})

export const openModal = () => ({
  type: OPEN_MODAL,
})

export const closeModal = () => ({
  type: CLOSE_MODAL,
})

const initialState = { index: 1, pager: null, modalVisible:false }

export default reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_HOMEPAGE_INDEX:
      return {...state, index: action.index}
    case SET_PAGER_REF:
      return {...state, pagerRef: action.pagerRef}
    case OPEN_MODAL:
      return {...state, modalVisible: true}
    case CLOSE_MODAL:
      return {...state, modalVisible: false}
    default: return state;
  }
}
