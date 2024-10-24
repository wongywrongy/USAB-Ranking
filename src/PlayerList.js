import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import finalPlayerData from './data/finalPlayerData'; // Ensure this path is correct
import allPlayerData from './data/allPlayerData'; // Ensure this path is correct
import './PlayerList.css'; // Import specific styles for PlayerList

function PlayerList() {
    const eventTypes = ['BD', 'BS', 'GS', 'GD', 'XD'];
    const ageGroups = ['U11', 'U13', 'U15', 'U17', 'U19'];

    const [selectedEvent, setSelectedEvent] = useState(eventTypes[0]);
    const [selectedAgeGroup, setSelectedAgeGroup] = useState(ageGroups[0]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [suggestedTabs, setSuggestedTabs] = useState([]);

    // Initialize filtered data based on selected tab
    useEffect(() => {
        updateFilteredData();
    }, [selectedEvent, selectedAgeGroup]);

    // Debounce function to delay search execution
    const debounce = (func, delay) => {
        let debounceTimer;
        return function (...args) {
            const context = this;
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(context, args), delay);
        };
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        debounceSearch(event.target.value);
    };

    const debounceSearch = debounce((term) => {
        if (term.length < 3) {
            updateFilteredData(); // Reset to default list if search term is less than 3 characters
            return;
        }

        const terms = term.toLowerCase().split(' ').filter(Boolean);

        // Filter data based on search term across all categories by name or PlayerID
        const filtered = allPlayerData.filter(player =>
            terms.every(t =>
                player.FirstName.toLowerCase().includes(t) ||
                player.LastName.toLowerCase().includes(t) ||
                player.PlayerID.toString().includes(t)
            )
        );

        // Remove duplicates based on PlayerID
        const uniqueFiltered = Array.from(new Set(filtered.map(player => player.PlayerID)))
            .map(id => filtered.find(player => player.PlayerID === id));

        setFilteredData(uniqueFiltered);
    }, 300); // 300ms delay for debounce

    const updateFilteredData = () => {
        // Filter data based on selected event and age group
        const defaultFilteredData = finalPlayerData.filter(player =>
            player["Event Name"].startsWith(selectedEvent) &&
            player["Event Name"].endsWith(selectedAgeGroup)
        ).sort((a, b) => a.Rank - b.Rank);

        setFilteredData(defaultFilteredData);
    };

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
                        onChange={handleSearchChange}
                        className="search-bar"
                    />
                    <span className="last-updated">Last Updated 9/1/2024</span>
                </div>
                <div className="list-container">
                    {filteredData.length > 0 ? (
                        filteredData.map((player, index) => (
                            <Link to={`/player/${player.PlayerID}`} key={`${player.PlayerID}-${index}`} className="player-card">
                                {!searchTerm && (
                                    <>
                                        <div className="rank-number">{player.Rank}</div>
                                        <div className="card-content">
                                            <h3>
                                                <strong>{player.FirstName} {player.LastName}</strong> 
                                                <span className="player-id"> ({player.PlayerID})</span>
                                            </h3>
                                            <p><strong>Event:</strong> {player["Event Name"]}</p>
                                            {'Total Points' in player && 'Junior National Points' in player && (
                                                <p><strong>Total Points:</strong> {player["Total Points"]}&emsp;<strong>Junior National Points:</strong> {player["Junior National Points"]}</p>
                                            )}
                                        </div>
                                    </>
                                )}
                                {searchTerm && (
                                    <>
                                        {/* Display only names and PlayerID for search results */}
                                        <div className="card-content">
                                            <h3>
                                                <strong>{player.FirstName} {player.LastName}</strong> 
                                                <span className="player-id"> ({player.PlayerID})</span>
                                            </h3>
                                        </div>
                                    </>
                                )}
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