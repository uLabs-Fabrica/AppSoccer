import React, { useState } from 'react';
import { DataTable } from 'primereact/components/datatable/DataTable';
import { Column } from 'primereact/components/column/Column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { InputTextarea }from 'primereact/inputtextarea';
import {Dropdown} from 'primereact/dropdown';
import { Checkbox} from 'primereact/checkbox';
import { FileUpload} from 'primereact/fileupload';
function Championship() {
    const [selectedChampionship] = useState(null);
    const [list, setList] = useState(true);
    const [organizations] = useState([
        {"label":"Organização1", "value":"Organização1"},
        {"label":"Organização2", "value":"Organização2"}
    ]);
    const [teams] = useState([
        { "label": "Equipe1", "value": "Equipe1" },
        { "label": "Equipe2", "value": "Equipe2" }
    ]);
    const [categories] = useState([
        { "label": "Categoria1", "value": "Categoria1" },
        { "label": "Categoria2", "value": "Categoria2" }
    ]);
    const [modalities] = useState([
        { "label": "Modalidade1", "value": "Modalidade1" },
        { "label": "Modalidade2", "value": "Modalidade2" }
    ]);
    const [championship, setChampionship] = useState(
        [
            { "organization": "Organização", "competition": "Competição", "category": "Categoria", "start": "12/04/2020", "end": "20/04/2020", "necessity": "Estadio, Ambulância", "modality": "Copa", "teams": "Equipe1","note":"Observações", "logo":"assets/layout/images/logo-low.png" }
        ]
    )
    const [newChampionship, setNewChampionship] = useState({necessities:{}});
    const onChange = (ref, value) => {
        newChampionship[ref] = value;
        setNewChampionship(newChampionship);
    }
    const checkNessecity = (ref,value) =>{
        if(!newChampionship['necessities'][ref]){
            newChampionship['necessities'][ref] = value;
        }else{
            newChampionship['necessities'][ref] = false;
        }
        setNewChampionship(newChampionship);
    }
    const saveChampionship = (e) => {
        e.preventDefault();
        console.log(newChampionship);
        newChampionship.logo = "assets/layout/images/logo-low.png";
        newChampionship.necessity = "";
        for(let i in newChampionship.necessities){
            if (newChampionship.necessities[i]){
                newChampionship.necessity += (newChampionship.necessities[i]+', ')
            }
        }
        console.log(newChampionship);
        setChampionship(
            [...championship, newChampionship]
        )
        setList(true);
        setNewChampionship({ necessities: {} });
    }
    const championshipLogo = (row)=>{
        return (
            <img width="50%" src={row.logo} />
        )
    }
    return (
        <div>
            {list &&
                <div>
                    <DataTable value={championship} className="p-datatable-borderless" style={{ marginBottom: '20px' }} responsive={true}
                        selectionMode="single" selection={selectedChampionship}>
                        <Column field="organization" header="Organização" sortable={true} />
                        <Column field="competition" header="Competição" sortable={true} />
                        <Column field="category" header="Categoria" sortable={true} />
                        <Column field="start" header="Início" sortable={true} />
                        <Column field="end" header="Fim" sortable={true} />
                        <Column field="necessity" header="Necessidades" sortable={true} />
                        <Column field="modality" header="Modalidade" sortable={true} />
                        <Column field="note" header="Observações" sortable={true} />
                        <Column field="teams" header="Equipes" sortable={true} />
                        <Column body={championshipLogo} />
                    </DataTable>
                    <Button label="Cadastrar" type="button" onClick={() => { setList(false) }} className="p-button-success" />
                </div>
            }
            {!list &&
                <div className="card card-w-title">
                    <h1>Novo Campeonato</h1>
                    <form onSubmit={saveChampionship}>
                        <div className="p-grid">
                            <div className="p-md-6">
                                <Dropdown value={newChampionship.organization} options={organizations} autoWidth={false} placeholder="Selecione o organizador" onChange={e => onChange("organization", e.target.value)} />
                            </div>
                            <div className="p-md-6">
                                <InputText required type="text" defaultValue={newChampionship.competition} onChange={e => onChange("competition", e.target.value)} placeholder="Competição" />
                            </div>
                            <div className="p-md-6">
                                <Dropdown value={newChampionship.category} options={categories} autoWidth={false} placeholder="Selecione uma categoria" onChange={e => onChange("category", e.target.value)} />
                            </div>
                            <div className="p-md-6">
                                <InputMask required type="text" value={newChampionship.start} onChange={e => onChange("start", e.target.value)} mask="99/99/9999" placeholder="Início" />
                            </div>
                            <div className="p-md-6">
                                <InputMask value={newChampionship.end} onChange={e => onChange("end", e.target.value)} mask="99/99/9999" placeholder="Fim" />
                            </div>
                            <div className="p-md-6">
                                <Dropdown value={newChampionship.modality} options={modalities} autoWidth={false} placeholder="Selecione uma modalidade" onChange={e => onChange("modality", e.target.value)} />
                            </div>
                            <div className="p-md-6">
                                <Dropdown value={newChampionship.team} options={teams} autoWidth={false} placeholder="Selecione uma equipe" onChange={e => onChange("team", e.target.value)} />
                            </div>
                            <div className="p-md-6">
                                <InputTextarea rows={5} cols={30} defaultValue={newChampionship.note} onChange={e => onChange("note", e.target.value)} autoResize={true} placeholder="Observações" />
                            </div>
                            <div className="p-md-6">
                                <FileUpload mode="basic" chooseLabel="Insira um logo" multiple={true} maxFileSize={2000000} onSelect={e => onChange("logo", e)} />
                            </div>
                            <div className="p-md-6">
                                <h3>Necessidades</h3>
                                <ul>
                                    <li>
                                        <Checkbox inputId="stadium" onChange={e => checkNessecity('stadium', 'Estádio')} checked={newChampionship.necessities.stadium}></Checkbox>
                                        <label htmlFor="stadium" className="p-checkbox-label">Estádio</label>
                                    </li>
                                    <li>
                                        <Checkbox inputId="ambulance" onChange={e => checkNessecity('ambulance', 'Ambulância')} checked={newChampionship.necessities.ambulance}></Checkbox>
                                        <label htmlFor="ambulance" className="p-checkbox-label">Ambulância</label>
                                    </li>
                                    <li>
                                        <Checkbox inputId="police" onChange={e => checkNessecity('police', 'Policiamento')} checked={newChampionship.necessities.police}></Checkbox>
                                        <label htmlFor="police" className="p-checkbox-label">Policiamento</label>
                                    </li>
                                    <li>
                                        <Checkbox inputId="ballBoy" onChange={e => checkNessecity('ballBoy', 'Gandula')} checked={newChampionship.necessities.ballBoy}></Checkbox>
                                        <label htmlFor="ballBoy" className="p-checkbox-label">Gandula</label>
                                    </li>
                                    <li>
                                        <Checkbox inputId="stretcherBearer" onChange={e => checkNessecity('stretcherBearer', 'Maqueiro')} checked={newChampionship.necessities.stretcherBearer}></Checkbox>
                                        <label htmlFor="stretcherBearer" className="p-checkbox-label">Maqueiro</label>
                                    </li>
                                    <li>
                                        <Checkbox inputId="doctor" onChange={e => checkNessecity('doctor', 'Médico')} checked={newChampionship.necessities.doctor}></Checkbox>
                                        <label htmlFor="doctor" className="p-checkbox-label">Médico</label>
                                    </li>
                                    <li>
                                        <Checkbox inputId="reduced" onChange={e => checkNessecity('reduced', 'Campo reduzido')} checked={newChampionship.necessities.reduced}></Checkbox>
                                        <label htmlFor="reduced" className="p-checkbox-label">Campo reduzido</label>
                                    </li>
                                </ul>
                            </div>
                            
                        </div>
                        <Button label="Salvar" type="submit" className="p-button-success" />
                    </form>
                </div>
            }
        </div>
    )
}
export default Championship;