import { NavigationActions } from '@exponent/ex-navigation'
import Router from 'app/router'


export function pushScene(dispatch, navigator, route) {
  dispatch(NavigationActions.push(navigator, Router.getRoute(route)))
}

export function popScene(dispatch) {
  dispatch(NavigationActions.pop())
}
