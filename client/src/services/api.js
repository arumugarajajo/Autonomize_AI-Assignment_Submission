// src/services/api.js
const API_BASE_URL = "https://api.github.com";

const api = {
  getUserData: async (username) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${username}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch user data for ${username}`);
      }
      return response.json();
    } catch (error) {
      alert(error.message);
    }
  },

  getUserRepositories: async (username) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${username}/repos`);
      if (!response.ok) {
        throw new Error(`Failed to fetch repositories for ${username}`);
      }
      return response.json();
    } catch (error) {
      alert(error.message);
    }
  },

  getUserDetails: async (username) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${username}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch user details for ${username}`);
      }
      return response.json();
    } catch (error) {
      alert(error.message);
    }
  },
  getUserFollowers: async (username) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/users/${username}/followers`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch followers for ${username}`);
      }
      return response.json();
    } catch (error) {
      alert(error.message);
    }
  },
  // Add more API methods as needed
};

export default api;
