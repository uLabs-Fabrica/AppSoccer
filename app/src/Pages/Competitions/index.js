import React, { useState } from 'react';
import { DataTable } from 'primereact/components/datatable/DataTable';
import { Column } from 'primereact/components/column/Column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import moment from 'moment/moment';
function Competitions() {
    const [competition, setCompetition] = useState();
    const [competitions] = useState([
        {name:"Competição1",games:[
            {goalsTeam:5, goalsRival:7,rain:"Não",duration:45,note:"Nenhuma observação", players:[
                { name: "Arthur", time: "30:11", completeCorrect: 5, completeWrong: 1, completeGoals: 1, passWrong: 10, passCorrect: 20, penaltySuffered: 2, penaltyCommitted: 7, penaltyGoal: 0, cornerKick: 4, cornerGoal: 0, assitence: "Não", individualPlay: 2, individualGoal: 1, faultCommitted: 4, faultSuffered:5}
            ]
        }]}
    ])
    const [game, setGame]= useState(null);
    const [player, setPlayer] = useState(null);
    const [players] = useState([
        {label:"João", value:"João"}
    ])
    const selectedCompetitions = (row)=>{
        console.log(row);
        setCompetition(row);
    }
    const saveGame = () =>{

    }
    const onChange = (ref, value) => {
        if (ref === "date") {
            value = moment(value).format("DD/MM/YYYY");
        }
        if (ref === 'assistence'){
            if(game[ref]){
                game[ref] = false;
            }else{
                game[ref] = true;
            }
        }
        game[ref] = value;
        setGame(game);
    }
    const savePlayer = () =>{
        setPlayer(null);
    }
    return (
        <div>
            <DataTable header="Competições" value={competitions} className="p-datatable-borderless" style={{ marginBottom: '20px' }} responsive={true} selectionMode="single" onSelectionChange={e => selectedCompetitions(e.value)}>
                <Column field="name" header="Competição" sortable={true} />
            </DataTable>
            {competition &&
                <div>
                    <DataTable header="Jogos" value={competition.games} className="p-datatable-borderless" style={{ marginBottom: '20px' }} responsive={true} selectionMode="single">
                        <Column field="goalsTeam" header="Gols da equipe" sortable={true} />
                        <Column field="goalsRival" header="Gols do adversário" sortable={true} />
                        <Column field="rain" header="Chuva" sortable={true} />
                        <Column field="duration" header="Duração do jogo" sortable={true} />
                        <Column field="note" header="Observações" sortable={true} />
                    </DataTable>
                    {!game &&
                        <Button label="Novo jogo" type="button" className="p-button-success" onClick={()=>{setGame({})}}/>
                    }
                </div>
            }
            {game &&
                <div>
                    <h2>Novo Jogo</h2>
                    <form onSubmit={saveGame}>
                        <div className="p-grid">
                            <div className="p-md-6">
                                <InputText type="number" required defaultValue={game.goalsTeam} onChange={e => onChange("goalsTeam", e.target.value)} placeholder="Gols da Equipe" />
                            </div>
                            <div className="p-md-6">
                                <InputText type="number" required defaultValue={game.goalsRival} onChange={e => onChange("goalsRival", e.target.value)} placeholder="Gols do Adversário" />
                            </div>
                            <div className="p-md-6">
                                <Checkbox inputId="stadium" onChange={e => onChange("goalsRival", e.target.value)} checked={game.rain}></Checkbox>
                                <label htmlFor="stadium" className="p-checkbox-label">Chuva?</label>
                            </div>
                            <div className="p-md-6">
                                <InputMask required mask="99:99" value={game.start} onChange={e => onChange("start", e.target.value)} placeholder="Duração do jogo" />
                            </div>
                            <div className="p-md-6">
                                <InputTextarea rows={5} cols={30} defaultValue={game.note} onChange={e => onChange("note", e.target.value)} autoResize={true} placeholder="Observações" />
                            </div>
                        </div>
                        {player &&
                            <div>
                                <h2>Novo Jogador</h2>
                                <div className="p-grid">
                                    <div className="p-md-6">
                                        <Dropdown value={player.player} options={players} autoWidth={false} placeholder="Selecione um Jogador" onChange={e => onChange("player", e.target.value)} />
                                    </div>
                                    <div className="p-md-6">
                                        <InputMask required mask="99:99" value={player.time} onChange={e => onChange("time", e.target.value)} placeholder="Tempo em jogo" />
                                    </div>
                                    <div className="p-md-6">
                                        <InputText type="number" required defaultValue={player.completeWrong} onChange={e => onChange("completeWrong", e.target.value)} placeholder="Finalizações erradas" />
                                    </div>
                                    <div className="p-md-6">
                                        <InputText type="number" required defaultValue={player.completeCorrect} onChange={e => onChange("completeCorrect", e.target.value)} placeholder="Finalizações corretas" />
                                    </div>
                                    <div className="p-md-6">
                                        <InputText type="number" required defaultValue={player.completeGoals} onChange={e => onChange("completeGoals", e.target.value)} placeholder="Finalizações com gol" />
                                    </div>
                                    <div className="p-md-6">
                                        <InputText type="number" required defaultValue={player.passWrong} onChange={e => onChange("passWrong", e.target.value)} placeholder="Passe errado" />
                                    </div>
                                    <div className="p-md-6">
                                        <InputText type="number" required defaultValue={player.passCorrect} onChange={e => onChange("passCorrect", e.target.value)} placeholder="Passe correto" />
                                    </div>
                                    <div className="p-md-6">
                                        <InputText type="number" required defaultValue={player.penaltySuffered} onChange={e => onChange("penaltySuffered", e.target.value)} placeholder="Penalty sofrido" />
                                    </div>
                                    <div className="p-md-6">
                                        <InputText type="number" required defaultValue={player.penaltyCommitted} onChange={e => onChange("penaltyCommitted", e.target.value)} placeholder="Penalty cometido" />
                                    </div>
                                    <div className="p-md-6">
                                        <InputText type="number" required defaultValue={player.penaltyGoal} onChange={e => onChange("penaltyGoal", e.target.value)} placeholder="Penalty sofrido com gol" />
                                    </div>
                                    <div className="p-md-6">
                                        <InputText type="number" required defaultValue={player.cornerKick} onChange={e => onChange("cornerKick", e.target.value)} placeholder="Escanteio cobrado" />
                                    </div>
                                    <div className="p-md-6">
                                        <InputText type="number" required defaultValue={player.cornerGoal} onChange={e => onChange("cornerGoal", e.target.value)} placeholder="escanteio cobrado com gol" />
                                    </div>
                                    <div className="p-md-6">
                                        <InputText type="number" required defaultValue={player.individualPlay} onChange={e => onChange("individualPlay", e.target.value)} placeholder="Jogada individual" />
                                    </div>
                                    <div className="p-md-6">
                                        <InputText type="number" required defaultValue={player.individualGoal} onChange={e => onChange("individualGoal", e.target.value)} placeholder="Jogada individual com gol" />
                                    </div>
                                    <div className="p-md-6">
                                        <InputText type="number" required defaultValue={player.faultCommitted} onChange={e => onChange("faultCommitted", e.target.value)} placeholder="Faltas cometidas" />
                                    </div>
                                    <div className="p-md-6">
                                        <InputText type="number" required defaultValue={player.faultSuffered} onChange={e => onChange("faultSuffered", e.target.value)} placeholder="Faltas sofridas" />
                                    </div>
                                    <div className="p-md-6">
                                        <InputTextarea rows={5} cols={30} defaultValue={player.note} onChange={e => onChange("note", e.target.value)} autoResize={true} placeholder="Observações" />
                                    </div>
                                    <div className="p-md-6">
                                        <Checkbox inputId="assitence" onChange={e => onChange('assitence')} checked={player.assitence}></Checkbox>
                                        <label htmlFor="assitence" className="p-checkbox-label">Assistência</label>
                                    </div>
                                    <Button label="Salvar jogador" type="button" onClick={() => { savePlayer() }} className="p-button-success" />
                                </div>
                            </div>
                        }
                        {!player &&
                            <Button label="Adicionar jogador" type="button" onClick={() => {setPlayer({})}}className="p-button-success" />
                        }
                        
                        <br/>
                        <br/>
                        <Button label="Salvar jogo" type="submit" className="p-button-success" />
                    </form>
                </div>
            }
        </div>
    )
}
export default Competitions;