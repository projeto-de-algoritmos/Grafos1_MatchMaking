import React, { useEffect } from 'react';
import './App.css';
import { games } from './Games';
import { insertGraph, search } from './Graph';
import ReactLoading from 'react-loading';
interface IResult {
  name: string;
  adjacents: string[];
  nodeType: string;
};

function App() {
  const [playerName, setPlayerName] = React.useState<string>("");
  const [selectedGame, setSelectedGame] = React.useState<number>(0);
  const [extraFieldsValues, setExtraFieldsValues] = React.useState<any>({});
  const [results, setResults] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);

  const handlePlayer = (e: React.FormEvent<HTMLInputElement>) => {
    setPlayerName(e.currentTarget.value);
  };

  const handleGame = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGame(Number.parseInt(e.currentTarget.value, 10));
  };

  const handleExtraFieldsValues = (key: string, value: string) => {
    setExtraFieldsValues((current: any) => {
      let newValue: any = {}
      newValue[key] = value;
      return Object.assign(current, newValue);
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // NOME DO JOGO SEM ESPAÇOS
    const game = games[selectedGame].name.replaceAll(" ", "");
    // EXTRA FIELDS QUE O JOGO POSSUI
    const gameExtraFields = games[selectedGame].extraFields; 
    // EXTRA FIELDS SELECIONADOS PELO JOGADOR
    const extraFields: string[] = Object.values(extraFieldsValues);
    // PARAMETROS DE BUSCA
    const searchParams: any = Object.keys(extraFieldsValues).map((field) => {
      if (gameExtraFields[field].equal) {
        return extraFieldsValues[field];
      } else {
        return gameExtraFields[field].data.filter((a: string) => a !== extraFieldsValues[field]);
      }
    });
    // MAXIMO DE JOGADORES POR TIME
    const maxPlayers = games[selectedGame].data.maxPlayers;
    setLoading(true);
    const currentPlayer = insertGraph(game, playerName, extraFields, 'player');
    let team: any[] = [currentPlayer];
    let searchResults = search(game, searchParams, playerName);
    team = team.concat(searchResults);
    if (team.length !== maxPlayers) {
      const intervalId = setInterval(() => {
        searchResults = search(game, searchParams, playerName);
        team = team.concat(searchResults);
        if (team.length === maxPlayers) {
          clearInterval(intervalId);
          setResults(team);
          setLoading(false);
        }
      }, 3000);
    } else {
      setResults(team);
      setLoading(false);
    }
  };

  useEffect(() => {
    setResults(null);
    setExtraFieldsValues({});
  }, [selectedGame]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Grafo 1 - Match Making</h1>
      </header>
      <div className="App-container">
        <form className="matchmaking-form" onSubmit={handleSubmit}>
          {/* PLAYER NAME */}
          <label htmlFor="user-nick">Jogador:</label>
          <input
            type="text"
            className="user-input"
            value={playerName}
            onChange={handlePlayer}
            required
            disabled={loading}
            maxLength={games[selectedGame].data.playerNameMaxLength}
            minLength={games[selectedGame].data.playerNameMinLength}
          />
          {/* JOGO */}
          <label htmlFor="game">Jogo:</label>
          <select className="user-input" value={selectedGame} onChange={handleGame} disabled={loading} required>
            {games.map((game, index: number) => (
              <option key={index} value={index}>{game.name}</option>
            ))}
          </select>
          {/* CAMPOS EXTRAS */}
          {Object.getOwnPropertyNames(games[selectedGame].extraFields).map((field, idx) => {
            return (
              <div key={idx}>
                <label htmlFor={`${field}-input`} style={{ display: 'inherit' }}>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
                <select
                  id={`${field}-input`}
                  required
                  className="user-input"
                  onChange={(e) => handleExtraFieldsValues(field, e.target.value)}
                  disabled={loading}
                >
                  <option value=""></option>
                  {games[selectedGame].extraFields[field].data.map((fieldValue: string, idx: number) => (
                    <option key={idx} value={fieldValue}>
                      {fieldValue}
                    </option>
                  ))}
                </select>
              </div>
            )
          })}
          {loading ? (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column-reverse",
              }}
            >
              Procurando jogadores
              <ReactLoading type="balls" color="blue" height={'20%'} width={'20%'} />
            </span>
          ) : (
            <button type="submit" className="submit-button">
              Procurar Jogadores
            </button>
          )}
        </form>
        <div className='table-container'>
          {results ? (
            <div style={{ width: '100%', textAlign: 'left' }}>
              <h3 style={{ margin: "0.5rem 0" }}>Time encontrado:</h3>
              <table>
                <thead>
                  <tr>
                    <th>Jogo</th>
                    <th>Jogador</th>
                    {Object.getOwnPropertyNames(games[selectedGame].extraFields).map((columnName, index) => (
                      <th key={index}>{columnName.charAt(0).toUpperCase() + columnName.slice(1)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results.map((result: IResult, idx: number) => (
                    <tr key={idx}>
                      <td>{games[selectedGame].name}</td>
                      <td>{result.name}</td>
                      {result.adjacents.map((columnValue, index) => (
                        <td key={index}>{columnValue}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      </div>
      <footer></footer>
    </div>
  );
}

export default App;
