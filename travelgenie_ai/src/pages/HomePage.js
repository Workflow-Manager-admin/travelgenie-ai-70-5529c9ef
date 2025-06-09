import React from "react";
import { Link } from "react-router-dom";

// PUBLIC_INTERFACE
function HomePage() {
  /**
   * Renders the Home Page of the TravelGenie app.
   * Includes app introduction and navigation links.
   */
  return (
    <div className="hero bg-background text-dark" style={{ minHeight: "68vh" }}>
      <div className="title title-primary">
        Welcome to TravelGenie!
      </div>
      <div className="subtitle header-secondary">
        Your all-in-one AI-powered travel planner.
      </div>
      <div className="description" style={{ marginBottom: 32 }}>
        Plan smarter, travel easier: generate personalized itineraries, chat with our AI travel assistant, and check the weather for your adventure. Start exploring the world with TravelGenie today!
      </div>

      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
        <Link to="/itinerary" className="btn btn-large btn-primary">
          AI Itinerary Generator
        </Link>
        <Link to="/weather" className="btn btn-large btn-accent">
          Weather Checker
        </Link>
        <Link to="/chat" className="btn btn-large btn-primary">
          Travel Chatbot
        </Link>
      </div>
      <div className="text-secondary" style={{
        marginTop: "54px",
        fontSize: "0.98rem"
      }}>
        ✈️ Ready for your next adventure?
      </div>
    </div>
  );
}

export default HomePage;
