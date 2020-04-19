import React, { useState } from 'react';
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
import { InputTextarea } from 'primereact/inputtextarea';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MultiSelect } from 'primereact/multiselect';
import { Checkbox } from 'primereact/checkbox';

function Games() {
    const [list, setList] = useState(true);
    const [game, setGame] = useState({transports:{}, materials:[]});
    const [teams] = useState([
        { "label": "Equipe1", "value": "Equipe1" },
        { "label": "Equipe2", "value": "Equipe2" }
    ]);
    const [materials] = useState([
        { "label": "Material1", "value": "Material1" },
        { "label": "Material2", "value": "Material2" }
    ]);
    const [directions] = useState([
        { "label": "Diretoria1", "value": "Diretoria1" },
        { "label": "Diretoria2", "value": "Diretoria2" }
    ])
    const [comissions] = useState([
        { "label": "Comissão Técnica1", "value": "Comissão Técnica1" },
        { "label": "Comissão Técnica2", "value": "Comissão Técnica2" }
    ])
    const [players] = useState([
        { "label": "Daniel", "value": "Daniel" },
        { "label": "Matheus", "value": "Matheus" }
    ]);
    const eventClick = (date) => {
        let game = events.filter((item) => {
            if (item.id == date.event.id) {
                return true;
            }
        })
        game[0].date = moment(game[0].date).format("DD/MM/YYYY");
        setGame(game[0]);
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
        eventClick: eventClick
    })
    const [events] = useState([
        // {
        //     "id": 2,
        //     "title": "Clube 04",
        //     "start": "2020-04-12 16:00:00",
        //     "end": "2020-04-12 18:00:00",
        //     "local": "Clube 04",
        //     "date": "2020-04-14"
        // }
    ])
    const newGame = () => {
        setList(false);
        setGame({transports:{}, materials:[]});
    }
    const onChange = (ref, value) => {
        if (ref === "date") {
            value = moment(value).format("DD/MM/YYYY");
        }
        game[ref] = value;
        setGame(game);
    }
    const saveGame = (e) => {
        e.preventDefault();
        setList(true);
        setGame({ transports: {}, materials: [] });
    }
    const checkTransport = (ref,value) =>{
        if (!game['transports'][ref]) {
            game['transports'][ref] = value;
        } else {
            game['transports'][ref] = false;
        }
        setGame(game);
    }
    const addMaterial = () =>{
        console.log(game);
        game.materials.push({material:game.material, quant:game.quant});
        setGame(game);
        console.log(game);
    }
    const removeMaterial = (material) => {
        console.log(game);
        game.materials = game.materials.filter((item)=>{
            if(item != material){
                return true;
            }
        });
        setGame(game);
    }
    return (
        <div>
            {list &&
                <Panel header="Jogos">
                    <FullCalendar events={events} options={fullcalendarOptions} />
                    <Button label="Cadastrar novo jogo" type="button" onClick={newGame} className="p-button-success" />
                </Panel>
            }
            {!list &&
                <div className="card card-w-title">
                    <h1>Novo Jogo</h1>
                    <form onSubmit={saveGame}>
                        <div className="p-grid">
                            <div className="p-md-6">
                                <InputText type="text" required defaultValue={game.local} onChange={e => onChange("local", e.target.value)} placeholder="Local" />
                            </div>
                            <div className="p-md-6">
                                <Calendar placeholder="Data" dateFormat="dd/mm/yyyy" viewDate={new Date()} value={game.date} onChange={e => onChange("date", e.target.value)}></Calendar>
                            </div>
                            <div className="p-md-6">
                                <InputMask required mask="99:99" value={game.start} onChange={e => onChange("start", e.target.value)} placeholder="Horário de início" />
                            </div>
                            <div className="p-md-6">
                                <InputMask required mask="99:99" value={game.end} onChange={e => onChange("end", e.target.value)} placeholder="Horário de término" />
                            </div>
                            <div className="p-md-6">
                                <InputText type="text" required defaultValue={game.competition} onChange={e => onChange("competition", e.target.value)} placeholder="Competição" />
                            </div>
                            <div className="p-md-6">
                                <InputText type="text" required defaultValue={game.company} onChange={e => onChange("company", e.target.value)} placeholder="Transportadora" />
                            </div>
                            <div className="p-md-6">
                                <Dropdown options={teams} required value={game.
                                adversary} onChange={e => onChange("adversary", e.target.value)} autoWidth={false} placeholder="Adversário" />
                            </div>
                            <div className="p-md-6">
                                <Dropdown options={teams} required value={game.
                                    master} onChange={e => onChange("master", e.target.value)} autoWidth={false} placeholder="Mandante" />
                            </div>
                            <div className="p-md-6">
                                <InputText type="text" required defaultValue={game.step} onChange={e => onChange("step", e.target.value)} placeholder="Fase" />
                            </div>
                            <div className="p-md-6">
                                <InputText type="text" required defaultValue={game.round} onChange={e => onChange("round", e.target.value)} placeholder="Rodada" />
                            </div>
                            <div className="p-md-6">
                                <InputTextarea rows={5} cols={30} defaultValue={game.note} onChange={e => onChange("note", e.target.value)} autoResize={true} placeholder="Observações" />
                            </div>
                            <div className="p-md-6">
                                <MultiSelect placeholder="Jogadores" value={game.players} options={players} onChange={e => onChange("players", e.value)} />
                            </div>
                            <div className="p-md-6">
                                <MultiSelect placeholder="Comissão técnica" value={game.comissions} options={comissions} onChange={e => onChange("comissions", e.value)} />
                            </div>
                            <div className="p-md-6">
                                <MultiSelect placeholder="Diretoria" value={game.directions} options={directions} onChange={e => onChange("directions", e.value)}/>
                            </div>
                            <div className="p-md-6">
                                <ul>
                                    {game.materials.map((item) =>
                                        <li>
                                            <p>{item.material} Quant:{item.quant} <Button type="button" className="p-button-danger" icon="pi pi-times" onClick={() =>{removeMaterial(item)}}/></p>
                                        </li>
                                    )}
                                </ul>
                                <Dropdown options={materials} value={game.
                                    material} onChange={e => onChange("material", e.target.value)} autoWidth={false} placeholder="Insumo" />
                                <br/>
                                <InputText type="number" defaultValue={game.quant} onChange={e => onChange("quant", e.target.value)} placeholder="Quantidade" />
                                <Button label="Adicionar Insumo" type="button" className="p-button-success" onClick={()=>{addMaterial()}}/>
                            </div>
                            <div className="p-md-6">
                                <h3>Tipo de transporte</h3>
                                <ul>
                                    <li>
                                        <Checkbox inputId="bus" onChange={e => checkTransport('bus', 'Ônibus')} checked={game.transports.bus}></Checkbox>
                                        <label htmlFor="bus" className="p-checkbox-label">Ônibus</label>
                                    </li>
                                    <li>
                                        <Checkbox inputId="car" onChange={e => checkTransport('car', 'Carro')} checked={game.transports.car}></Checkbox>
                                        <label htmlFor="car" className="p-checkbox-label">Carro</label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <Button label="Salvar dados do treinamento" type="submit" className="p-button-success" />
                    </form>
                </div>
            }
        </div>
    )
}
export default Games;