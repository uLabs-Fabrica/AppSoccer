import React, { useContext, useCallback, useState, useEffect, useUpdate} from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from "primereact/button";
import "./style.css";
import { UserContext } from '../../context/User';
import { FileUpload} from 'primereact/fileupload';
import { InputMask} from 'primereact/inputmask';
import axios from 'axios';
import 'react-image-crop/dist/ReactCrop.css';
import Cropper from '../../components/Cropper';
import firebase from '../../config/Firebase';

function PersonalData() {
    const context = useContext(UserContext);
    const [imgSelect, setImgSelect] = useState(null)
    const [modalCrop, setModalCrop] = useState(false);
    const[user, setUser] = useState({});
    const onSelectFile = e => {
        console.log("onSelectFile");
        console.log(e);
        console.log(e.files.length);
        if (e.files && e.files.length > 0) {
            console.log(imgSelect);
            setImgSelect(e.files[0]);
        }
    };
    const saveUser = (e)=>{
        e.preventDefault()
    }
    const getZipCode = (zipCode) =>{
        console.log(zipCode.length);
        console.log(zipCode);
        if(zipCode.length === 8){
            axios.get("https://viacep.com.br/ws/" + zipCode + "/json").then((resp)=>{
                console.log(resp);
                if(resp.status === 200){
                    setUser({
                        street:resp.data.logradouro,
                        state:resp.data.uf,
                        city:resp.data.localidade
                    })
                }
            })
        }
    }
    const onSelect = (event)=>{
        console.log("uploadHandler");
        console.log(event.files[0].size);
        if (event.files[0].size <= 2000000){
            setModalCrop(true);
            onSelectFile(event);
        }
        console.log("uploadHandler");
    }
    const uploadHandler = (blob) =>{
        console.log(blob);
        setUser({ avatar:"https://writestylesonline.com/wp-content/uploads/2016/08/Follow-These-Steps-for-a-Flawless-Professional-Profile-Picture-1024x1024.jpg"});
        // var storageRef = firebase.storage().ref();
        // var userAvatar = storageRef.child('profile/user.pmg');

        // userAvatar.put(blob).then(function (snapshot) {
        //     console.log('Uploaded a blob or file!');
        // }, function (error) {
        //     console.log(error);
        // });
    }
    return (
        <div className="personal">
            <Cropper modalCrop={modalCrop} imgSelect={imgSelect} onCut={(blob)=>uploadHandler(blob)} onHide={()=>{setModalCrop(false)}}/>
            <div className="p-grid">
                <div className="p-col-12">
                    <div className="card card-w-title">
                        <h1>Dados Pessoais</h1>
                        <form onSubmit={saveUser}>
                            <div className="p-grid">
                                <div className="p-col-6">
                                    <div className="p-grid">
                                        <div className="p-md-6">
                                            <InputText required value={user.name} onChange={e => setUser({name:e.target.value})} placeholder="Nome completo" />
                                        </div>
                                        <div className="p-md-6">
                                            <InputMask required value={user.birthday} onChange={e => setUser({ birthday: e.target.value })} mask="99/99/9999" placeholder="Data de Nascimento"/>
                                            {/* <Calendar required value={user.birthday} onChange={e => setUser({ birthday: e.target.value })} placeholder="Data de Nascimento"/> */}
                                        </div>
                                        <div className="p-md-6">
                                            <InputMask required value={user.telephone} onChange={e => setUser({ telephone: e.target.value })} mask="(99)9?9999-9999" placeholder="Telefone" />
                                        </div>
                                        <div className="p-md-6">
                                            <InputText required disabled={true} value={context.user.email}  placeholder="Email" />
                                        </div>
                                    </div>
                                    <hr></hr>
                                    <div className="p-grid">
                                        {/* <h3>Endereço</h3> */}
                                        <div className="p-md-6">
                                            <InputMask value={user.zipCode} unmask={true} onChange={e => getZipCode(e.target.value)} mask="99999-999" placeholder="CEP" />
                                        </div>
                                        <div className="p-md-6">
                                            <InputText disabled={true} value={user.street} onChange={e => setUser({ street: e.target.value })} placeholder="Rua" />
                                        </div>
                                        <div className="p-md-6">
                                            <InputText type="number" value={user.number} onChange={e => setUser({ number: e.target.value })} placeholder="Número" />
                                        </div>
                                        <div className="p-md-6">
                                            <InputText value={user.complement} onChange={e => setUser({ complement: e.target.value })} placeholder="Complemento" />
                                        </div>
                                        <div className="p-md-6">
                                            <InputText disabled={true} value={user.city} onChange={e => setUser({ city: e.target.value })} placeholder="Cidade" />
                                        </div>
                                        <div className="p-md-6">
                                            <InputText disabled={true} value={user.state} onChange={e => setUser({ state: e.target.value })} placeholder="Estado" />
                                        </div>
                                    </div>
                                    <div className="p-grid">
                                        <div className="p-col-12">
                                            <Button label="Salvar" style={{ width: '100%' }} type="submit" className="p-button-success" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-md-6">
                                    <div className="p-col-12">
                                        <div className="card">
                                            {!user.avatar &&
                                                <div>
                                                    <h3>Selecione uma foto 3x4</h3>
                                                    <FileUpload  mode="basic" multiple={true} maxFileSize={2000000} onSelect={e => onSelect(e)}/>
                                                </div>
                                            }
                                            {user.avatar &&
                                                <div>
                                                    <img style={{width:'50%'}} alt="profile" src={user.avatar}/>
                                                    <br/>
                                                    <Button label="Trocar foto" onClick={()=>{setUser({avatar:null})}}/>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="p-col-12">
                                        <div className="card">
                                            <div>
                                                <h3>Selecione a foto do RG</h3>
                                                <FileUpload mode="basic" multiple={true} maxFileSize={2000000} onSelect={e => onSelect(e)}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-col-12">
                                        <div className="card">
                                            <h3>Selecione a foto do CPF</h3>
                                            {/* <FileUpload name="demo[]" url="./upload.php" onUpload={this.onUpload} multiple={true} accept="image/*" maxFileSize={1000000} /> */}
                                            <FileUpload mode="basic" multiple={true} maxFileSize={2000000} onSelect={e => onSelect(e)}/>
                                            {/* <ProgressBar value='50' /> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonalData;
