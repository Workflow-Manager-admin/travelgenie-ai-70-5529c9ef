import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';
import './theme.css';
import HomePage from './pages/HomePage';
import ItineraryPage from './pages/ItineraryPage';
import WeatherPage from './pages/WeatherPage';
import ChatPage from './pages/ChatPage';

function App() {
  // PUBLIC_INTERFACE
  // Main App with routing to each page using React Router.
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <div className="logo">
                <span className="logo-symbol">*</span> KAVIA AI
              </div>
              <div style={{ display: 'flex', gap: '14px' }}>
                <Link className="btn" to="/">Home</Link>
                <Link className="btn" to="/itinerary">Itinerary</Link>
                <Link className="btn" to="/weather">Weather</Link>
                <Link className="btn" to="/chat">Chat</Link>
              </div>
            </div>
          </div>
        </nav>
        <main>
          <div className="container" style={{ paddingTop: '90px' }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/itinerary" element={<ItineraryPage />} />
              <Route path="/weather" element={<WeatherPage />} />
              <Route path="/chat" element={<ChatPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;