import React, { useState } from 'react';
import './App.css';
import finalPlayerData from './data/finalPlayerData'; // Ensure this path is correct

function App() {
  const eventTypes = ['BD', 'BS', 'GS', 'GD', 'XD'];
  const ageGroups = ['U11', 'U13', 'U15', 'U17', 'U19'];

  const [selectedEvent, setSelectedEvent] = useState(eventTypes[0]);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState(ageGroups[0]);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter data based on selected event, age group, and search term
  const filteredData = finalPlayerData
    .filter(player =>
      player["Event Name"].startsWith(selectedEvent) &&
      player["Event Name"].endsWith(selectedAgeGroup) &&
      (player.FirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
       player.LastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
       player.PlayerID.toString().includes(searchTerm))
    )
    .sort((a, b) => a.Rank - b.Rank); // Sort by rank in ascending order

  return (
    <div className="App">
      <header className="App-header">
        <h1>USA Badminton Rankings</h1>
        <div className="tabs">
          {eventTypes.map(event => (
            <button
              key={event}
              className={selectedEvent === event ? 'active-tab' : ''}
              onClick={() => setSelectedEvent(event)}
            >
              {event}
            </button>
          ))}
        </div>
        <div className="subtabs">
          {ageGroups.map(age => (
            <button
              key={age}
              className={selectedAgeGroup === age ? 'active-subtab' : ''}
              onClick={() => setSelectedAgeGroup(age)}
            >
              {age}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search by name or PlayerID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
        <div className="list-container">
          {filteredData.length > 0 ? (
            filteredData.map((player) => (
              <div key={player.PlayerID} className="player-card">
                <p><strong>PlayerID:</strong> {player.PlayerID}</p>
                <p><strong>Name:</strong> {player.FirstName} {player.LastName}</p>
                <p><strong>Event Name:</strong> {player["Event Name"]}</p>
                <p><strong>Total Points:</strong> {player["Total Points"]}</p>
                <p><strong>Junior National Points:</strong> {player["Junior National Points"]}</p>
                <p><strong>Rank:</strong> {player.Rank}</p>
              </div>
            ))
          ) : (
            <p>No players found.</p>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;