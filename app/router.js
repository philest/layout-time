import { createRouter } from '@exponent/ex-navigation'


import HomePage   from 'app/scenes/homePage/scenes'
import StorySplashPage from 'app/scenes/storySplashPage'
import StoryReader     from 'app/scenes/storyReader'

const homePageScenes = {
  home: () => HomePage,
  storySplashPage: () => StorySplashPage,
  storyReader: () => StoryReader,
}

const loginScenes = {

}


// NOTE: we're actually not using this route rn for visual reasons... might be a dumb thing to do
export default createRouter(() => ({
  ...homePageScenes,
  ...loginScenes,
}));
