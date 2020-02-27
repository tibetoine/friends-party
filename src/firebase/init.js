import * as firebase from 'firebase/app'
import 'firebase/auth'
// import 'firebase/analytics'

// The configuration below is not sensitive data. You can serenely add your config here
const config = {
  apiKey: 'AIzaSyCW-a-tFXFGcbWlrUrAsR2BUsdnMmwqL0E',
  authDomain: 'friends-party-x.firebaseapp.com',
  databaseURL: 'https://friends-party-x.firebaseio.com',
  projectId: 'friends-party-x',
  storageBucket: 'friends-party-x.appspot.com',
  messagingSenderId: '621276242543',
  appId: '1:621276242543:web:19a43b3893afbd0722639a',
  measurementId: 'G-VCQN8JPBWW'
}

firebase.initializeApp(config)

// put this after firebase.initializeApp(...)
// make sure it executes before any logEvent
// firebase.analytics()

// alias
// Vue.prototype.$analytics = firebase.analytics();
