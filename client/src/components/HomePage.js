// src/components/HomePage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import LoadingSpinner from "./LoadingSpinner";
import "./cssFiles/HomePage.css";

const HomePage = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const userData = await api.getUserData(username);
      navigate(`/repository-list?username=${username}`);
      console.log(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter GitHub username"
        className="input-field"
      />
      <div className="button-container">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="search-button"
        >
          Search
        </button>
      </div>
      {loading && (
        <div className="loading-container">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default HomePage;
