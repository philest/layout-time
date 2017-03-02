import { createRouter } from '@exponent/ex-navigation'

import  {
  TestTracker,
  EnterUsername,
  CreatePassword,
  PickRole,
  InputName,
  InviteTeacher,
  InputCode,
  EnterPassword,
  RequestSMSorEmail,
  CheckRandomCode,
  ResetPassword,
  ResetEmail,
} from './scenes/login/scenes'


import HomePage   from 'app/scenes/homePage/scenes'
import StorySplashPage from 'app/scenes/storySplashPage'
import StoryReader     from 'app/scenes/storyReader'

const homePageScenes = {
  home: () => HomePage,
  storySplashPage: () => StorySplashPage,
  storyReader: () => StoryReader,
}

const loginScenes = {
  enterUsername: () => EnterUsername,
  createPassword: () => CreatePassword,
  enterPassword: () => EnterPassword, // for logging back in
  requestSMSorEmail: () => RequestSMSorEmail,
  checkRandomCode: () => CheckRandomCode,
  resetPassword: () => ResetPassword,
  resetEmail: () => ResetEmail,
  pickRole: () => PickRole,
  inputName: () => InputName,
  inputCode: () => InputCode,
  inviteTeacher: () => InviteTeacher,
  testTracker: () => TestTracker,
}


// NOTE: we're actually not using this route rn for visual reasons... might be a dumb thing to do
export default createRouter(() => ({
  ...homePageScenes,
  ...loginScenes,
}));
