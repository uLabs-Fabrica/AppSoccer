import firebase from '../config/Firebase';
let refString = "";
const createRef = (collections, docs, method) =>{
    const db = firebase.firestore();
    let ref = null;
    for(var t in collections){
        if(!ref){
            refString = "db.collection("+collections[t]+")";
            console.log(refString);
            ref = db.collection(collections[t]);
        }else{
            if(docs.length>=t){
                refString = refString+".collection("+collections[t]+")";
                console.log(refString);
                ref = ref.collection(collections[t]);

            }
        }
        if(docs[t]){
            refString = refString+".doc("+docs[t]+")";
            console.log(refString);
            ref = ref.doc(docs[t]);
        }else{
            if(method == 'set'){
                refString = refString+".doc()";
                console.log(refString);
                ref = ref.doc();
            }
        }
    }
    return ref;
    // switch (collections.length) {
    //     case 1:
    //         let ref = db.collection(collections[0]);
    //         if(docs.length == 1){
    //             ref = ref;doc(docs[0]);
    //         }else{

    //         }
    //     case 2:
    //         let ref = db.collection(collections[0]).doc(docs[0]).collection(collections[1]);
    //         if (docs.length == 2) {
    //             ref = ref.doc(docs[1]);
    //         } else {
    //             ref = ref.doc();
    //         }
    //         return ref
    //     case 3:
    //         return db.collection(collections[0]).doc(docs[0]).collection(collections[1]).doc(docs[1]).collection(collections[2]).doc(docs[2])
    //     default:
    //         return null;
    // }
} 
export const Post = (collections,docs,data,type) => {
    console.log(collections, docs, data);
    return new Promise((resolve, reject) => {
        let ref = createRef(collections, docs, type);
        console.log(ref);
        if(ref){
            if(type=='set'){
                ref.set(data, {merge:true}).then(()=>{
                    resolve();
                }, function (error) {
                    reject(error);
                });
            }else{
               ref.add(data).then((snap)=>{
                resolve(snap);
               },(error)=>{
                reject(error);
               })
            }
        }else{
            reject("sem referencia de collection e doc")
        }
    })
}
export const GET = (collections, docs) =>{
    console.log(collections, docs);
    return new Promise((resolve, reject) => {
        let ref = createRef(collections, docs, "get");
        console.log(refString);
        ref.get().then(data => {
            resolve(data);
        })
        .catch(err => {
            reject(err);
        });
    })
}
export const DELETE = (collections, docs) =>{
    console.log(collections, docs);
    return new Promise((resolve, reject)=>{
        let ref = createRef(collections, docs);
        ref.delete().then(()=>{
            resolve()
            console.log("deletado");
        }, (error)=>{
            console.log("error", error);
            reject()
        });
    })
}
export const PUT = (collections, docs, data) =>{
    console.log(collections, docs);
    return new Promise((resolve, reject)=>{
        let ref = createRef(collections, docs);
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