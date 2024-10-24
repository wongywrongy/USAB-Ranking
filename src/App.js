import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlayerList from './PlayerList';
import PlayerDetail from './PlayerDetail';
import './global.css';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PlayerList />} />
                <Route path="/player/:id" element={<PlayerDetail />} />
            </Routes>
        </Router>
    );
}

export default App;