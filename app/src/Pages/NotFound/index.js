import React from 'react';
import { Button } from "primereact/button";
import {useHistory} from 'react-router-dom';

export default function NotFound(){
    const history = useHistory();
    const goDashboard=()=>{
        history.push("/dashboard");
    }
    return(
        <div className="exception-body notfound-body">
            <div className="exception-container">
                <img src="assets/layout/images/logo-low.png" alt="apollo-layout" />
                <h1>Página não encontrada</h1>
                {/* <p>
                    Resource is not found.
                </p> */}
    
                <Button label="Ir para  Dashboard" icon="pi pi-arrow-left" onClick={goDashboard}/>
            </div>
        </div>
    ) 
} 

 
