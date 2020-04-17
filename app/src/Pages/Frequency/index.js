import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from "primereact/button";
//import "./style.css";
import { InputMask } from 'primereact/inputmask';
import { Panel } from 'primereact/components/panel/Panel';
//import { Calendar } from 'primereact/calendar';
import moment from 'moment/moment';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {Dropdown} from 'primereact/dropdown';
import {FullCalendar} from 'primereact/fullcalendar';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBr from '@fullcalendar/core/locales/pt-br';
import { InputTextarea } from 'primereact/inputtextarea';
function Frequency() {
    //(foto, nome, posição + botão para definir o status + observação)
    const [date,setDate] = useState(null);
    const [players] = useState([
        { avatar: "", name:"Rogério", position:"Goleiro", status:"", note:""},
        { avatar: "", name: "Matheus", position: "Zagueiro", status: "", note: "" }
    ])
    const [status] = useState([
        {label:"Ausente", value:"Ausente"},
        {label:"Presente", vlue:"Presente"},
        {label:"Lesionado", value:"Lesionado"},
        {label:"Viagem", value:"Viagem"}
    ])
    const dateClick = (day) =>{
        console.log(date)
        setDate(day.date);
    }
    const [categories] = useState([
        {label:"categoria1", value:"categoria1"},
        {label:'categoria2', value:"categoria2"}
    ])
    const [fullcalendarOptions] = useState({
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        defaultDate: new Date(),
        locale: ptBr,
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        buttonText: {
            today: 'Hoje'
        },
        dateClick:dateClick
    })
    const playerNote = ()=>{
        return(
            <InputTextarea rows={5} cols={20} defaultValue="" autoResize={true} placeholder="Observações" />
        )
    }
    const playerStatus = ()=>{
        return (
            <Dropdown options={status} autoWidth={false} placeholder="Status" />
        )
    }
    const playerAvatar = () =>{
        return (
            <img src="assets/layout/images/avatar/avatar.png" alt="apollo-layout" />
        )
    }
    return(
        <Panel header="Frequência">
            {!date && 
                <div>
                    <h2>Selecione uma Data</h2>
                    <hr/>
                    <FullCalendar  options={fullcalendarOptions} />
                </div>
            }
            {date && 
                <div>
                    <Dropdown options={categories} autoWidth={false} placeholder="Selecione a categoria" />
                    <hr/>
                    <h2>Lista de Jogadores para a data {moment(date).format("DD/MM/YYYY")}</h2>
                    <DataTable value={players}  className="p-datatable-borderless" style={{ marginBottom: '20px' }} responsive={true}
                        selectionMode="single">
                        <Column body={playerAvatar} />
                        <Column field="name" header="Nome" sortable={true} />
                        <Column field="position" header="Posição" sortable={true} />
                        <Column body={playerStatus} header="Status" />
                        <Column body={playerNote} header="Observação" />
                    </DataTable>
                </div>
            }
            
        </Panel>
    )
}
export default Frequency;