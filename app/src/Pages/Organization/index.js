import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import {Button} from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';

function Organization() {
    const [selectedCar] = useState(null);
    const [list, setList] = useState(true);
    const [organizations, setOrganization] = useState(
        [
            { "name": "Antonio", "site": "http://google.com.br", "telephone": "1125485784", "email": "antonio@gmail.com", "logo": "assets/layout/images/logo-low.png"},

        ]
    )
    const [newOrganization, setNewOrganization] = useState({});
    const onChange = (ref, value) => {
        newOrganization[ref] = value;
        setNewOrganization(newOrganization);
    }
    const saveOrganizations = (e) => {
        e.preventDefault();
        console.log(newOrganization);
        newOrganization.logo = "assets/layout/images/logo-low.png";
        setOrganization(
            [...organizations, newOrganization]
        )
        setList(true);
    }
    const organizationLogo = (row) =>{
        return(
            <img width="50%" src={row.logo} />
        )
    }
    
    return (
        <div>
            {list &&
                <div>
                    <DataTable value={organizations} className="p-datatable-borderless" style={{ marginBottom: '20px' }} responsive={true}
                        selectionMode="single" selection={selectedCar} onSelectionChange={(e) => this.setState({ selectedCar: e.value })}>
                        <Column field="name" header="Nome" sortable={true} />
                        <Column field="site" header="Site" sortable={true} />
                        <Column field="telephone" header="Telefone" sortable={true} />
                        <Column field="email" header="Email" sortable={true} />
                        <Column body={organizationLogo}/>
                    </DataTable>
                    <Button label="Cadastrar" type="button" onClick={() => { setList(false) }} className="p-button-success" />
                </div>
            }
            {!list &&
                <div className="card card-w-title">
                    <h1>Novo Organizador</h1>
                    <form onSubmit={saveOrganizations}>
                        <div className="p-grid">
                            <div className="p-md-6">
                                <InputText required defaultValue={newOrganization.name} onChange={e => onChange("name", e.target.value)} placeholder="Nome" />
                            </div>
                            <div className="p-md-6">
                                <InputText required defaultValue={newOrganization.site} onChange={e => onChange("site", e.target.value)} placeholder="Site" />
                            </div>
                            <div className="p-md-6">
                                <InputMask required defaultValue={newOrganization.telephone} mask="(99)9?9999-9999" unmask={true} onChange={e => onChange("telephone", e.target.value)} placeholder="Telefone" />
                            </div>
                            <div className="p-md-6">
                                <InputText required type="email" defaultValue={newOrganization.email} onChange={e => onChange("email", e.target.value)} placeholder="Email" />
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
export default Organization;