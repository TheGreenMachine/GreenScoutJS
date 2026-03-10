// mockApi.js - Mock API for GreenScout authentication
// Place this file in: greenscoutjs/src/api/mockApi.js

import axios from 'axios';
import forge from 'node-forge';

const SERVER = 'http://localhost:8080';

/**
 * Mock user database for GreenScout
 * Each user has: id, username, password, role, matchesLogged
 */
export const users = [
  {
    id: 1,
    username: "admin",
    password: "gs2024",
    role: "admin",
    matchesLogged: 156,
  },
  {
    id: 2,
    username: "scout1",
    password: "scout123",
    role: "user",
    matchesLogged: 42,
  },
  {
    id: 3,
    username: "teamlead",
    password: "lead1816",
    role: "admin",
    matchesLogged: 89,
  },
  {
    id: 4,
    username: "sarah_chen",
    password: "password456",
    role: "user",
    matchesLogged: 23,
  },
  {
    id: 5,
    username: "mike_jones",
    password: "scout2024",
    role: "user",
    matchesLogged: 67,
  },
  {
    id: 6,
    username: "coordinator",
    password: "coord1816",
    role: "admin",
    matchesLogged: 134,
  },
  {
    id: 7,
    username: "rookie_scout",
    password: "firstyear",
    role: "user",
    matchesLogged: 5,
  },
];

async function getPublicKey() {
  const response = await axios.get(`${SERVER}/pub`);
  return forge.pki.publicKeyFromPem(response.data);
}

async function encryptPassword(plaintext) {
  const publicKey = await getPublicKey();

  const encrypted = publicKey.encrypt(plaintext, 'RSAES-PKCS1-V1_5');
  return forge.util.encode64(encrypted);
}

export const authenticateUser = async (username, password) => {
  const encryptedPassword = await encryptPassword(password);

  const response = await axios.post(
    `${SERVER}/login`,
    JSON.stringify({
      Username: username.toLowerCase(),
      EncryptedPassword: encryptedPassword,
    }),
    {
      headers: {
        'Content-Type': 'application/json',
        Certificate: '',
        uuid: '',
      },
    }
  );

  const role = response.headers['role'];
  const uuid = response.headers['uuid'];
  const certificate = response.headers['certificate'];

  if (role === 'Not accepted nuh uh') {
    throw new Error('Invalid password or username');
  }

  return { role, uuid, certificate };
}

/**
 * Authenticate a user with username and password
 * @param {string} username - The username to authenticate
 * @param {string} password - The password to verify
 * @returns {Object} Authentication result with success status and user data (without password)
 */
// export const authenticateUser = (username, password) => {
//   // Find user with matching username and password
//   const user = users.find(
//     (u) =>
//       u.username.toLowerCase() === username.toLowerCase() &&
//       u.password === password,
//   );

//   if (user) {
//     // Return user data without password for security
//     const { password: _, ...userWithoutPassword } = user;
//     return {
//       success: true,
//       user: userWithoutPassword,
//       message: "Authentication successful",
//     };
//   }

//   return {
//     success: false,
//     user: null,
//     message: "Invalid username or password",
//   };
// };

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
export const getAllUsers = () => {
  return users.map(({ password: _, ...user }) => user);
};

/**
 * Update matches logged for a user
 * @param {number} userId - User ID
 * @param {number} newCount - New matches logged count
 * @returns {Object} Update result
 */
export const updateMatchesLogged = (userId, newCount) => {
  const user = users.find((u) => u.id === userId);
  if (user) {
    user.matchesLogged = newCount;
    const { password: _, ...userWithoutPassword } = user;
    return {
      success: true,
      user: userWithoutPassword,
      message: "Matches logged updated successfully",
    };
  }
  return {
    success: false,
    user: null,
    message: "User not found",
  };
};

/**
 * Increment matches logged for a user
 * @param {number} userId - User ID
 * @returns {Object} Update result
 */
export const incrementMatchesLogged = (userId) => {
  const user = users.find((u) => u.id === userId);
  if (user) {
    user.matchesLogged += 1;
    const { password: _, ...userWithoutPassword } = user;
    return {
      success: true,
      user: userWithoutPassword,
      message: "Match logged successfully",
    };
  }
  return {
    success: false,
    user: null,
    message: "User not found",
  };
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
