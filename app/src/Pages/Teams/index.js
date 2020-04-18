import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';

function Teams() {
    const [selectedTeam] = useState(null);
    const [list, setList] = useState(true);
    const [teams, setTeams] = useState(
        [
            { "name": "Antonio", "site": "http://google.com.br", "city": "São Paulo", "state": "SP", "logo": "assets/layout/images/logo-low.png" },

        ]
    )
    const [newTeam, setNewTeams] = useState({});
    const onChange = (ref, value) => {
        newTeam[ref] = value;
        setNewTeams(newTeam);
    }
    const saveTeam = (e) => {
        e.preventDefault();
        console.log(newTeam);
        newTeam.logo = "assets/layout/images/logo-low.png";
        setTeams(
            [...teams, newTeam]
        )
        setList(true);
    }
    const organizationLogo = (row) => {
        return (
            <img width="50%" src={row.logo} />
        )
    }

    return (
        <div>
            {list &&
                <div>
                    <DataTable value={teams} className="p-datatable-borderless" style={{ marginBottom: '20px' }} responsive={true}
                        selectionMode="single" selection={selectedTeam}>
                        <Column field="name" header="Nome" sortable={true} />
                        <Column field="site" header="Site" sortable={true} />
                        <Column field="city" header="Cidade" sortable={true} />
                        <Column field="state" header="Estado" sortable={true} />
                        <Column body={organizationLogo} />
                    </DataTable>
                    <Button label="Cadastrar" type="button" onClick={() => { setList(false) }} className="p-button-success" />
                </div>
            }
            {!list &&
                <div className="card card-w-title">
                    <h1>Nova Equipe</h1>
                    <form onSubmit={saveTeam}>
                        <div className="p-grid">
                            <div className="p-md-6">
                                <InputText required defaultValue={newTeam.name} onChange={e => onChange("name", e.target.value)} placeholder="Nome" />
                            </div>
                            <div className="p-md-6">
                                <InputText required defaultValue={newTeam.site} onChange={e => onChange("site", e.target.value)} placeholder="Site" />
                            </div>
                            <div className="p-md-6">
                                <InputText required defaultValue={newTeam.city} onChange={e => onChange("city", e.target.value)} placeholder="Cidade" />
                            </div>
                            <div className="p-md-6">
                                <InputText required defaultValue={newTeam.state} onChange={e => onChange("state", e.target.value)} placeholder="Estado" />
                            </div>
                            <div className="p-md-6">
                                <FileUpload mode="basic" chooseLabel="Insira um logo" multiple={true} maxFileSize={2000000} onSelect={e => onChange("logo", e)} />
                            </div>
                        </div>
                        <Button label="Salvar" type="submit" className="p-button-success" />
                    </form>
                </div>
            }
        </div>
    )
}
export default Teams;