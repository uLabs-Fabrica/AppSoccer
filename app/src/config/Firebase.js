import React,{useEffect} from 'react';
import firebase from 'firebase';

let firebaseConfig = {
    apiKey: "AIzaSyCozXuIF8NEW8fQ1r_QiVXX0sKuRNOAfCk",
    authDomain: "appsoccerdevelopment.firebaseapp.com",
    databaseURL: "https://appsoccerdevelopment.firebaseio.com",
    projectId: "appsoccerdevelopment",
    storageBucket: "appsoccerdevelopment.appspot.com",
    messagingSenderId: "228760160341",
    appId: "1:228760160341:web:d26c4fa17c13d6d828acdc"
}
firebase.initializeApp(firebaseConfig);
    // Initialize Firebase

export default firebase;