import React, { useEffect, Suspense, lazy } from 'react';
import ReactGA from 'react-ga4';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './global.css';
import './App.css';

const PlayerList = lazy(() => import('./PlayerList'));
const PlayerDetail = lazy(() => import('./PlayerDetail'));

function App() {
  useEffect(() => {
    ReactGA.initialize('G-0VCWTCXJHT');
  }, []);
  
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<PlayerList />} />
          <Route path="/player/:id" element={<PlayerDetail />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;