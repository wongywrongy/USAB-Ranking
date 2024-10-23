import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch data from JSON file
    fetch('/data/all_player_data.json')
      .then((response) => response.json())
      .then((data) => setPlayers(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const filteredPlayers = players.filter(
    (player) =>
      player.FirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.LastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>Player Rankings</h1>
        <input
          type="text"
          placeholder="Search players..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <table>
          <thead>
            <tr>
              <th>PlayerID</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Event Name</th>
              <th>Total Points</th>
              <th>Rank</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlayers.map((player) => (
              <tr key={player.PlayerID}>
                <td>{player.PlayerID}</td>
                <td>{player.FirstName}</td>
                <td>{player.LastName}</td>
                <td>{player["Event Name"]}</td>
                <td>{player["Total Points"] || 'N/A'}</td>
                <td>{player.Rank || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;