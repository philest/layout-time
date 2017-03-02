// vendor components
import React, { Component } from 'react'
import { Keyboard } from 'react-native'

// exnav stuff
import {
  NavigationStyles,
  NavigationActions,
} from '@exponent/ex-navigation'

import { trkrTrack } from 'app/data/eventTracker/state'


import Store from 'app/createStore'

const loginRouteConfig = {
  styles: { ...NavigationStyles.SlideHorizontal },
  navigationBar: { visible: false },
}

const backAction = () => {
  Store.dispatch(NavigationActions.pop('login'))
  Keyboard.dismiss()
}

const wrapperStyle = {
  flex: 1,
  alignSelf: 'stretch',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}


// NOTE: this function is intentionally unbound
function trackEvent(eventName, payload = {}) {
  Store.dispatch(trkrTrack({
    event: eventName,
    ...payload,
  }))
}



import EnterUsernameDumb from './enterUsername'
export class EnterUsername extends Component {
  static route = loginRouteConfig
  render = () => <EnterUsernameDumb
    wrapperStyle={wrapperStyle}
    trackEvent={trackEvent}
  />
}

import CreatePasswordDumb from './createPassword'
export class CreatePassword extends Component {
  static route = loginRouteConfig
  render = () => <CreatePasswordDumb
    backAction={backAction}
    wrapperStyle={wrapperStyle}
    trackEvent={trackEvent}
  />
}


import EnterPasswordDumb from './enterPassword'
export class EnterPassword extends Component {
  static route = loginRouteConfig
  render = () => <EnterPasswordDumb
    backAction={backAction}
    wrapperStyle={wrapperStyle}
    trackEvent={trackEvent}
  />
}


import RequestSMSorEmailDumb from './forgotPassword/requestSMSorEmail'
export class RequestSMSorEmail extends Component {
  static route = loginRouteConfig
  render = () => <RequestSMSorEmailDumb
    backAction={backAction}
    wrapperStyle={wrapperStyle}
    trackEvent={trackEvent}
  />
}

import CheckRandomCodeDumb from './forgotPassword/checkRandomCode'
export class CheckRandomCode extends Component {
  static route = loginRouteConfig
  render = () => <CheckRandomCodeDumb
    backAction={backAction}
    wrapperStyle={wrapperStyle}
    trackEvent={trackEvent}
  />
}

import ResetPasswordDumb from './forgotPassword/resetPassword'
export class ResetPassword extends Component {
  static route = loginRouteConfig
  render = () => <ResetPasswordDumb
    backAction={backAction}
    wrapperStyle={wrapperStyle}
    trackEvent={trackEvent}
  />
}


import ResetEmailDumb from './forgotPassword/resetEmail'
export class ResetEmail extends Component {
  static route = loginRouteConfig
  render = () => <ResetEmailDumb
    backAction={backAction}
    wrapperStyle={wrapperStyle}
    trackEvent={trackEvent}
  />
}




import PickRoleDumb from './pickRole'
export class PickRole extends Component {
  static route = loginRouteConfig
  render = () => <PickRoleDumb
    backAction={backAction}
    wrapperStyle={wrapperStyle}
    trackEvent={trackEvent}
  />
}

import InputNameDumb from './inputName'
export class InputName extends Component {
  static route = loginRouteConfig
  render = () => <InputNameDumb
    backAction={backAction}
    wrapperStyle={wrapperStyle}
    trackEvent={trackEvent}
  />
}

import InviteTeacherDumb from './inviteTeacher'
export class InviteTeacher extends Component {
  static route = loginRouteConfig
  render = () => <InviteTeacherDumb
    backAction={backAction}
    wrapperStyle={wrapperStyle}
    trackEvent={trackEvent}
  />
}



import InputCodeDumb from './inputCode'
export class InputCode extends Component {
  static route = loginRouteConfig
  render = () => <InputCodeDumb
    backAction={backAction}
    wrapperStyle={wrapperStyle}
    trackEvent={trackEvent}
  />
}





// TODO: unlock this later
// import DoneScreenDumb from './doneScreen'
// export class DoneScreen extends Component {
//   static route = {
//     styles: { ...NavigationStyles.Fade },
//     navigationBar: { visible: false },
//   }
//   render = () => <DoneScreenDumb backAction={backAction} wrapperStyle={wrapperStyle}/>
// }


import TestTrackerDumb from './testTracker'
export class TestTracker extends Component {
  static route = loginRouteConfig
  render = () => <TestTrackerDumb
    backAction={backAction}
    wrapperStyle={wrapperStyle}
  />
}
