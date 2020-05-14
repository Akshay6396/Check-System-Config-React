import decode from "jwt-decode";
import { AES_KEY } from "../constants/defaultValues";

var CryptoJS = require("crypto-js");

const loggedIn = () => {
  if (localStorage.getItem("token")) {
    return true;
  } else {
    return false;
  }
  // Checks if there is a saved token and it's still valid
  // const token = getToken(); // GEtting token from localstorage
  // return !!token && !isTokenExpired(token); // handwaiving here
};

// const isTokenExpired = token => {
//   try {
//     const decoded = decode(token);
//     // if (decoded.exp < Date.now() / 1000) {
//     if (decoded) {
//       // Checking if token is expired. N
//       return true;
//     } else return false;
//   } catch (err) {
//     return false;
//   }
// };

const getToken = () => {
  // Retrieves the user token from localStorage
  return localStorage.getItem("token");
};

const logout = () => {
  // Clear user token and profile data from localStorage
  localStorage.removeItem("token");
};

const getProfile = () => {
  // Using jwt-decode npm package to decode the token
  return decode(getToken());
};
const getRole = id => {
  const data = {
    1: "Super Admin",
    2: "Admin",
    3: "Head Coach",
    4: "Sales POC",
    5: "KAM"
  };
  // Using jwt-decode npm package to decode the token
  return data[id];
};
const encryptData = text => {
  var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(text), AES_KEY).toString();
  return ciphertext;
};
const decryptData = text => {
  
  var bytes = CryptoJS.AES.decrypt(text, AES_KEY);
  var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
};
export { getProfile, loggedIn, logout, getRole, getToken, encryptData, decryptData };
