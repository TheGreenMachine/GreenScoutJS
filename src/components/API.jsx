const getAuthToken = () => localStorage.getItem("token");

export const fetchWithAuth = async (url, options = {}) => {
  const token = getAuthToken();

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });
};
