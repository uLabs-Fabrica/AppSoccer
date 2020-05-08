import firebase from '../config/Firebase';

 

export const auth = (email, password) => {
    return new Promise((resolve,reject)=>{
        firebase.auth().signInWithEmailAndPassword(email, password).then((resp)=>{
            console.log(resp.user.uid);
            console.log(resp.user);
            const db = firebase.firestore();
            let collection = db.collection('users').doc(resp.user.uid);
            collection.get().then(snapshot => {
                console.log(snapshot);
                if (snapshot.exists) {
                    console.log(snapshot.data());
                    let user = snapshot.data();
                    user.uid = resp.user.uid;
                    resolve(user);
                } else {
                    console.log("não encontrou")
                    reject("Usuário sem permissão ou cargo definido");
                }
            })
            .catch(error => {
                console.log('Error getting document', error);
                reject("Erro na autenticação");
            });
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
                const db = firebase.firestore();
                 console.log("olá")
                let collection = db.collection('users').doc(user.uid);
                collection.get().then(snapshot => {
                    if (snapshot.exists) {
                        console.log(snapshot.data());
                        let uid = JSON.parse(JSON.stringify(user)).uid;
                        let data = snapshot.data();
                        data.uid = uid;
                        resolve(data);
                    }else{
                        console.log("não encontrou")
                        reject("Você não tem papel");
                    }
                })
                .catch(error => {
                    console.log('Error getting document', error);
                    reject("Erro na autenticação");
                });
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

