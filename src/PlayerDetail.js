import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import finalPlayerData from './data/finalPlayerData'; // Ensure this path is correct
import allPlayerData from './data/allPlayerData'; // Ensure this path is correct
import './global.css';
import './PlayerDetail.css';


function PlayerDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const playerEvents = finalPlayerData.filter(p => p.PlayerID.toString() === id);
    const player = playerEvents[0]; // Assuming at least one event exists for the player
    const tournaments = allPlayerData.filter(p => p.PlayerID.toString() === id);

    if (!player) {
        return <div>Player not found</div>;
    }

    // Group tournaments by their name
    const groupedTournaments = tournaments.reduce((acc, tournament) => {
        const tournamentName = tournament["Tournament Name"];
        if (!acc[tournamentName]) {
            acc[tournamentName] = [];
        }
        acc[tournamentName].push(tournament);
        return acc;
    }, {});

    return (
        <div className="App">
            <header className="App-header">
                <button onClick={() => navigate(-1)} className="back-button">Back</button>
                <h1>Player: {player.FirstName}, {player.LastName}, {player["Event Name"].split(' ')[1]}</h1>

                <h2>Events:</h2>
                {playerEvents.map(event => (
                    <div key={event["Event Name"]}>
                        {event["Event Name"]}, Total Points: {event["Total Points"]}, Junior National Points: {event["Junior National Points"]}, Rank: {event.Rank}
                    </div>
                ))}

                <h2>Tournaments:</h2>
                {Object.entries(groupedTournaments).map(([tournamentName, events]) => (
                    <div key={tournamentName}>
                        {tournamentName}:
                        <ul>
                            {events.map(event => (
                                <li key={event["Event Name"]}>
                                    {event["Event Name"]}, Position: {event["Finishing Position"]}, Points: {event["Finishing Position Points"]}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </header>
        </div>
    );
}

export default PlayerDetail;