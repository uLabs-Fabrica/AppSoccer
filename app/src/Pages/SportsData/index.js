import React,  {useState, useEffect, useContext} from 'react';
import { DataTable } from 'primereact/components/datatable/DataTable';
import { Column } from 'primereact/components/column/Column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { UserContext } from '../../context/User';
import { Post, GET, DELETE } from '../../service/APIService';
import { Dialog } from 'primereact/dialog';
import moment from 'moment/moment';
import cloneDeep from 'lodash/cloneDeep';
function SportsData() {
    const [list, setList] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [sports, setSports] = useState([]);
    const [alert, setAlert] = useState({ title: '', label: '' });
    const [confirm, setConfirm] = useState({ title: '', label: '' });
    const context = useContext(UserContext);
    useEffect(()=>{
        if(context.user.uid){
            GET(['users', 'sprt-dta'], [context.user.uid]).then((snapshot)=>{
                snapshot.forEach(doc => {
                    console.log(doc.id, '=>', doc.data());
                    let data = doc.data();
                    data.uid = doc.id 
                    data.start = moment(data.start,"YYYY-MM-DD").format("DD/MM/YYYY");
                    data.end = moment(data.end, "YYYY-MM-DD").format("DD/MM/YYYY");
                    setSports(sports => [...sports,data]);
                });
            })
        }
    }, [context.user.uid])
    const [newSport, setNewSport] = useState({});
    const onChange = (ref,value) =>{
        newSport[ref]=value;
        setNewSport(newSport);
    }
    const saveSports = (e)=>{
        e.preventDefault();
        let dataSport  = cloneDeep(newSport);
        dataSport.start = moment(dataSport.start, "DD/MM/YYYY").format("YYYY-MM-DD");
        dataSport.end = moment(dataSport.end, "DD/MM/YYYY").format("YYYY-MM-DD");
        let configRequest = {};
        if(!editMode){
            configRequest.type = 'add';
            configRequest.docs = [context.user.uid];
        }else{
            configRequest.type = 'set';
            configRequest.docs = [context.user.uid,newSport.uid];
        }
        console.log(newSport);
        Post(['users', 'sprt-dta'], configRequest.docs, dataSport, configRequest.type).then((resp) => {
            if(!editMode){
                let data = cloneDeep(newSport);
                data.uid = resp.id;
                setSports([...sports, data]);
            }else{
                setEditMode(false);
            }
            setAlert({ title: "Sucesso!", label: "Dados foram atualizados" });
        }, (error) => {
            setAlert({ title: "Erro!", label: "Erro ao salvar dados" });
            console.log("error", error);
        });
        setList(true);
    }
    const removeSport = (row) =>{
        console.log(row);
        setConfirm({title:"Atenção", label:"Deseja excluir? Essa opção é irreversível", action:()=>{
            DELETE(['users', 'sprt-dta'], [context.user.uid,row.uid]).then(()=>{
                let data = sports.filter((item)=>{
                    if(item != row){
                        return true;
                    }
                })
                setSports(data);
            },()=>{
                setAlert({ title: "Erro!", label: "Não foi possível deletar, tente novamente" }); 
            });
        }});
    }
    const editSport = (row)=>{
        setList(false);
        setEditMode(true);
        setNewSport(row);
    }
    const templateActions = (row) => {
        return (
            <div>
                <Button type="button" icon="pi pi-pencil" onClick={() => editSport(row)} className="p-button-info"></Button>
                <Button type="button" icon="pi pi-trash" onClick={() => removeSport(row)} className="p-button-danger"></Button>
            </div>
        );
    }
    const dialogFooter = (
        <div>
            <Button label="Sim" icon="pi pi-check" onClick={()=>{confirm.action();setConfirm({label:''})}} />
            <Button label="Não" icon="pi pi-times" onClick={() => setConfirm({ label: '' })} />
        </div>
    );
    return(
        <div>
            <Dialog header={alert.title} visible={alert.label !== ''} style={{ width: '50vw' }} modal={true} onHide={() => setAlert({ label: '' })}>
                {alert.label}
            </Dialog>
            <Dialog header={confirm.title} footer={dialogFooter} visible={confirm.label !== ''} style={{ width: '50vw' }} modal={true} onHide={() => setConfirm({ label: '' })}>
                {confirm.label}
            </Dialog>
            {list && 
                <div>
                <DataTable value={sports} className="p-datatable-borderless" selectionMode="single" style={{ marginBottom: '20px' }} responsive={true}
                        selectionMode="single">
                        <Column field="club" header="Clube" sortable={true} />
                        <Column field="city" header="Cidade" sortable={true} />
                        <Column field="country" header="País" sortable={true} />
                        <Column field="start" header="Início" sortable={true} />
                        <Column field="end" header="Fim" sortable={true} />
                        <Column field="rewards" header="Conquistas" sortable={true} />
                        <Column body={templateActions} />
                    </DataTable>
                    <Button label="Cadastrar" type="button" onClick={()=>{setList(false)}} className="p-button-success" />
                </div>
            }
            {!list &&
                <div className="card card-w-title">
                    <h1>Novo Dado Esportivo</h1>
                    <form onSubmit={saveSports}>
                        <div className="p-grid">
                            <div className="p-md-6">
                                <InputText required defaultValue={newSport.club} onChange={e => onChange("club",e.target.value)} placeholder="Clube" />
                            </div>
                            <div className="p-md-6">
                                <InputText required defaultValue={newSport.city} onChange={e => onChange("city", e.target.value)} placeholder="Cidade" />
                            </div>
                            <div className="p-md-6">
                                <InputText required defaultValue={newSport.country} onChange={e => onChange("country", e.target.value)} placeholder="País" />
                            </div>
                            <div className="p-md-6">
                                <InputMask required value={newSport.start} onChange={e => onChange("start", e.target.value)} mask="99/99/9999" placeholder="Início" />
                            </div>
                            <div className="p-md-6">
                                <InputMask value={newSport.end} onChange={e => onChange("end", e.target.value)} mask="99/99/9999" placeholder="Fim" />
                            </div>
                            <div className="p-md-6">
                                <InputText required type="number" defaultValue={newSport.rewards} onChange={e => onChange("rewards", e.target.value)} placeholder="Conquistas" />
                            </div>
                        </div>
                        <Button label="Salvar" type="submit" className="p-button-success" />
                    </form>
                </div>
            }
        </div>
    )
}
export default SportsData;