import React from 'react';
import './App.css';

function App() {
  const [playerName, setPlayerName] = React.useState<string>("");
  const [selectedGame, setSelectedGame] = React.useState<string>("");
  const [selectedRegion, setSelectedRegion] = React.useState<string>("");
  const [selectedLevel, setSelectedLevel] = React.useState<string>("");

  const handlePlayer = (e: React.FormEvent<HTMLInputElement>) => {
    setPlayerName(e.currentTarget.value);
  };

  const handleGame = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGame(e.currentTarget.value);
  };

  const handleRegion = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(e.currentTarget.value);
  }

  const handleLevel = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLevel(e.currentTarget.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Grafo 1 - Match Making</h1>
      </header>
      <div className="App-container">
        <form className="matchmaking-form" onSubmit={handleSubmit}>
          <label htmlFor="user-nick">Nick:</label>
          <input type="text" className="user-input" value={playerName} onChange={handlePlayer} />
          <label htmlFor="game">Região:</label>
          <select className="user-input" value={selectedRegion} onChange={handleRegion}>
          </select>
          <label htmlFor="game">Jogo:</label>
          <select className="user-input" value={selectedGame} onChange={handleGame}>
          </select>
          <label htmlFor="level">Level:</label>
          <select className="user-input" disabled={!selectedGame} value={selectedLevel} onChange={handleLevel}>
          </select>
          <button type="submit" className="submit-button">
            {playerName ? "Adicionar" : "Buscar"}
          </button>
        </form>
      </div>
      <footer></footer>
    </div>
  );
}

export default App;
