import React, { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlayerList from './PlayerList';
import PlayerDetail from './PlayerDetail';
import './global.css';
import './App.css';

function App() {
  useEffect(() => {
    ReactGA.initialize('G-0VCWTCXJHT');
  }, []);
  
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