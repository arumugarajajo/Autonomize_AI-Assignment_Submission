// src/components/FollowersPage.js
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import LoadingSpinner from "./LoadingSpinner";
import "./cssFiles/FollowersPage.css";

export const FollowersPage = () => {
  const location = useLocation();
  const username = new URLSearchParams(location.search).get("username");
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        setLoading(true);
        const followerList = await api.getUserFollowers(username);
        setFollowers(followerList);
      } catch (error) {
        console.error("Error fetching followers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowers();
  }, [username]);

  const navigate = useNavigate();

  const handleFollowerClick = (followerUsername) => {
    navigate(`/follower-repositories?username=${followerUsername}`);
  };

  return (
    <div className="followers-container">
      <h2>Followers</h2>
      {loading && <LoadingSpinner />}
      {followers.length > 0 ? (
        <ul className="followers-list">
          {followers.map((follower) => (
            <li
              key={follower.login}
              onClick={() => handleFollowerClick(follower.login)}
              className="follower-item"
            >
              {follower.login}
            </li>
          ))}
        </ul>
      ) : (
        <p>No followers found.</p>
      )}
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
};

export default FollowersPage;
