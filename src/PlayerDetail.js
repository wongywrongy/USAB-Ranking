import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import allPlayerData from './data/allPlayerData'; // Ensure this path is correct
import './PlayerDetail.css'; // Import specific styles for PlayerDetail

function PlayerDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [playerDetails, setPlayerDetails] = useState([]);

    useEffect(() => {
        // Filter player data based on PlayerID
        const details = allPlayerData.filter(player => player.PlayerID.toString() === id);
        setPlayerDetails(details);
    }, [id]);

    if (playerDetails.length === 0) {
        return <p>No details available for this player.</p>;
    }

    const playerName = `${playerDetails[0].FirstName} ${playerDetails[0].LastName}`;

    // Aggregate event data
    const eventData = {};
    playerDetails.forEach(entry => {
        if (!eventData[entry["Event Name"]]) {
            eventData[entry["Event Name"]] = {
                totalPoints: 0,
                juniorNationalPoints: 0,
                rank: entry["Finishing Position"]
            };
        }
        eventData[entry["Event Name"]].totalPoints += entry["Finishing Position Points"];
        if (entry["Tournament Type"] === "Junior National") {
            eventData[entry["Event Name"]].juniorNationalPoints += entry["Finishing Position Points"];
        }
    });

    // Group tournaments by tournament name
    const tournaments = playerDetails.reduce((acc, entry) => {
        if (!acc[entry["Tournament Name"]]) {
            acc[entry["Tournament Name"]] = [];
        }
        acc[entry["Tournament Name"]].push(entry);
        return acc;
    }, {});

    return (
        <div className="player-detail-container">
            <button onClick={() => navigate(-1)} className="back-button">Back</button>
            <h1>{playerName}</h1>
            <h2>Events:</h2>
            <div className="events-grid">
                {Object.entries(eventData).map(([eventName, data], index) => (
                    <div key={index} className="event-entry">
                        <p><strong>{eventName}</strong></p>
                        <p>Total Points: {data.totalPoints}</p>
                        <p>Junior National Points: {data.juniorNationalPoints}</p>
                        <p>Rank: {data.rank}</p>
                    </div>
                ))}
            </div>
            <h2>Tournaments:</h2>
            {Object.entries(tournaments).map(([tournamentName, entries], index) => (
                <div key={index} className="tournament-entry">
                    <p><strong>{tournamentName}</strong></p>
                    {entries.map((entry, idx) => (
                        <p key={idx}><strong>{entry["Event Name"]}</strong>, Position: {entry["Finishing Position"]}, Points: {entry["Finishing Position Points"]}</p>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default PlayerDetail;