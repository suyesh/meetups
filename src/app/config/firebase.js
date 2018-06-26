import firebase from 'firebase';
import 'firebase/firestore';

import {
  firebaseApiKey,
  firebaseAuthDomain,
  firebaseDatabaseURL,
  firebaseProjectId,
  firebaseStorageBucket,
  firebaseMessagingSenderId
} from '../../config'

const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: firebaseAuthDomain,
  databaseURL: firebaseDatabaseURL,
  projectId: firebaseProjectId,
  storageBucket: firebaseStorageBucket,
  messagingSenderId: firebaseMessagingSenderId
}

firebase.initializeApp(firebaseConfig)
const firestore = firebase.firestore()

const settings = { timestampsInSnapshots: true};

firestore.settings(settings);

export default firebase
