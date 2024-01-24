// src/components/RepositoryDescriptionPage.js
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../services/api";
import LoadingSpinner from "./LoadingSpinner";
import "./cssFiles/RepositoryDescriptionPage.css";

const RepositoryDescriptionPage = () => {
  const location = useLocation();
  const repoName = new URLSearchParams(location.search).get("repoName");
  const [repository, setRepository] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepositoryDetails = async () => {
      try {
        setLoading(true);
        const repoDetails = await api.getRepositoryDetails(repoName);
        setRepository(repoDetails);
      } catch (error) {
        console.error("Error fetching repository details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepositoryDetails();
  }, [repoName]);

  return (
    <div className="repository-description-container">
      {loading && <LoadingSpinner />}
      {repository ? (
        <div>
          <h2 className="repo-name">{repository.full_name}</h2>
          <p className="repo-description">
            Description: {repository.description}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RepositoryDescriptionPage;
