// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import RepositoryListPage from "./components/RepositoryListPage";
import RepositoryDescriptionPage from "./components/RepositoryDescriptionPage"; // Add this line
import FollowersPage from "./components/FollowersPage";
import FollowerRepositoryListPage from "./components/FollowerRepositoryListPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/repository-list" element={<RepositoryListPage />} />
        <Route
          path="/repository/:repositoryName"
          element={<RepositoryDescriptionPage />}
        />
        <Route path="/followers" element={<FollowersPage />} />
        <Route
          path="/follower-repositories"
          element={<FollowerRepositoryListPage />}
        />
      </Routes>
    </Router>
  );
};

export default App;
