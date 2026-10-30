import * as realApi from "./api.js";
import * as mockApi from "./mockApi.js";

const useBackend = getUseBackend() === "true";
const activeApi = useBackend ? realApi : mockApi;

export const {
  authenticateUser,
  submitMatchform,
  logoutUser,
  getLeaderboard,
  getThemeList,
  getCurrentTheme,
  setTheme,
  makeThemeLink,
  getIsOffline,
} = activeApi;

function getUseBackend() {
  if (!("USE_BACKEND" in localStorage)) {
    localStorage.setItem("USE_BACKEND", true);
  }
  return localStorage.getItem("USE_BACKEND");
}

// To switch from USE_BACKEND being false to true
export const backendToggleOn = () => {
  //Switch to Backend from using Mock API
  if (localStorage.getItem("USE_BACKEND") === "false") {
    localStorage.setItem("USE_BACKEND", true);
    globalThis.location.reload();
  }
};

// To switch from USE_BACKEND being true to false
export const mockToggleOn = () => { //Switch to Mock API from using Backend
  if (localStorage.getItem("USE_BACKEND") === "true") {
    localStorage.setItem("USE_BACKEND", false);
    globalThis.location.reload();
  }
};
