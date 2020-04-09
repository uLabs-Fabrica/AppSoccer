import React, { useContext, useState, useEffect } from 'react';
import { CarService } from '../../service/CarService';
import { Panel } from 'primereact/components/panel/Panel';
import { Checkbox } from 'primereact/components/checkbox/Checkbox';
import { Button } from 'primereact/components/button/Button';
import { Dropdown } from 'primereact/components/dropdown/Dropdown';
import { InputText } from 'primereact/components/inputtext/InputText';
import { InputTextarea } from 'primereact/components/inputtextarea/InputTextarea';
import { DataTable } from 'primereact/components/datatable/DataTable';
import { Column } from 'primereact/components/column/Column';
import { Chart } from 'primereact/chart';
import { ProgressBar } from 'primereact/progressbar';
import { Menu } from 'primereact/menu';
import { FullCalendar } from 'primereact/fullcalendar';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { getSession } from '../../service/AuthService';
import {useHistory} from 'react-router-dom';
import {UserContext} from '../../context/User';
export function Dashboard(props) {
    const history = useHistory();
    const { saveUser } = useContext(UserContext);
    const [tasks, setTasks] = useState([]);
    const [city, setCity] = useState(null);
    const [selectedCar, setSelectCar] = useState(null);
    const [fullcalendarOptions, setFullcalendarOptions] = useState({
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        defaultDate: '2017-02-01',
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        }
    })
    const [events, setEvents] = useState([
        {
            "id": 1,
            "title": "All Day Event",
            "start": "2017-02-01"
        },
        {
            "id": 2,
            "title": "Long Event",
            "start": "2017-02-07",
            "end": "2017-02-10"
        },
        {
            "id": 3,
            "title": "Repeating Event",
            "start": "2017-02-09T16:00:00"
        },
        {
            "id": 4,
            "title": "Repeating Event",
            "start": "2017-02-16T16:00:00"
        },
        {
            "id": 5,
            "title": "Conference",
            "start": "2017-02-11",
            "end": "2017-02-13"
        },
        {
            "id": 6,
            "title": "Meeting",
            "start": "2017-02-12T10:30:00",
            "end": "2017-02-12T12:30:00"
        },
        {
            "id": 7,
            "title": "Lunch",
            "start": "2017-02-12T12:00:00"
        },
        {
            "id": 8,
            "title": "Meeting",
            "start": "2017-02-12T14:30:00"
        },
        {
            "id": 9,
            "title": "Happy Hour",
            "start": "2017-02-12T17:30:00"
        },
        {
            "id": 10,
            "title": "Dinner",
            "start": "2017-02-12T20:00:00"
        },
        {
            "id": 11,
            "title": "Birthday Party",
            "start": "2017-02-13T07:00:00"
        },
        {
            "id": 12,
            "title": "Click for Google",
            "url": "http://google.com/",
            "start": "2017-02-28"
        }
    ])
    const [chartData, setChartData] = useState({
        labels: ['Setembro', 'Outubro', 'Novembro', 'Dezembro', 'Janeiro', 'Fevereiro', 'Março'],
        datasets: [
            {
                label: 'Treinos',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: '#03A9F4'
            },
            {
                label: 'Jogos',
                data: [28, 48, 40, 19, 86, 27, 90],
                fill: false,
                borderColor: '#6ebc3b'
            },
            {
                label: 'Cartões Amarelos',
                data: [5, 15, 7, 3, 9, 14, 15],
                fill: false,
                borderColor: '#FFC107'
            },
            {
                label: 'Cartões Vermelhos',
                data: [1, 0, 2, 1, 3, 0, 1],
                fill: false,
                borderColor: '#d66351'
            }
        ]
    })
    const [cars, setCars] = useState(
        [
            { "brand": "Volkswagen", "year": 2012, "color": "White", "vin": "dsad231ff" },
            { "brand": "Audi", "year": 2011, "color": "Black", "vin": "gwregre345" },
            { "brand": "Renault", "year": 2005, "color": "Gray", "vin": "h354htr" },
            { "brand": "BMW", "year": 2003, "color": "Blue", "vin": "j6w54qgh" },
            { "brand": "Mercedes", "year": 1995, "color": "White", "vin": "hrtwy34" },
            { "brand": "Volvo", "year": 2005, "color": "Black", "vin": "jejtyj" },
            { "brand": "Honda", "year": 2012, "color": "Yellow", "vin": "g43gr" },
            { "brand": "Jaguar", "year": 2013, "color": "White", "vin": "greg34" },
            { "brand": "Ford", "year": 2000, "color": "Black", "vin": "h54hw5" },
            { "brand": "Fiat", "year": 2013, "color": "Red", "vin": "245t2s" }
        ]
    )
    // useEffect(() => {
    //     getSession().then((user) => {
    //         saveUser(user);
    //     },(error)=>{
    //         history.push("/login");
    //     })
    // });
    return (
        <div className="p-grid dashboard">
            <div className="p-col-12 p-md-3">
                <div className="overview-box overview-box-1"><h1>TREINOS</h1>
                    <div className="overview-value">55</div>
                    <img src="assets/layout/images/dashboard/graph-blue.svg" alt="apollo-layout" />
                </div>
            </div>

            <div className="p-col-12 p-md-3">
                <div className="overview-box overview-box-2">
                    <h1>JOGOS</h1>
                    <div className="overview-value">20</div>
                    <img src="assets/layout/images/dashboard/graph-green.svg" alt="apollo-layout" />
                </div>
            </div>

            <div className="p-col-12 p-md-3">
                <div className="overview-box overview-box-3">
                    <h1>CARTÕES AMARELOS</h1>
                    <div className="overview-value">12</div>
                    <img src="assets/layout/images/dashboard/graph-yellow.svg" alt="apollo-layout" />
                </div>
            </div>

            <div className="p-col-12 p-md-3">
                <div className="overview-box overview-box-4">
                    <h1>CARTÕES VERMELHOS</h1>
                    <div className="overview-value">0</div>
                    <img src="assets/layout/images/dashboard/graph-red.svg" alt="apollo-layout" />
                </div>
            </div>

            <div className="p-col-12">
                <Panel header="Core 1 Data">
                    <Chart type="line" data={chartData} />
                </Panel>
            </div>

            <div className="p-md-6">
                <div className="sales-panel">
                    <div className="card">
                        <DataTable value={cars} className="p-datatable-borderless" style={{ marginBottom: '20px' }} responsive={true}
                            selectionMode="single" selection={selectedCar} onSelectionChange={(e) => this.setState({ selectedCar: e.value })}>
                            <Column field="vin" header="Vin" sortable={true} />
                            <Column field="year" header="Year" sortable={true} />
                            <Column field="brand" header="Brand" sortable={true} />
                            <Column field="color" header="Color" sortable={true} />
                        </DataTable>
                    </div>
                </div>
            </div>

            <div className="p-md-6">
                <Panel header="Calendar" style={{ height: '100%' }}>
                    <FullCalendar events={events} options={fullcalendarOptions} />
                </Panel>
            </div>
        </div>
    )
}
