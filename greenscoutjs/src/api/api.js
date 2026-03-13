import axios from "axios";
import forge from "node-forge";

const SERVER = "/api";

async function getPublicKey() {
  const response = await axios.get(`${SERVER}/pub`);
  return forge.pki.publicKeyFromPem(response.data);
}

async function encryptPassword(plaintext) {
  const publicKey = await getPublicKey();

  const encrypted = publicKey.encrypt(plaintext, "RSAES-PKCS1-V1_5");
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

export const getUUID = (username) => {
  return null;
};

export const getCertificate = (username) => {
  return null;
};

export const logoutUser = async () => {
  await axios.post(`${SERVER}/logout`);
};

export const submitMatchform = async (formData) => {
  await axios.post(`${SERVER}/dataEntry`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getLeaderboard = async (scoreType) => {
  const response = await axios.get(`${SERVER}/leaderboard`, {
    headers: {
      'type': scoreType
    }
  });

  return response.data;
};
