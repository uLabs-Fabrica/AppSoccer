import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from "primereact/button";
import "./style.css"

export default class Login extends Component {

    render() {
        return <div className="login-body">
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
                                        <InputText placeholder="Username" />
                                    </div>
                                    <div className="p-col-12">
                                        <InputText type="password" placeholder="Password" />
                                    </div>
                                    <div className="p-col-6">
                                        <Button label="Entrar" icon="pi pi-check" onClick={() => { window.location = "/#/dashboard" }} />
                                    </div>
                                    <div className="p-col-6 password-container">
                                        <a href="/#">Esqueceu a senha?</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}
