// mockApi.js - Mock API for GreenScout authentication

/**
 * Mock user database for GreenScout
 * Each user has: id, username, password, role, matchesLogged
 */
export const users = [
  {
    uuid: 0,
    certificate: 0,
    role: "admin",
    username: "admin",
    password: "gs2024",
    DisplayName: "Admin",
    Score: 1000000,
    LifeScore: 231,
    HighScore: 67,
  },
  {
    uuid: 1,
    certificate: 1,
    role: "admin",
    username: "NoahE",
    password: "password",
    DisplayName: "Noah Engelkes",
    Score: 3,
    LifeScore: 2,
    HighScore: 41,
  },
  {
    uuid: 2,
    certificate: 2,
    role: "user",
    username: "Jose",
    password: "password",
    DisplayName: "Jose R",
    Score: 2,
    LifeScore: 1,
    HighScore: 17,
  },
  {
    uuid: 3,
    certificate: 3,
    role: "user",
    username: "NoahD",
    password: "password",
    DisplayName: "Noah D",
    Score: 1,
    LifeScore: 3,
    HighScore: 38,
  },
];

/**
 * Authenticate a user with username and password
 * @param {string} username - The username to authenticate
 * @param {string} password - The password to verify
 * @returns {Object} Authentication result with success status and user data (without password)
 */
export const authenticateUser = (username, password) => {
  // Find user with matching username and password
  const user = users.find(
    (u) =>
      u.username.toLowerCase() === username.toLowerCase() &&
      u.password === password,
  );

  if (user) {
    // Return user data without password for security
    const { password: _, ...userWithoutPassword } = user;
    return {
      success: true,
      user: userWithoutPassword,
      message: "Authentication successful",
    };
  }

  return {
    success: false,
    user: null,
    message: "Invalid username or password",
  };
};

export const submitMatchform = async (formData) => {
  // const blob = new Blob([formData], { type: "application/json" });
  // const url = URL.createObjectURL(blob);
  // const link = document.createElement("a");
  // link.href = url;
  // link.download = "form-data.json";
  // document.body.appendChild(link);
  // link.click();
  // document.body.removeChild(link);
  // URL.revokeObjectURL(url);
};

export const getUUID = (username) => {
  const user = users.find(
    (u) => u.username.toLowerCase() === username.toLowerCase(),
  );

  if (user) {
    return user.uuid;
  }

  return null;
};

export const getCertificate = (username) => {
  const user = users.find(
    (u) => u.username.toLowerCase() === username.toLowerCase(),
  );

  if (user) {
    return user.certificate;
  }

  return null;
};

/**
 * Get user by ID (without password)
 * @param {number} id - User ID
 * @returns {Object|null} User object without password, or null if not found
 */
export const getUserById = (id) => {
  const user = users.find((u) => u.id === id);
  if (user) {
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  return null;
};

/**
 * Get all users (without passwords)
 * @returns {Array} Array of user objects without passwords
 */
export const getLeaderboard = async (scoreType) => {
  const scoreKey = (() => {
    switch (scoreType) {
      case "LifeScore":
        return "LifeScore";
      case "HighScore":
        return "HighScore";
      default:
        return "Score";
    }
  })();

  const sortedUsers = [...users].sort(
    (a, b) => (b[scoreKey] ?? 0) - (a[scoreKey] ?? 0),
  );
  return sortedUsers.map(({ password: _, ...user }) => user);
};

/**
 * Check if user has admin role
 * @param {number} userId - User ID
 * @returns {boolean} True if user is admin
 */
export const isAdmin = (userId) => {
  const user = users.find((u) => u.id === userId);
  return user ? user.role === "admin" : false;
};

export const logoutUser = async () => {};
