import React,{useContext} from 'react';
import { UserContext } from '../context/User';
import firebase from '../config/Firebase';
export const createMenu = () =>{
    return [
        { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/dashboard' },
        {
            label: 'Perfil', icon: 'pi pi-fw pi-bars',
            items: [
                {
                    label: 'Dados pessoais',
                    icon: 'pi pi-fw pi-bars',
                    to: '/personal-data'
                },
                {
                    label: 'Dados esportivos',
                    icon: 'pi pi-fw pi-bars',
                    to: '/sports-data'
                },
                {
                    label: 'Dados médicos',
                    icon: 'pi pi-fw pi-bars'
                }
            ]
        },
        {
            label: 'Treinamento', icon: 'pi pi-fw pi-bars',
            items: [
                {
                    label: 'Frequência',
                    icon: 'pi pi-fw pi-bars',
                    to: '/frequency'
                },
                {
                    label: 'Programação',
                    icon: 'pi pi-fw pi-bars',
                    to:'/schedule'
                },
                {
                    label: 'Dados médicos',
                    icon: 'pi pi-fw pi-bars'
                }
            ]
        },
        {
            label: 'Competições', icon: 'pi pi-fw pi-bars',
            items: [
                {
                    label: 'Jogos',
                    icon: 'pi pi-fw pi-bars',
                    to:"/games"
                },
                {
                    label: 'Organizadores',
                    icon: 'pi pi-fw pi-bars',
                    to: '/organization'
                },
                {
                    label: 'Campeonatos',
                    icon: 'pi pi-fw pi-bars',
                    to: '/championship'
                },
                {
                    label: 'Equipes',
                    icon: 'pi pi-fw pi-bars',
                    to: '/teams'
                }
            ]
        },
        {
            label: 'Desempenho', icon: 'pi pi-fw pi-bars',
            items: [
                {
                    label: 'Competições',
                    icon: 'pi pi-fw pi-bars',
                    to:'/competitions'
                },
                {
                    label: 'Treinamentos',
                    icon: 'pi pi-fw pi-bars'
                },
                {
                    label: 'Prontuário',
                    icon: 'pi pi-fw pi-bars'
                }
            ]
        },
        { label: 'Contratos', icon: 'pi pi-fw pi-bars' },
        {
            label: 'Tema', icon: 'pi pi-fw pi-palette',
            items: [
                {
                    label: 'Blue', icon: 'pi pi-fw pi-palette', styleClass: 'blue-theme', command: (event) => {
                        this.changeTheme({ originalEvent: event, theme: 'blue-light' })
                    }
                },
                {
                    label: 'Green', icon: 'pi pi-fw pi-palette', styleClass: 'green-theme', command: (event) => {
                        this.changeTheme({ originalEvent: event, theme: 'green-light' })
                    }
                },
                {
                    label: 'Cyan', icon: 'pi pi-fw pi-palette', styleClass: 'cyan-theme', command: (event) => {
                        this.changeTheme({ originalEvent: event, theme: 'cyan-light' })
                    }
                },
                {
                    label: 'Purple', icon: 'pi pi-fw pi-palette', styleClass: 'purple-theme', command: (event) => {
                        this.changeTheme({ originalEvent: event, theme: 'purple-light' })
                    }
                },
                {
                    label: 'Indigo', icon: 'pi pi-fw pi-palette', styleClass: 'indigo-theme', command: (event) => {
                        this.changeTheme({ originalEvent: event, theme: 'indigo-light' })
                    }
                },
                {
                    label: 'Yellow', icon: 'pi pi-fw pi-palette', styleClass: 'yellow-theme', command: (event) => {
                        this.changeTheme({ originalEvent: event, theme: 'yellow-light' })
                    }
                },
                {
                    label: 'Orange', icon: 'pi pi-fw pi-palette', styleClass: 'orange-theme', command: (event) => {
                        this.changeTheme({ originalEvent: event, theme: 'orange-light' })
                    }
                },
                {
                    label: 'Pink', icon: 'pi pi-fw pi-palette', styleClass: 'pink-theme', command: (event) => {
                        this.changeTheme({ originalEvent: event, theme: 'pink-light' })
                    }
                }

            ]
        },
    ];
}
function Menu(props) {
    console.log("props",props);
    console.log("menuu");
    const context = useContext(UserContext);
    const { saveUser } = useContext(UserContext);
    console.log("context",context);
    let user = context.user;
    let menu = [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/dashboard' }];
    let menuLength = 1;
    user.rules=['play'];
    user.modules = {};
    console.log(user);
    if (!props.menu) {
        if(user.rules && user.rules.length == 1){
            const db = firebase.firestore();
            let collection = db.collection('modules').where('rules', 'array-contains', user.rules[0]);
            let count = 0;
            collection.get().then(snapshot => {
                console.log(snapshot.docs.length);
                menuLength = snapshot.docs.length;
                if(!snapshot.empty){
                    snapshot.forEach(doc => {
                        console.log("module",doc.id,"=>",doc.data());
                        user.modules[doc.id]=[];
                        db.collection('modules').doc(doc.id).collection('sub').where('rules', 'array-contains', user.rules[0]).get().then(subSnapshot => {
                            console.log(subSnapshot);
                            count++;
                            console.log(count, snapshot.docs.length);
                            if (!subSnapshot.empty) {
                                console.log("mod-sub", doc.id);
                                subSnapshot.forEach(sub => {
                                    console.log("sub",sub.id, "=>", sub.data());
                                    console.log(user.modules);
                                    console.log(doc.id);
                                    if (Array.isArray(user.modules[doc.id])){
                                        user.modules[doc.id].push(sub.id);
                                    }
                                })
                            }
                            if (count == snapshot.docs.length) {
                                setMenu();
                            }
                        })
                    });
                }
            })
            .catch(error => {
                console.log('Error getting document', error);
                //reject("Erro na autenticação");
            });
        }
    
        const setMenu = () => {
            console.log(user);
            for(let i in user.modules){
                console.log(i);
                let item = {};
                item['icon'] = 'pi pi-fw pi-home';
                switch (i) {
                    case "cntrct":
                        item['label'] = "Contratos";
                        break;
                    case "comp":
                        item['label'] = "Competições";
                        break;
                    case "prfl":
                        item['label'] = "Perfil";
                        break;
                    case "prfmc":
                        item['label'] = "Desempenho";
                        break;
                    case "traing":
                        item['label'] = "Treinamento";
                        break;
                    default:
                        break;
                }
                //menu.push(item);
                setSub(item,i);
            }
            console.log(menu);
        }
        const setSub = (item,i) => {
            item["items"] = [];
            let mod = user.modules[i]
            console.log(mod);
            for (let t in mod){
                switch (mod[t]) {
                    case "champ":
                        item["items"].push({label: 'Campeonatos',icon: 'pi pi-fw pi-bars',to: '/championship'})
                        break;
                    case "play":
                        item["items"].push({label: 'Jogos',icon: 'pi pi-fw pi-bars',to: "/games"});
                        break;
                    case "medc-dta":
                        item["items"].push({label: 'Dados médicos',icon: 'pi pi-fw pi-bars'})
                        break;
                    case "prsnl-dta":
                        item["items"].push({label: 'Dados pessoais',icon: 'pi pi-fw pi-bars',to: '/personal-data'})
                        break
                    case "sprt-dta":
                        item["items"].push({label: 'Dados esportivos',icon: 'pi pi-fw pi-bars',to: '/sports-data'})
                        break
                    case "comp":
                        item["items"].push({label: 'Competições',icon: 'pi pi-fw pi-bars',to: '/competitions'});
                        break;
                    case "medic":
                        item["items"].push({label: 'Prontuário',icon: 'pi pi-fw pi-bars'});
                        break
                    case "traing":
                        item["items"].push({label: 'Treinamentos',icon: 'pi pi-fw pi-bars'});
                        break;
                    case "frqnc":
                        item["items"].push({ label: 'Frequência', icon: 'pi pi-fw pi-bars', to: '/frequency'});
                        break;
                    case "frqnc":
                        item["items"].push({label: 'Programação',icon: 'pi pi-fw pi-bars',to: '/schedule'});
                        break;
                    default:
                        break;
                }
            }
            console.log(item);
            menu.push(item);
            console.log(menu);
            if(menu.length == menuLength+1){
                // user.menu = menu;
                // saveUser(user);
                props.callback(menu);
            }
        }
    }
    return true;
}
export default Menu;