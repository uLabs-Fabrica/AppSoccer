import React, { useContext, useCallback, useState, useEffect, useUpdate } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from "primereact/button";
//import "./style.css";
import { UserContext } from '../../context/User';
import { FileUpload } from 'primereact/fileupload';
import { InputMask } from 'primereact/inputmask';
import axios from 'axios';
import 'react-image-crop/dist/ReactCrop.css';
import Cropper from '../../components/Cropper';
import firebase from '../../config/Firebase';

import { FullCalendar } from 'primereact/fullcalendar';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBr from '@fullcalendar/core/locales/pt-br';
import { Panel } from 'primereact/components/panel/Panel';
import { Calendar } from 'primereact/calendar';
import moment from 'moment/moment';
import { Checkbox} from 'primereact/checkbox';

function Schedule() {
    const [list, setList] = useState(true);
    const [event, setEvent] = useState({});
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
    const [fullcalendarOptions, setFullcalendarOptions] = useState({
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
    const [events, setEvents] = useState([
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
    const saveEvent = (e) =>{
        e.preventDefault();
    }
    console.log(event)
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
                                <InputText required value = {event.local} onChange={e => onChange("local", e.target.value)} placeholder="Local" />
                            </div>
                            <div className="p-md-6">
                                <Calendar placeholder="Data" dateFormat="dd/mm/yyyy" viewDate={new Date()} value={event.date} onChange={e => onChange("date", e.target.value)}></Calendar>
                            </div>
                            <div className="p-md-6">
                                <InputMask required mask="99:99" value={event.start} onChange={e => onChange("start", e.target.value)} placeholder="Horário de início" />
                            </div>
                            <div className="p-md-6">
                                <InputMask required mask="99:99" value={event.start} onChange={e => onChange("start", e.target.value)} placeholder="Horário de término" />
                            </div>
                        </div>
                        <div className="card card-w-title">
                            <h2>Atividades</h2>
                            <div className="p-grid">
                                <div className="p-md-3">
                                    
                                </div>
                            </div>
                        </div>
                        <Button label="Salvar" type="submit" className="p-button-success" />
                    </form>
                </div>
            }
        </div>
    )
}
export default Schedule;