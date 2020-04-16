import React, { useState} from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from "primereact/button";
//import "./style.css";
import { InputMask } from 'primereact/inputmask';
import 'react-image-crop/dist/ReactCrop.css';
import { Dropdown } from 'primereact/dropdown';
import { FullCalendar } from 'primereact/fullcalendar';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBr from '@fullcalendar/core/locales/pt-br';
import { Panel } from 'primereact/components/panel/Panel';
import { Calendar } from 'primereact/calendar';
import moment from 'moment/moment';
import { InputTextarea} from 'primereact/inputtextarea';
import { DataTable} from 'primereact/datatable';
import { Column} from 'primereact/column';

function Schedule() {
    const [list, setList] = useState(true);
    const [event, setEvent] = useState({});
    const [newActivity, setNewActivity] = useState(false);
    const [activities] = useState([
        { label: "Tático", value:"Tático"},
        { label: "Aeróbico", value: "Aeróbico" },
        { label: "Reduzido", value: "Reduzido" }
    ]);
    const [positions] = useState([
        {label:"Goleiro", value:"Goleiro"},
        { label: "Atacante", value: "Atacante" },
        { label: "Zagueiro", value: "Zagueiro" },
    ])
    console.log(event);
    const eventClick = (date)=>{
        console.log(date);
        console.log(date.event.id);
        console.log(date.event.start);
        console.log(date.local);
        console.log(events);
        let event = events.filter((item)=>{
            if(item.id == date.event.id){
                return true;
            }
        })
        event[0].date = moment(event[0].date).format("DD/MM/YYYY");
        setEvent(event[0]);
        console.log(event);
        setList(false);
    }
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
        eventClick:eventClick
    })
    const [events] = useState([
        {
            "id": 2,
            "title": "Clube 04",
            "start": "2020-04-12 16:00:00",
            "end": "2020-04-12 18:00:00",
            "local": "Clube 04",
            "date": "2020-04-14"
        }
    ])
    const newTreinament = () => {
        console.log("newTreinament");
        setList(false);
        setEvent({});
    }
    const onChange = (ref, value) =>{
        if(ref === "date"){
            value = moment(value).format("DD/MM/YYYY");
        }
        event[ref] = value;
        console.log(value);

        console.log(event);
        setEvent(event);
    }
    const changeNewActivity = (ref, value) =>{
        newActivity[ref] = value;
        setNewActivity(newActivity);
    }
    const saveEvent = (e) =>{
        e.preventDefault();
    }
    console.log(event);
    const saveActivity = (e) =>{
        e.preventDefault();
        console.log(newActivity);
        if(!event.activities){
            event.activities = [newActivity];
        }else{
            event.activities.push(newActivity);
        }
        setEvent(event);
        console.log(event);
        setNewActivity(false);
    }
    const removeActivity = (row)=>{
        console.log(row);
        event.activities = event.activities.filter((item)=>{
            console.log(item);
            console.log(row);
            if(item != row){
                return true;
            }
        })
        console.log(event);
        setEvent(event);
    }
    const actionButton = (row) =>{
        return (
            <Button type="button" icon="pi pi-trash" onClick={()=>removeActivity(row)} className="p-button-secondary"></Button>
        );
    }
    return(
        <div>
            {list &&
                <Panel header="Programação">
                    <FullCalendar events={events} options={fullcalendarOptions} />
                    <Button label="Cadastrar novo treinamento" type="button" onClick={newTreinament} className="p-button-success" />
                </Panel>
            }
            {!list &&
                <div className="card card-w-title">
                    <h1>Novo Treinamento</h1>
                    <form onSubmit={saveEvent}>
                        <div className="p-grid">
                            <div className="p-md-6">
                                <InputText type="text" required defaultValue={event.local} onChange={e => onChange("local", e.target.value)} placeholder="Local" />
                            </div>
                            <div className="p-md-6">
                                <Calendar placeholder="Data" dateFormat="dd/mm/yyyy" viewDate={new Date()} value={event.date} onChange={e => onChange("date", e.target.value)}></Calendar>
                            </div>
                            <div className="p-md-6">
                                <InputMask required mask="99:99" value={event.start} onChange={e => onChange("start", e.target.value)} placeholder="Horário de início" />
                            </div>
                            <div className="p-md-6">
                                <InputMask required mask="99:99" value={event.end} onChange={e => onChange("end", e.target.value)} placeholder="Horário de término" />
                            </div>
                        </div>
                        <Button label="Salvar dados do treinamento" type="submit" className="p-button-success" />
                    </form>
                    <hr/>
                    <form onSubmit={saveActivity}>
                        <div className="card card-w-title">
                            <h2>Atividades</h2>
                            {event.activities && event.activities.length>0 &&
                                <DataTable value={event.activities} className="p-datatable-borderless" style={{ marginBottom: '20px' }} responsive={true}
                                    selectionMode="single">
                                    <Column field="activity" header="Atividade" sortable={true} />
                                    <Column field="duration" header="Duração" sortable={true} />
                                    <Column field="repetition" header="Repetição" sortable={true} />
                                    <Column field="position" header="Posição" sortable={true} />
                                    <Column field="note" header="Observação" sortable={true} />
                                    <Column body={actionButton} />
                                </DataTable>
                            }
                            {newActivity &&
                                <div>
                                    <div className="p-grid">
                                        <div className="p-md-6">
                                            <Dropdown options={activities} required value={newActivity.activity} onChange={e => changeNewActivity("activity", e.target.value)} autoWidth={false} placeholder="Selecione a atividade" />
                                        </div>
                                        <div className="p-md-6">
                                            <InputText type="number" required defaultValue={newActivity.duration} onChange={e => changeNewActivity("duration", e.target.value)} placeholder="Duração em minutos" />
                                        </div>
                                        <div className="p-md-6">
                                            <InputText type="number" required defaultValue={newActivity.repetition} onChange={e => changeNewActivity("repetition", e.target.value)} placeholder="Repetição" />
                                        </div>
                                        <div className="p-md-6">
                                            <Dropdown options={positions} required value={newActivity.position} onChange={e => changeNewActivity("position", e.target.value)} autoWidth={false} placeholder="Selecione a posição" />
                                        </div>
                                        <div className="p-md-6">
                                            <InputTextarea rows={5} cols={30} defaultValue={newActivity.note} onChange={e => changeNewActivity("note", e.target.value)} autoResize={true} placeholder="Observações" />
                                        </div>
                                    </div>
                                    <Button label="Salvar Atividade" type="submit" className="p-button-success" />
                                </div>
                            }
                            {newActivity == false && 
                                <div>
                                    <Button label="Adicionar Atividade" onClick={() => setNewActivity({})} type="button" className="p-button-success" />
                                </div>
                            }
                        </div>
                    </form>
                </div>
            }
        </div>
    )
}
export default Schedule;