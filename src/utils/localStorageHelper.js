const AUTHENTICATION_TOKEN = "authentication_token";

export function clearCachedAuthToken() {
  localStorage.removeItem(AUTHENTICATION_TOKEN);
}

export function setCachedAuthToken(token) {
  if (token) {
    localStorage.setItem(AUTHENTICATION_TOKEN, token);
  } else {
    clearCachedAuthToken();
  }
}

export function getCachedAuthToken() {
  return localStorage.getItem(AUTHENTICATION_TOKEN);
}

export default {
  getCachedAuthToken,
  setCachedAuthToken,
  clearCachedAuthToken
};
