import { connect } from 'react-redux'
import PushController from './PushController'
import { updateFCMTkn } from 'app/data/credentials/state'

const mapStateToProps = (state) => ({
  fcmToken: state.data.credentials.fcm.tkn,
})

const mapDispatchToProps = (dispatch) => ({
  onChangeToken(token) {
    dispatch(updateFCMTkn(token))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(PushController)
