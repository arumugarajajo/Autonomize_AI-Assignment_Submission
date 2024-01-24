// src/components/FollowerRepositoryListPage.js
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import api from "../services/api";

const FollowerRepositoryListPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const followerUsername = new URLSearchParams(location.search).get("username");
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const fetchFollowerRepositories = async () => {
      try {
        const repos = await api.getUserRepositories(followerUsername);
        setRepositories(repos);
      } catch (error) {
        console.error("Error fetching follower repositories:", error);
      }
    };

    fetchFollowerRepositories();
  }, [followerUsername]);

  return (
    <div>
      <h2>{`${followerUsername}'s Repositories`}</h2>
      {repositories.length > 0 ? (
        <ul>
          {repositories.map((repo) => (
            <li key={repo.id}>
              <p>
                Name:{" "}
                <Link
                  to={`/repository/${repo.name}`}
                  state={{ repoName: repo.name }}
                >
                  {repo.name}
                </Link>
              </p>
              <p>Description: {repo.description}</p>
              <hr />
            </li>
          ))}
        </ul>
      ) : (
        <p>No repositories found for {followerUsername}.</p>
      )}
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
};

export default FollowerRepositoryListPage;
