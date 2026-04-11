import axios from "axios";
import forge from "node-forge";

let SERVER = import.meta.env.VITE_BACKEND_URL ?? "";

axios.defaults.withCredentials = true;

var wasOffline = false;

async function post(url, data, config) {
  try {
    const response = await axios.post(url, data, config);
    wasOffline = false;
    return response;
  } catch (err) {
    console.error("Axios post failed. Switching to offline mode. ", err);
    wasOffline = true;
  }
}

async function get(url, config) {
  try {
    const data = await axios.get(url, config);
    wasOffline = false;
    return data;
  } catch (err) {
    console.error("Axios get failed. Switching to offline mode. ", err);
    wasOffline = true;
    return null;
  }
}

async function getPublicKey() {
  const response = await get(`${SERVER}/pub`);
  return forge.pki.publicKeyFromPem(response.data);
}

async function encryptPassword(plaintext) {
  const publicKey = await getPublicKey();

  const encrypted = publicKey.encrypt(plaintext, "RSAES-PKCS1-V1_5");
  return forge.util.encode64(encrypted);
}

export const authenticateUser = async (username, password) => {
  const encryptedPassword = await encryptPassword(password);

  const response = await post(
    `${SERVER}/login`,
    JSON.stringify({
      Username: username.toLowerCase(),
      EncryptedPassword: encryptedPassword,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const role = response.headers["role"];

  if (role === "Not accepted nuh uh") {
    console.error("Authentication failed: Invalid username or password");
    return {
      success: false,
      user: null,
      message: "Invalid username or password",
    };
  }

  return {
    role: role,
    user: username.toLowerCase(),
    success: true,
  };
};

export const logoutUser = async () => {
  await post(`${SERVER}/logout`);
};

export const submitMatchform = async (formData) => {
  await post(`${SERVER}/dataEntry`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getLeaderboard = async (scoreType) => {
  const response = await get(`${SERVER}/leaderboard`, {
    headers: { type: scoreType },
  });

  return response.data;
};

export const getThemeList = async () => {
  const response = await get(`${SERVER}/allThemes`);

  return response.data.themes;
};

export const getCurrentTheme = async () => {
  const response = await get(`${SERVER}/currTheme`);
  return response.data.theme;
};

export const setTheme = async (themeName) => {
  await post(`${SERVER}/setTheme`, { theme: themeName });
};

export const makeThemeLink = (themeName) => {
  return `${SERVER}/getTheme?theme=${themeName}`;
};

export const getIsOffline = () => {
  return wasOffline;
};
