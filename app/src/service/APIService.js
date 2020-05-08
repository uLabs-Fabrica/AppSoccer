import firebase from '../config/Firebase';
export const Post = (collections,docs,data) => {
    console.log(collections, docs, data);
    return new Promise((resolve, reject) => {
        const db = firebase.firestore();
        let ref;
        switch (collections.length) {
            case 1:
                ref = db.collection(collections[0]).doc(docs[0])
                break;
            case 2:
                ref = db.collection(collections[0]).doc(docs[0]).collection(collections[1]).doc(docs[1])
                break;
            case 3:
                ref = db.collection(collections[0]).doc(docs[0]).collection(collections[1]).doc(docs[1]).collection(collections[2]).doc(docs[2])
                break;
            default:
                ref = null;
            break;
        }
        if(ref){
            ref.set(data, {merge:true}).then(()=>{
                resolve();
            }, function (error) {
                reject(error);
            });
        }else{
            reject("sem referencia de collection e doc")
        }
    })
}
export const setFile = (file, url) =>{
    return new Promise((resolve, reject) =>{
        var storageRef = firebase.storage().ref();
        var fileRef = storageRef.child(url);
        fileRef.put(file).then(function () {
            fileRef.getDownloadURL().then(function (url) {
                resolve(url);
            }, ()=>{
                reject();
            })
        }, function (error) {
            reject();
        });
    })
}