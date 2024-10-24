import React, { useState } from 'react';
import './App.css';
import finalPlayerData from './data/finalPlayerData'; // Ensure this path is correct

function App() {
  const eventTypes = ['BD', 'BS', 'GS', 'GD', 'XD'];
  const ageGroups = ['U11', 'U13', 'U15', 'U17', 'U19'];

  const [selectedEvent, setSelectedEvent] = useState(eventTypes[0]);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState(ageGroups[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestedTabs, setSuggestedTabs] = useState([]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const terms = searchTerm.toLowerCase().split(' ').filter(Boolean);

  // Filter data based on selected event, age group, and search terms
  const filteredData = finalPlayerData
    .filter(player =>
      player["Event Name"].startsWith(selectedEvent) &&
      player["Event Name"].endsWith(selectedAgeGroup) &&
      terms.every(t =>
        player.FirstName.toLowerCase().includes(t) ||
        player.LastName.toLowerCase().includes(t) ||
        player.PlayerID.toString().includes(t)
      )
    )
    .sort((a, b) => a.Rank - b.Rank); // Sort by rank in ascending order

  // Suggest other tabs if no results
  React.useEffect(() => {
    if (filteredData.length === 0 && searchTerm) {
      const suggestions = [];
      for (let event of eventTypes) {
        for (let age of ageGroups) {
          if (event === selectedEvent && age === selectedAgeGroup) continue;
          const alternativeData = finalPlayerData.filter(player =>
            player["Event Name"].startsWith(event) &&
            player["Event Name"].endsWith(age) &&
            terms.every(t =>
              player.FirstName.toLowerCase().includes(t) ||
              player.LastName.toLowerCase().includes(t) ||
              player.PlayerID.toString().includes(t)
            )
          );
          if (alternativeData.length > 0) {
            suggestions.push({ event, age });
          }
        }
      }
      setSuggestedTabs(suggestions);
    } else {
      setSuggestedTabs([]);
    }
  }, [filteredData, searchTerm, selectedEvent, selectedAgeGroup]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Final Player Rankings</h1>
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
          onChange={handleSearch}
          className="search-bar"
        />
        {suggestedTabs.length > 0 && (
          <p className="suggestion">
            try switching to:{" "}
            {suggestedTabs.map(({ event, age }, index) => (
              <span key={`${event}-${age}`}>
                <span
                  className="suggestion-link"
                  onClick={() => {
                    setSelectedEvent(event);
                    setSelectedAgeGroup(age);
                  }}
                >
                  {`${event} ${age}`}
                </span>
                {index < suggestedTabs.length - 1 ? ', ' : ''}
              </span>
            ))}
          </p>
        )}
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