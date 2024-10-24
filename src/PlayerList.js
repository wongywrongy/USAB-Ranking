import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import finalPlayerData from './data/finalPlayerData'; // Ensure this path is correct
import './PlayerList.css'; // Import specific styles for PlayerList

function PlayerList() {
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

    // Filter and sort data based on selected event, age group, and search terms
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
    useEffect(() => {
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
                <h1>USA Badminton Rankings</h1>
                <div className="tab-container">
                    {eventTypes.map(event => (
                        <button
                            key={event}
                            className={selectedEvent === event ? 'active-tab' : ''}
                            onClick={() => setSelectedEvent(event)}
                        >
                            {event}
                        </button>
                    ))}
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
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search by name or PlayerID"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="search-bar"
                    />
                    <span className="last-updated">Last Updated 9/1/2024</span>
                </div>
                {suggestedTabs.length > 0 && (
                    <p className="suggestion">
                        Try switching to:{" "}
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
                            <Link to={`/player/${player.PlayerID}`} key={player.PlayerID} className="player-card">
                                <div className="rank-number">{player.Rank}</div>
                                <div className="card-content">
                                    <h3>
                                        <strong>{player.FirstName} {player.LastName}</strong> 
                                        <span className="player-id"> ({player.PlayerID})</span>
                                    </h3>
                                    <p><strong>Total Points:</strong> {player["Total Points"]}&emsp;<strong>Junior National Points:</strong> {player["Junior National Points"]}</p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p>No players found.</p>
                    )}
                </div>
            </header>
        </div>
    );
}

export default PlayerList;