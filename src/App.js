import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch data from JSON file located in the public directory
    fetch('data/finalPlayerData_2024-10-23.json')
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
        <h1>Final Player Rankings</h1>
        <input
          type="text"
          placeholder="Search players..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>PlayerID</th>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Event Name</th>
                <th>Total Points</th>
                <th>Junior National Points</th>
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
                  <td>{player["Junior National Points"] || 'N/A'}</td>
                  <td>{player.Rank || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </header>
    </div>
  );
}

export default App;