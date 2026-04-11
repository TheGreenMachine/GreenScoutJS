import * as realApi from "./api.js";
import * as mockApi from "./mockApi.js";

const useBackend = localStorage.getItem("USE_BACKEND") === "true";

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

export const backendToggleOn = () => {
  if (localStorage.getItem("USE_BACKEND") === "false") {
    localStorage.setItem("USE_BACKEND", true);
    globalThis.location.reload();
  }
};

export const mockToggleOn = () => {
  if (localStorage.getItem("USE_BACKEND") === "true") {
    localStorage.setItem("USE_BACKEND", false);
    globalThis.location.reload();
  }
};
