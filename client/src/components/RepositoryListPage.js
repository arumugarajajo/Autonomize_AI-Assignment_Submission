// src/components/RepositoryListPage.js
import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import LoadingSpinner from "./LoadingSpinner";
import "./cssFiles/RepositoryListPage.css";

const RepositoryListPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const username = new URLSearchParams(location.search).get("username");

  const [userDetails, setUserDetails] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const user = await api.getUserDetails(username);
      setUserDetails(user);
      console.log(user);
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRepositories = async () => {
    try {
      setLoading(true);
      const userRepositories = await api.getUserRepositories(username);
      setRepositories(userRepositories);
    } catch (error) {
      console.error("Error fetching repositories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserData();
      await fetchRepositories();
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  return (
    <div className="container">
      {loading && <LoadingSpinner />}
      {userDetails && (
        <div className="user-info">
          <div>
            {userDetails.avatar_url && (
              <img
                src={userDetails.avatar_url}
                alt="User Avatar"
                className="avatar"
              />
            )}
          </div>
          <div className="user-details">
            <h2 className="name">{userDetails.name}</h2>
            <p className="bio">{userDetails.bio}</p>
            <p>
              <strong>Location:</strong> {userDetails.location}
            </p>
            <p>
              <strong>Followers:</strong> {userDetails.followers}
            </p>
            <p>
              <strong>Following:</strong> {userDetails.following}
            </p>
            <p>
              <strong>Public Repositories:</strong> {userDetails.public_repos}
            </p>
          </div>
        </div>
      )}
      <div className="repositories-list">
        <h3>Repositories:</h3>
        <ul>
          {repositories.map((repo) => (
            <li key={repo.id}>
              <Link to={`/repositories/${repo.name}?repoUrl=${repo.html_url}`}>
                <strong>{repo.name}</strong>
              </Link>
              <p className="repo-description">{repo.description}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <Link to="/followers" className="followers-link">
          View Followers
        </Link>
        <button onClick={() => navigate(-1)} className="go-back-button">
          Go Back
        </button>
      </div>
    </div>
  );
};

export default RepositoryListPage;
