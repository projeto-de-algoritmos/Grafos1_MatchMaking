import React, { useEffect } from 'react';
import './App.css';
import { games } from './Games';
import { insertGraph, search } from './Graph';
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
    if (playerName) {
      setPlayerName("");
      insertGraph(
        games[selectedGame].name.replaceAll(" ", ""),
        playerName,
        Object.values(extraFieldsValues),
        'player'
      )
    } else {
      setResults(search(
        games[selectedGame].name.replaceAll(" ", ""),
        Object.values(extraFieldsValues),
        playerName
      ));
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
            maxLength={games[selectedGame].data.playerNameMaxLength}
            minLength={games[selectedGame].data.playerNameMinLength}
          />
          {/* JOGO */}
          <label htmlFor="game">Jogo:</label>
          <select className="user-input" value={selectedGame} onChange={handleGame}>
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
                  className="user-input"
                  onChange={(e) => handleExtraFieldsValues(field, e.target.value)}
                >
                  <option value=""></option>
                  {games[selectedGame].extraFields[field].map((fieldValue: string, idx: number) => (
                    <option key={idx} value={fieldValue}>{fieldValue}</option>
                  ))}
                </select>
              </div>
            )
          })}
          <button type="submit" className="submit-button">
            {playerName ? "Adicionar" : "Buscar"}
          </button>
        </form>
        <div className='search-result-table'>
          {results ? (
            <>
              {results.length ? (
                <div style={{ width: '100%', textAlign: 'left' }}>
                  <h3 style={{ margin: "0.5rem 0" }}>Resultados:</h3>
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
                      {results.map((result: IResult, idx: number) => {
                        return (
                          <tr key={idx}>
                            <td>{games[selectedGame].name}</td>
                            <td>{result.name}</td>
                            {result.adjacents.map((columnValue, index) => (
                              <td key={index}>{columnValue}</td>
                            ))}
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>Nenhum jogador encontrado =(</p>
              )}
            </>
          ) : null}
        </div>
      </div>
      <footer></footer>
    </div>
  );
}

export default App;
