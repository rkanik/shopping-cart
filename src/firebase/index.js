import firebase from 'firebase/app'
import { USERS } from '../consts'

import 'firebase/firestore';
import "firebase/storage"
import 'firebase/auth'

// Config
import config from './config'


// Initializing firebase app
const app = firebase.initializeApp(config)
const firestore = app.firestore()

// Collections
const Users = firestore.collection(USERS)

const Auth = firebase.auth()
const GoogleProvider = new firebase.auth.GoogleAuthProvider()

export { Auth, Users, GoogleProvider }
