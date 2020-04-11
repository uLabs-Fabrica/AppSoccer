import React from 'react';
import firebase from '../config/Firebase';

 

export const auth = (email, password) => {
    return new Promise((resolve,reject)=>{
        firebase.auth().signInWithEmailAndPassword(email, password).then((resp)=>{
            console.log(resp.user.uid);
            console.log(resp.user);
            resolve(resp.user);
            //const db =  firebase.firestore();
            // let ref = db.collection('roles').doc("BxJj5DlzaOYWnfGpo5g4g0Kp88Q2");
            // ref.get().then(doc => {
            //     if (!doc.exists) {
            //         console.log('No such document!');
            //     } else {
            //         console.log('Document data:', doc.data());
            //     }
            // })
            // .catch(err => {
            //     console.log('Error getting document', err);
            // });
            //window.location = "/#/dashboard";
        }, (error)=>{
            console.log(error);
            switch (error.code) {
                case "auth/invalid-email":
                    error.message = "Email não é válido";
                    break;
                case "auth/user-disable":
                    error.message = "O usuário está desabilitado";
                    break;
                case "auth/user-not-found":
                    error.message = "Usuário não encontrado";
                    break;
                case "auth/wrong-password":
                    error.message = "Senha inválida";
                    break;
                default: error.message = "Erro na autenticação, verifique sua conexão";
            }
            reject(error.message)
            console.log("error");
            //setError(error.message);
        })
    })
};
export const getSession = () =>{
    return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                resolve(user);
                // User is signed in.
            } else {
                reject("sem usuário")
                // No user is signed in.
            }
        });
    })
}
export const changePassword = (email) => {
    return new Promise((resolve, reject) => {
        console.log("promisse")
        firebase.auth().sendPasswordResetEmail(email).then((data)=>{
            resolve(data)
            console.log("sucesso email enviado")
        },(error)=>{
            console.log("error");
            console.log(error);
            reject(error);
        })
    })
}
export const logout = () =>{
    return new Promise((resolve, reject) => {
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
            resolve("success");
        }).catch(function (error) {
            reject(error);
            // An error happened.
        });
    })
}

