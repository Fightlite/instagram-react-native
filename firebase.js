// import firebase from "firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDX_xQ1lmWbdMvdznonl6YSZZh1VNlKsLg",
  authDomain: "instagram-react-native-91718.firebaseapp.com",
  projectId: "instagram-react-native-91718",
  storageBucket: "instagram-react-native-91718.appspot.com",
  messagingSenderId: "490317087630",
  appId: "1:490317087630:web:7fe017367c9e082dbc5adf",
  measurementId: "G-9WEB6ZE22B"
};

// Initialize Firebase
!firebase.apps.length? firebase.initializeApp(firebaseConfig) : firebase.app()

export default firebase

export const auth = firebase.initializeApp(firebaseConfig).auth()
export const db = firebase.initializeApp(firebaseConfig).firestore()