import React, { useContext,  useState, useEffect} from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from "primereact/button";
import "./style.css";
import { UserContext } from '../../context/User';
import { FileUpload} from 'primereact/fileupload';
import { InputMask} from 'primereact/inputmask';
import axios from 'axios';
import 'react-image-crop/dist/ReactCrop.css';
import Cropper from '../../components/Cropper';
import {Post, setFile} from '../../service/APIService';
import moment from 'moment/moment';
import { Dialog } from 'primereact/dialog';
function PersonalData() {
    const context = useContext(UserContext);
    //const { saveUser } = useContext(UserContext);
    const [imgSelect, setImgSelect] = useState(null);
    const [typeFile, setTypeFile] = useState('');
    const [modalCrop, setModalCrop] = useState(false);
    const [alert, setAlert] = useState({ title: '', label: '' });
    const[user, setUser] = useState({});
    useEffect(()=>{
        let data = context.user["prsnl-dta"];
        if (data){
            console.log(data);
            if(data.birthday && data.birthday.indexOf('/')== -1){
                let newDate = moment(data.birthday,'YYYY-MM-DD').format('DD/MM/YYYY');
                data.birthday = newDate;
            }
            setUser(data);
        }
    },[context.user])
    const onSelectFile = (e) => {
        if (e.files && e.files.length > 0) {
            console.log(imgSelect);
            setImgSelect(e.files[0]);
        }
    };
    const onChange = (ref, value) => {
        console.log("ref",ref);
        console.log("value",value);
        user[ref] = value;
        setUser(user);
    }
    const saveUser = (e)=>{
        console.log(user);
        user.birthday = moment(user.birthday, "DD/MM/YYYY").format("YYYY-MM-DD");
        console.log(context);
        let data = {'prsnl-dta':user};
        console.log(data);
        context.saveUser(data);
        Post(['users'],[context.user.uid],data,"set").then(()=>{
            console.log("add");
            setAlert({title:"Sucesso!",label:"Dados foram atualizados"});
        },(error)=>{
            setAlert({ title: "Erro!", label: "Erro ao salvar dados" });
            console.log("error");
            console.log(error);
        });
        e.preventDefault();
    }
    const getZipCode = (zipCode) =>{
        console.log(zipCode.length);
        console.log(zipCode);
        if(zipCode.length === 8){
            axios.get("https://viacep.com.br/ws/" + zipCode + "/json").then((resp)=>{
                console.log(resp);
                if(resp.status === 200){
                    let data = {
                        "street": resp.data.logradouro,
                        "state": resp.data.uf,
                        "city": resp.data.localidade,
                        "zipCode": zipCode
                    }
                    console.log(data);
                    setUser({...user,...data});
                    console.log(user);
                }
            })
        }
    }
    const onSelect = (event,type)=>{
        setTypeFile(type);
        if (event.files[0].size <= 2000000){
            setModalCrop(true);
            onSelectFile(event);
        }
    }
    const uploadHandler = (blob) =>{
        console.log(blob, 'profile/' + context.user.uid + "/"+typeFile + Math.random() + ".png");
        // setUser({ avatar:"https://writestylesonline.com/wp-content/uploads/2016/08/Follow-These-Steps-for-a-Flawless-Professional-Profile-Picture-1024x1024.jpg"});
        setFile(blob, 'profile/' + context.user.uid + "/"+typeFile + Math.random() + ".png").then((url) => {
            saveFiles(url);
        }, (error) => {
            console.log(error);
            setAlert({ title: "Erro", "label": "Erro ao carregar imagem, tente novamente" });
        })
    }
    const saveFiles = (url) =>{
        let data = {"prsnl-dta":{}};
        data["prsnl-dta"][typeFile]= url;
        Post(['users'], [context.user.uid], data,"set").then(() => {
            let data = {};
            data[typeFile] = url;
            user[typeFile] = url;
            let result = Object.assign(user,data,context.user);
            console.log(result);
            context.user['prsnl-dta'] = user;
            context.saveUser(context.user);
            setUser({...user,...result});
            console.log(user);
            console.log(data);
            console.log(context);
            setTimeout(() => {
                console.log(user);
                console.log(data);
                console.log(context);
            }, 2000);
        }, (error) => {
            console.log("save files");
            console.log(error);
            setAlert({ title: "Erro", "label": "Erro ao carregar imagem, tente novamente" });
        });
    }
    return (
        <div className="personal">
            <Dialog header={alert.title} visible={alert.label !== ''} style={{ width: '50vw' }} modal={true} onHide={() => setAlert({ label: '' })}>
                {alert.label}
            </Dialog>
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
                                            <InputText required defaultValue={user.name} onChange={e => onChange("name", e.target.value)} placeholder="Nome completo" />
                                        </div>
                                        <div className="p-md-6">
                                            <InputMask required value={user.birthday}  onChange={e => onChange("birthday", e.target.value)} mask="99/99/9999" placeholder="Data de Nascimento"/>
                                            {/* <Calendar required value={user.birthday} onChange={e => setUser({ birthday: e.target.value })} placeholder="Data de Nascimento"/> */}
                                        </div>
                                        <div className="p-md-6">
                                            <InputMask required unmask={true} value={user.telephone} onChange={e => onChange("telephone", e.target.value )} mask="(99)9?9999-9999" placeholder="Telefone" />
                                        </div>
                                        <div className="p-md-6">
                                            <InputText required disabled={true} defaultValue={context.user.email}  placeholder="Email" />
                                        </div>
                                    </div>
                                    <hr></hr>
                                    <div className="p-grid">
                                        {/* <h3>Endereço</h3> */}
                                        <div className="p-md-6">
                                            <InputMask value={user.zipCode} unmask={true} onChange={e => getZipCode(e.target.value)} mask="99999-999" placeholder="CEP" />
                                        </div>
                                        <div className="p-md-6">
                                            <InputText disabled={true} defaultValue={user.street} onChange={e => onChange("street", e.target.value)} placeholder="Rua" />
                                        </div>
                                        <div className="p-md-6">
                                            <InputText type="number" defaultValue={user.number} onChange={e => onChange( "number" ,e.target.value )} placeholder="Número" />
                                        </div>
                                        <div className="p-md-6">
                                            <InputText defaultValue={user.complement} onChange={e => onChange("complement", e.target.value)} placeholder="Complemento" />
                                        </div>
                                        <div className="p-md-6">
                                            <InputText disabled={true} defaultValue={user.city} onChange={e => onChange("city", e.target.value)} placeholder="Cidade" />
                                        </div>
                                        <div className="p-md-6">
                                            <InputText disabled={true} defaultValue={user.state} onChange={e => onChange("state", e.target.value )} placeholder="Estado" />
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
                                                    <FileUpload  mode="basic" multiple={true} maxFileSize={2000000} onSelect={e => onSelect(e,'avatar')}/>
                                                </div>
                                            }
                                            {user.avatar &&
                                                <div>
                                                    <img style={{width:'50%'}} alt="Imagem de Perfil" src={user.avatar}/>
                                                    <br/>
                                                    <FileUpload mode="basic" multiple={true} maxFileSize={2000000} onSelect={e => onSelect(e, 'avatar')} />
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="p-col-12">
                                        <div className="card">
                                            {!user.rg &&
                                                <div>
                                                    <h3>Selecione a foto do RG</h3>
                                                    <FileUpload mode="basic" multiple={true} maxFileSize={2000000} onSelect={e => onSelect(e, 'rg')}/>
                                                </div>
                                            }
                                            {user.rg &&
                                                <div>
                                                    <img style={{ width: '50%' }} alt="Imagem do RG" src={user.rg} />
                                                    <br />
                                                    <FileUpload mode="basic" multiple={true} maxFileSize={2000000} onSelect={e => onSelect(e, 'rg')} />
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="p-col-12">
                                        <div className="card">
                                            {!user.cpf &&
                                                <div>
                                                    <h3>Selecione a foto do CPF</h3>
                                                    <FileUpload mode="basic" multiple={true} maxFileSize={2000000} onSelect={e => onSelect(e, 'cpf')} />
                                                </div>
                                            }
                                            {user.cpf &&
                                                <div>
                                                    <img style={{ width: '50%' }} alt="Imagem do RG" src={user.cpf} />
                                                    <br />
                                                    <FileUpload mode="basic" multiple={true} maxFileSize={2000000} onSelect={e => onSelect(e, 'cpf')} />
                                                </div>
                                            }
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
