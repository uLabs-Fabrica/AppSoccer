import React,  {useState } from 'react';
import { DataTable } from 'primereact/components/datatable/DataTable';
import { Column } from 'primereact/components/column/Column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
function SportsData() {
    const [selectedCar] = useState(null);
    const [list, setList] = useState(true); 
    const [sports, setSports] = useState(
        [
            { "club": "Atlético", "state": "SP", "city": "São Paulo", "country": "Brasil", "start":"12/04/2020", "end":"20/04/2020", "rewards":"2" },
            
        ]
    )
    const [newSport, setNewSport] = useState({});
    const onChange = (ref,value) =>{
        newSport[ref]=value;
        setNewSport(newSport);
    }
    const saveSports = (e)=>{
        e.preventDefault();
        setSports(
            [...sports, newSport]
        )
        setList(true);
    }
    return(
        <div>
            {list && 
                <div>
                    <DataTable value={sports} className="p-datatable-borderless" style={{ marginBottom: '20px' }} responsive={true}
                        selectionMode="single" selection={selectedCar} onSelectionChange={(e) => this.setState({ selectedCar: e.value })}>
                        <Column field="club" header="Clube" sortable={true} />
                        <Column field="city" header="Cidade" sortable={true} />
                        <Column field="country" header="País" sortable={true} />
                        <Column field="start" header="Início" sortable={true} />
                        <Column field="end" header="Fim" sortable={true} />
                        <Column field="rewards" header="Conquistas" sortable={true} />
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
                                <InputText required value={newSport.club} onChange={e => onChange("club",e.target.value)} placeholder="Clube" />
                            </div>
                            <div className="p-md-6">
                                <InputText required value={newSport.city} onChange={e => onChange("city", e.target.value)} placeholder="Cidade" />
                            </div>
                            <div className="p-md-6">
                                <InputText required value={newSport.country} onChange={e => onChange("country", e.target.value)} placeholder="País" />
                            </div>
                            <div className="p-md-6">
                                <InputMask required value={newSport.start} onChange={e => onChange("start", e.target.value)} mask="99/99/9999" placeholder="Início" />
                            </div>
                            <div className="p-md-6">
                                <InputMask value={newSport.end} onChange={e => onChange("end", e.target.value)} mask="99/99/9999" placeholder="Fim" />
                            </div>
                            <div className="p-md-6">
                                <InputText required type="number" value={newSport.rewards} onChange={e => onChange("rewards", e.target.value)} placeholder="Conquistas" />
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