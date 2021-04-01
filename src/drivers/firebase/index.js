import firebase from 'firebase/app';
import auth from 'firebase/auth';
// import storage from 'firebase/storage'

firebase.initializeApp({
    apiKey: "AIzaSyCDt7mK70u2_9FTizw_EacOJTShMsIuooE",
    authDomain: "perfectorder-vue-q.firebaseapp.com",
    databaseURL: "https://perfectorder-vue-q-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "perfectorder-vue-q",
    storageBucket: "perfectorder-vue-q.appspot.com",
    messagingSenderId: "549771205527",
    appId: "1:549771205527:web:6c15b4e11f62c85d6c02d2"
});

export default {
    firebase
}

