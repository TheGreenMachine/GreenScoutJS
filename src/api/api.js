import axios from "axios";
import forge from "node-forge";

const SERVER = import.meta.env.VITE_BACKEND_URL ?? "";

export const api = axios.create({
  baseURL: SERVER,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

var wasOffline = false;

const AUTH_EXPIRED_EVENT = "greenscout:auth-expired";

const notifyAuthExpired = () => {
  window.dispatchEvent(new CustomEvent(AUTH_EXPIRED_EVENT));
};

async function post(url, data, config) {
  try {
    const response = await api.post(url, data, config);
    wasOffline = false;
    return response;
  } catch (err) {
    if (err.response && err.response.status === 401) {
      console.error(
        "Axios post failed. Token is most likely expired. Clearing. ",
        err,
      );
      notifyAuthExpired();
    } else {
      wasOffline = true;
      console.error("Axios post failed. Switching to offline mode. ", err);
    }
  }
}

async function get(url, config) {
  try {
    const data = await api.get(url, config);
    wasOffline = false;
    return data;
  } catch (err) {
    if (err.response && err.response.status === 401) {
      console.error(
        "Axios get failed. Token is most likely expired. Clearing. ",
        err,
      );
      notifyAuthExpired();
    } else {
      wasOffline = true;
      console.error("Axios get failed. Switching to offline mode. ", err);
    }
    return null;
  }
}

async function getPublicKey() {
  const response = await get("/pub");
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
    "/login",
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

  const token = response.data.token;
  localStorage.setItem("accessToken", token);

  return {
    role: role,
    user: username.toLowerCase(),
    success: true,
  };
};

export const logoutUser = async () => {
  // await post("/logout");
  localStorage.removeItem("accessToken");
};

export const submitMatchform = async (formData) => {
  await post("/dataEntry", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getLeaderboard = async (scoreType) => {
  const response = await get("/leaderboard", {
    headers: { type: scoreType },
  });

  return response.data;
};

export const getThemeList = async () => {
  const response = await get("/allThemes");

  return response.data.themes;
};

export const getCurrentTheme = async () => {
  const response = await get("/currTheme");
  return response.data.theme;
};

export const setTheme = async (themeName) => {
  await post("/setTheme", { theme: themeName });
};

export const makeThemeLink = (themeName) => {
  return `/getTheme?theme=${themeName}`;
};

export const getIsOffline = () => {
  return wasOffline;
};

export const AUTH_EXPIRED_EVENT_NAME = AUTH_EXPIRED_EVENT;
