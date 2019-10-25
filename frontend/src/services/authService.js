import http from "./httpService";
// import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const apiUrl = "http://blogbackend.local.com/api/";
const tokenKey = "token";
const id = "userId";
const name = "userName";
const emailId = "userEmail";

http.setJwt(getJwt());

export async function login(email, password) {
  const apiEndpoint = apiUrl + "login";
  const { data } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, data.token);
  localStorage.setItem(id, data.user.id);
  localStorage.setItem(name, data.user.name);
  localStorage.setItem(emailId, data.user.email);
}

export function loginWithJwt(token) {
  localStorage.setItem(tokenKey, token);
}

export function logout() {
  const apiEndpoint = apiUrl + "logout";
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(id);
  localStorage.removeItem(name);
  localStorage.removeItem(emailId);
  http.get(apiEndpoint);
}

export function getCurrentUser() {
  try {
    const token = localStorage.getItem(tokenKey);
    const userId = localStorage.getItem(id);
    const userName = localStorage.getItem(name);
    const userEmail = localStorage.getItem(emailId);
    if (token && userId && userName && userEmail) {
      const user = {
        token: token,
        id: userId,
        name: userName,
        email: userEmail
      };
      return user;
    }
    // console.log(user);
    return false;
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  try {
    return localStorage.getItem(tokenKey);
  } catch (ex) {
    return null;
  }
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt
};
