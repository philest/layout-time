import React, { Component } from 'react'

import { Platform } from 'react-native'
import { connect } from 'react-redux'


// import handleNotification from './notificationHandler'

import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm'
import { updateFCMTkn } from 'app/data/credentials/state'

@connect()
export default class FirebaseClient extends Component {

  componentDidMount() {

    FCM.requestPermissions(); // for IOS
    FCM.getFCMToken().then(token => {
      this.props.dispatch(updateFCMTkn(token))
    })

    FCM.getInitialNotification().then(notif => {
      console.log("INITIAL NOTIFICATION", notif)
    })

    // this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
    //   // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
    //   if (notif.local_notification) {
    //     //this is a local notification
    //   }
    //   if (notif.opened_from_tray) {
    //     //app is open/resumed because user clicked banner
    //   }

    //   if (Platform.OS ==='ios') {
    //     // optional
    //     // iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link.
    //     // This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
    //     // notif._notificationType is available for iOS platfrom
    //     switch (notif._notificationType) {
    //       case NotificationType.Remote:
    //         notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
    //         break;
    //       case NotificationType.NotificationResponse:
    //         notif.finish();
    //         break;
    //       case NotificationType.WillPresent:
    //         notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
    //         break;
    //     }
    //   }
    // });


    this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {
      this.props.dispatch(updateFCMTkn(token))
    })
  }

  componentWillUnmount() {
      // stop listening for events
      this.refreshTokenListener.remove();
  }


  render() {
    return null
  }
}
