// @flow


// actions types
export const TRKR_TRACK = 'data/eventTracker/TRKR_TRACK'
export const TRKR_GROUP = 'data/eventTracker/TRKR_GROUP'
export const TRKR_ALIAS = 'data/eventTracker/TRKR_ALIAS'
export const TRKR_FLUSH = 'data/eventTracker/TRKR_FLUSH'
export const TRKR_IDENTIFY = 'data/eventTracker/TRKR_IDENTIFY'
export const TRKR_SET_ANON_ID = 'data/eventTracker/TRKR_SET_ANON_ID'


// example from segment docs (node)
// analytics.track({
//   userId: '019mr8mf4r',
//   event: 'Item Purchased',
//   properties: {
//     revenue: 39.95,
//     shippingMethod: '2-day'
//   }
// });
export const trkrTrack = (payload) => ({
  type: TRKR_TRACK,
  payload,
})

// example from segment docs (node)
// analytics.group({
//   userId: '019mr8mf4r',
//   groupId: '56',
//   traits: {
//     name: 'Initech',
//     description: 'Accounting Software'
//   }
// });
export const trkrGroup = (payload) => ({
  type: TRKR_GROUP,
  payload,
})

// example from segment docs (node)
// analytics.alias({
//   previousId: 'old_id',
//   userId: 'new_id'
// });
export const trkrAlias = (userId = null) => ({
  type: TRKR_ALIAS,
  userId,
})

export const trkrFlush = (payload) => ({
  type: TRKR_FLUSH,
  payload,
})

// example from segment docs (node)
// analytics.identify({
//   userId: '019mr8mf4r',
//   traits: {
//     name: 'Michael Bolton',
//     email: 'mbolton@initech.com',
//     plan: 'Enterprise',
//     friends: 42
//   }
// });
export const trkrIdentify = (payload = {}) => {
  return {
    type: TRKR_IDENTIFY,
    payload,
  }
}



export const trkrSetAnonId = (id) => ({
  type: TRKR_SET_ANON_ID,
  id,
})


// actually, the state of the anon ID is done by segment, so no need for this

// const defaultEventTracker = {
//   anonId: null,
// }


// export default eventTracker = (state = defaultEventTracker, action) => {
//   const payload = action.payload
//   switch (action.type) {
//     case TRKR_SET_ANON_ID
//       return { ...state, anonId:  }
//     case REHYDRATE:
//       const incoming = action.payload
//       return incoming
//     default:
//       return state
//   } // END switch
// } // END const bookList

