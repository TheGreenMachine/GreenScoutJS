// api.js or utils/api.js
const API_BASE_URL = "https://your-backend-url.com/a  pi"; // Replace with your actual backend URL

const getAuthToken = () => localStorage.getItem("token");

export const fetchWithAuth = async (url, options = {}) => {
  const token = getAuthToken();

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      // Token expired or invalid - redirect to login
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/GreenScoutJS";
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Specific API methods
export const api = {
  // GET request
  get: (endpoint) => fetchWithAuth(`${API_BASE_URL}${endpoint}`),

  // POST request
  post: (endpoint, data) =>
    fetchWithAuth(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // PUT request
  put: (endpoint, data) =>
    fetchWithAuth(`${API_BASE_URL}${endpoint}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  // DELETE request
  delete: (endpoint) =>
    fetchWithAuth(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE",
    }),
};
