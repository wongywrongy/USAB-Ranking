import React, { useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import finalPlayerData from './data/finalPlayerData';
import allPlayerData from './data/allPlayerData';
import './PlayerList.css';

function PlayerList() {
    const eventTypes = ['BD', 'BS', 'GS', 'GD', 'XD'];
    const ageGroups = ['U11', 'U13', 'U15', 'U17', 'U19'];

    const [selectedEvent, setSelectedEvent] = useState(eventTypes[0]);
    const [selectedAgeGroup, setSelectedAgeGroup] = useState(ageGroups[0]);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = useMemo(() => {
        if (searchTerm.length < 3) {
            return finalPlayerData.filter(player =>
                player["Event Name"].startsWith(selectedEvent) &&
                player["Event Name"].endsWith(selectedAgeGroup)
            ).sort((a, b) => a.Rank - b.Rank);
        }

        const terms = searchTerm.toLowerCase().split(' ').filter(Boolean);

        const filtered = allPlayerData.filter(player =>
            terms.every(t =>
                player.FirstName.toLowerCase().includes(t) ||
                player.LastName.toLowerCase().includes(t) ||
                player.PlayerID.toString().includes(t)
            )
        );

        return Array.from(new Set(filtered.map(player => player.PlayerID)))
            .map(id => filtered.find(player => player.PlayerID === id));
    }, [searchTerm, selectedEvent, selectedAgeGroup]);

    const debounce = useCallback((func, delay) => {
        let debounceTimer;
        return function (...args) {
            const context = this;
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(context, args), delay);
        };
    }, []);

    const debounceSearch = useMemo(() => debounce((term) => {
        setSearchTerm(term);
    }, 300), [debounce]);

    const handleSearchChange = useCallback((event) => {
        debounceSearch(event.target.value);
    }, [debounceSearch]);

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
                        onChange={handleSearchChange}
                        className="search-bar"
                    />
                    <span className="last-updated">Last Updated 9/1/2024</span>
                </div>
                <div className="list-container">
                    {filteredData.length > 0 ? (
                        filteredData.map((player, index) => (
                            <Link to={`/player/${player.PlayerID}`} key={`${player.PlayerID}-${index}`} className="player-card">
                                {searchTerm.length < 3 ? (
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
                                ) : (
                                    <div className="card-content">
                                        <h3>
                                            <strong>{player.FirstName} {player.LastName}</strong> 
                                            <span className="player-id"> ({player.PlayerID})</span>
                                        </h3>
                                    </div>
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

export default React.memo(PlayerList);
