import React, { useContext, useCallback, useState, useEffect} from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from "primereact/button";
import "./style.css";
import firebase from '../../config/Firebase';
import {Dialog} from 'primereact/dialog';
import {auth, changePassword} from '../../service/AuthService';
import { UserContext } from '../../context/User';
import { Sidebar } from 'primereact/sidebar';

function Login () {
    const [email, setInput] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState({title:'', label:''});
    const [visible, setVisible] = useState(false);
    const { saveUser } = useContext(UserContext);
    const autentication = ()=>{
        console.log(email, password);
        if(email === ''){
            setAlert({ title:"Atenção",label: "Email obrigatório"});
            return;
        }
        if(password === ''){
            setAlert({title:"Atenção",label:"Senha obrigatória"});
            return;
        }
        
        auth(email,password).then((user)=>{
            console.log(user);
            saveUser(user);
            //     const db =  firebase.firestore();
            //     let uid = resp.user.uid;
            //     let ref = db.collection('roles').doc("BxJj5DlzaOYWnfGpo5g4g0Kp88Q2");
            //     ref.get().then(doc => {
            //         if (!doc.exists) {
            //             console.log('No such document!');
            //         } else {
            //             console.log('Document data:', doc.data());
            //         }
            //     })
            //     .catch(err => {
            //         console.log('Error getting document', err);
            //     });
            window.location = "/#/dashboard";
        }, (error)=>{
            setAlert({title:"Erro",label:error});
        })
    }
    const forgotPassword =()=>{
        setVisible(false)
        changePassword(email).then((data)=>{
            setAlert({title:"Sucesso!",label:"Acesse seu email para redefinir a senha"});
        },(error)=>{
            switch (error.code) {
                case "auth/user-not-found":
                    error.message = "Usuário não encontrado, por favor verifique o email.";
                    break;

                default:
                    error.message = "Usuário não encontrado, por favor verifique o email.";
                    break;
            }
            setAlert({title:"Erro",label:error.message});
        });
    }
    const close = ()=>{
        alert("fechou")
        setVisible(false)
    }
    return(
        <div className="login-body">
            <Sidebar visible={visible} fullScreen={true} onHide={close}>
                <div className="forgot-password">
                    <div className="box">
                        <div className="grow-1">
                            <p>Digite seu email para enviarmos um link de recuperação de senha</p>
                        </div>
                        <div className="grow2">
                            <InputText value={email} onChange={e => setInput(e.target.value)} type="email" placeholder="email" />
                        </div>
                        <div className="grow1">
                            <Button label="Enviar" icon="pi pi-check" onClick={forgotPassword} />
                        </div>
                    </div>
                </div>
            </Sidebar>
            <Dialog header={alert.title} visible={alert.label!=''} style={{ width: '50vw' }} modal={true} onHide={() => setAlert({label:''})}>
               {alert.label}
            </Dialog>
            <div className="body-container">
                <div className="p-grid p-nogutter">
                    <div className="p-col-12 p-lg-6 left-side">
                        <img src="assets/layout/images/logo.png" className="logo" />
                        <h1>Bem-vindo</h1>
                        {/* <p>
                            Sign in to start your session
						</p> */}
                    </div>
                    <div className="p-col-12 p-lg-6 right-side">
                        <div className="login-wrapper">
                            <div className="login-container">
                                <span className="title">Acesso</span>

                                <div className="p-grid p-fluid">
                                    <div className="p-col-12">
                                        <InputText  value={email} onChange={e => setInput(e.target.value)} type="email" placeholder="Username" />
                                    </div>
                                    <div className="p-col-12">
                                        <InputText value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
                                    </div>
                                    {/*className={errorLabel != '' ? 'p-error':''} */}
                                    <div className="p-col-6">
                                        {/* <Button label="Entrar" icon="pi pi-check" onClick={() => { window.location = "/#/dashboard" }} /> */}
                                        <Button label="Entrar" icon="pi pi-check" onClick={autentication} />
                                    </div>
                                    <div className="p-col-6 password-container">
                                        <a href="/#" onClick={()=>{setVisible(true)}}>Esqueceu a senha?</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
