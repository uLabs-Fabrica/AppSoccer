import React,{createClass} from 'react';
import firebase from '../config/Firebase';


export const getUid = (email, password) => {
    return new Promise((resolve,reject)=>{
        firebase.auth().signInWithEmailAndPassword(email, password).then((resp)=>{
            console.log(resp.user.uid);
            resolve(resp.user.uid);
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
                default: error.message = "Erro ao registrar usuário";
            }
            reject(error.message)
            console.log("error");
            //setError(error.message);
        })
    })
};

