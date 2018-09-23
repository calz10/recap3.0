import firebase from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: "AIzaSyC_Oh6BWotLvuaNUVr4EEwfwzVds-0IaMY",
  authDomain: "recapp-c875f.firebaseapp.com",
  databaseURL: "https://recapp-c875f.firebaseio.com",
  projectId: "recapp-c875f",
  storageBucket: "recapp-c875f.appspot.com",
  messagingSenderId: "717314936819"
};

firebase.initializeApp(config)

const db = firebase.firestore()
db.settings({
  timestampsInSnapshots: true
})

const databaseCollection = collectionName => db.collection(collectionName)

export { firebase, databaseCollection}