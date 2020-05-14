import { all, call, fork, put, takeEvery } from "redux-saga/effects";
// import { auth } from '../../helpers/Firebase';
import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  RESET_USER,
  RESET_PASSWORD,
  loginUserSuccess,
  loginUserError,
  registerUserSuccess,
  registerUserError,
  resetUserSuccess,
  resetUserError,
  resetPasswordSuccess,
  resetPasswordError,
  FORGET_PASSWORD,
  forgetPasswordError,
  forgetPasswordSuccess,
  UNI_FORGET_PASSWORD,
  uniForgetPasswordSuccess,
  uniForgetPasswordError,
  RECOVER_PASSWORD,
  recoverPasswordSuccess,
  recoverPasswordError,
  OTP_RESEND,
  otpResendError,
  otpResendSuccess,
  LOGIN_UNI_USER,
  loginUniUserSuccess,
  loginUniUserError,
  SEND_MAGICLINK,
  sendMagicLinkSuccess,
  sendMagicLinkError,
  MAGIC_LINK_VERIFY,
  magicLoginSuccess,
  magicLoginError,
  VERIFY_EMAIL_LINK
} from "../actions";
import axios from "axios";
import * as loggedInUser from "../../helpers/auth-service";
import { localPath,defaultRedirect,univalleydefaultRedirect,uniConnectDefaultRedirect} from "../../constants/defaultValues";
import { verifyEmailLinkError, verifyEmailLinkSuccess } from "./actions";
// import resetPassword from "../../views/user/reset-password";

// function loginWithEmailPasswordAsync(payload) {
//     return axios.request({
//         method: 'post',
//         url: 'http://localhost:8010/api/account/login',
//         data: payload
//     });
// }


export function loginWithEmailPasswordAsync(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.request({
        method: "post",
        url: localPath + "login",
        data: payload
      });
      resolve(result.data);
    } catch (error) {
      reject(error);
    }
  });
}
export function loginUniUserRequest(payload) {
  
  return new Promise(async (resolve, reject) => {
    try {
      ;
      const result = await axios.request({
        method: "post",
        url: localPath + "loginUniUser",
        data: payload
      });
      resolve(result.data);
    } catch (error) {
      reject(error);
    }
  });
}
export function registerUserAsync(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.request({
        method: "post",
        url: localPath + "register",
        data: payload
      });
      resolve(result.data);
    } catch (error) {
      
      reject(error);
    }
  });
}
export function sendMagicLinkAsync(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.request({
        method: "post",
        url: localPath + "sendMagicLink",
        data: payload
      });
      
      resolve(result.data);
    } catch (error) {
      reject(error);
    }
  });
}
export function magicLoginVerifyAsync(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.request({
        method: "post",
        url: localPath + "magicLogin",
        data: payload
      });
      resolve(result.data);
    } catch (error) {
      reject(error);
    }
  });
}
export function verifyEmailLinkAsync(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.request({
        method: "post",
        url: localPath + "verifyEmailLink",
        data: payload
      });
      resolve(result.data);
    } catch (error) {
      reject(error);
    }
  });
}
export function forgotPasswordAsync(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.request({
        method: "post",
        url: localPath + "forgotPassword",
        data: payload
      });
      resolve(result.data);
    } catch (error) {
      reject(error);
    }
  });
}
export function uniForgetPasswordAsync(payload) {
  ;
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.request({
        method: "post",
        url: localPath + "uniforgotPassword",
        data: payload
      });
      resolve(result.data);
    } catch (error) {
      reject(error);
    }
  });
}
export function recoverPasswordAsync(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.request({
        method: "post",
        url: localPath + `verifyOtp`,
        data: payload
      });
      
      resolve(result.data);
    } catch (error) {
      reject(error);
    }
  });
}
export function unirecoverPasswordAsync(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.request({
        method: "post",
        url: localPath + `univerifyOtp`,
        data: payload
      });
      
      resolve(result.data);
    } catch (error) {
      reject(error);
    }
  });
}
export function resendOtpAsync(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.request({
        method: "post",
        url: localPath + "resendOtp",
        data: payload
      });
      resolve(result.data);
    } catch (error) {
      reject(error);
    }
  });
}
export function uniresendOtpAsync(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.request({
        method: "post",
        url: localPath + "uniresendOtp",
        data: payload
      });
      resolve(result.data);
    } catch (error) {
      reject(error);
    }
  });
}
export function resetPasswordAsync(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.request({
        method: "post",
        url: localPath + "resetPassword",
        data: payload
      });
      resolve(result.data);
    } catch (error) {
      reject(error);
    }
  });
}
export function uniresetPasswordAsync(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.request({
        method: "post",
        url: localPath + "uniresetPassword",
        data: payload
      });
      resolve(result.data);
    } catch (error) {
      reject(error);
    }
  });
}
export function resetWithEmailAsync(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.request({
        method: "post",
        url: localPath + "forgetPassword",
        data: payload
      });
      resolve(result.data);
    } catch (error) {
      reject(error);
    }
  });
}
function* loginWithEmailPassword({ payload }) {
  // const { email, password } = payload.user;
  const { history } = payload;
  try {
    let loginUser = yield call(loginWithEmailPasswordAsync, payload.user);
    if (loginUser.meta.code === 200) {
      ;
      localStorage.setItem("token", loginUser.Token);
      yield put(loginUserSuccess(loginUser.Data));

      let tokenLocation = localStorage.getItem("tokenLocation")
      let token = loggedInUser.getToken();

      if (loginUser.Data.id) {
        history.push(`/user/verifyEmail/${loginUser.Data.id}`);
      }
      else if (tokenLocation) {
        let location = loggedInUser.decryptData(tokenLocation)
        window.location.assign(location.redirect_url + "?token=" + loginUser.Token);
        localStorage.removeItem("tokenLocation");
      }
      else {
        window.location.assign(defaultRedirect + "?token=" + loginUser.Token);
      }
    } else {
      yield put(loginUserError(loginUser.meta.Message));
    }
  } catch (error) {
    yield put(loginUserError(error));
  }
}
function* loginUniUser({ payload }) {
  const { history } = payload;
  try {
    let loginUser = yield call(loginUniUserRequest, payload.user);
    if (loginUser.meta.code === 200) {
      yield put(loginUniUserSuccess(loginUser.Data));
      let tokenLocation = localStorage.getItem("tokenLocation")      
      if (tokenLocation) {
        let location = loggedInUser.decryptData(tokenLocation);
        window.location.assign(location.redirect_url + "?token=" + loginUser.Token);
        localStorage.removeItem("tokenLocation");
      }
      else {
        window.location.assign(univalleydefaultRedirect+ "?token=" + loginUser.Token);
      }
    } else {
      yield put(loginUniUserError(loginUser.meta.Message));
    }
  } catch (error) {
    yield put(loginUniUserError(error));
  }
}
function* registerUser({ payload }) {
  const { history } = payload;
  try {
    const registerUserData = yield call(registerUserAsync, payload.user);
    
    // if (registerUser.meta.code === 200 && registerUser.Data.googleUser) {
    //   localStorage.setItem("token", registerUser.Token);
    //   yield put(registerUserSuccess(registerUser.Data));
    //   let tokenLocation = localStorage.getItem("tokenLocation");
    //   let token = loggedInUser.getToken();
    // if (tokenLocation) {
    //   let location = loggedInUser.decryptData(tokenLocation);
    //   window.location.assign(location.redirect_url + "?token=" + registerUser.Token);
    //   localStorage.removeItem("tokenLocation");
    // } else {
    //   window.location.assign(defaultRedirect + "?token=" + registerUser.Token);
    // }
    // yield put(registerUserSuccess(registerUser.meta.Message));
    // }
    if (registerUserData.meta.code === 200 && registerUserData.Data.id) {
      yield put(registerUserSuccess(registerUserData.meta.Message));
      history.push(`/user/verifyEmail/${registerUserData.Data.id}`);
    }
    else if (registerUserData.meta.code === 201) {
      yield put(registerUserSuccess(registerUserData.meta.Message));
      // history.push('/user/login')
    }
    else if (registerUserData.meta.code === 400) {
      var responseToSring = registerUserData.Data.map(function (item) {
        return Object.values(item).toString();
      });
      yield put(registerUserError(responseToSring.toString()));
    } else {
      
      yield put(registerUserError(registerUserData.meta.Message));
    }
  } catch (error) {
    yield put(registerUserError(error));
  }
}
function* sendMagicLink({ payload }) {
  
  const { history } = payload;
  try {
    let sendMagicLink = yield call(sendMagicLinkAsync, payload.user);
    if (sendMagicLink.meta.code === 200) {
      yield put(sendMagicLinkSuccess(sendMagicLink.meta.Message));
      localStorage.removeItem("tokenLocation");
      // history.push(`/user/verifyOtp/${sendMagicLink.Data.id}`);
    }
    else {
      yield put(sendMagicLinkError(sendMagicLink.meta.Message));
    }
  }
  catch (e) {
    yield put(sendMagicLinkError(e));
  }
}
function* magicLogin({ payload }) {
  const { history } = payload;
  try {
    let magicLogin = yield call(magicLoginVerifyAsync, payload.token);
    if (magicLogin.meta.code === 200) {
      yield put(magicLoginSuccess(magicLogin.meta.Message));
      window.location.assign(uniConnectDefaultRedirect+ "?token=" + magicLogin.Token);
      localStorage.removeItem("tokenLocation");
    }
    else {
      yield put(magicLoginError(magicLogin.meta.Message));
    }
  }
  catch (e) {
    yield put(magicLoginError(e));
  }
}
function* verifyEmailLink({ payload }) {
  const { history,user } = payload;
  try {
    let magicLogin = yield call(verifyEmailLinkAsync, user);
    if (magicLogin.meta.code === 200) {
      yield put(verifyEmailLinkSuccess(magicLogin.meta.Message));
      window.location.assign(uniConnectDefaultRedirect+ "?token=" + magicLogin.Token);
      localStorage.removeItem("tokenLocation");
    }
    else {
      yield put(verifyEmailLinkError(magicLogin.meta.Message));
    }
  }
  catch (e) {
    yield put(verifyEmailLinkError(e));
  }
}
function* forgetPassword({ payload }) {
  const { history } = payload;
  try {
    let forgetUser = yield call(forgotPasswordAsync, payload.user);
    
    if (forgetUser.meta.code === 200) {
      yield put(forgetPasswordSuccess(forgetUser.meta.Message));
      history.push(`/user/verifyOtp/${forgetUser.Data.id}`);
    }
    else {
      yield put(forgetPasswordError(forgetUser.meta.Message));
    }
  }
  catch (e) {
    yield put(forgetPasswordError(e));
  }
}
function* uniForgetPassword({ payload }) {
  ;
  const { history } = payload;
  try {
    let forgetUser = yield call(uniForgetPasswordAsync, payload.user);
    
    if (forgetUser.meta.code === 200) {
      yield put( uniForgetPasswordSuccess(forgetUser.meta.Message));
      history.push(`/uni-user/verifyOtp/${forgetUser.Data.id}`);
    }
    else {
      yield put(uniForgetPasswordError(forgetUser.meta.Message));
    }
  }
  catch (e) {
    yield put(uniForgetPasswordError(e));
  }
}
function* recoverPassword({ payload }) {
  try {
    const { user, history } = payload;
    let recoverPassword;
    if(history.location.pathname.includes('uni-user')){
      recoverPassword = yield call(unirecoverPasswordAsync, user);
    }else{
      recoverPassword = yield call(recoverPasswordAsync, user);
    }
    
    if (recoverPassword.meta.code === 200) {
      yield put(recoverPasswordSuccess(recoverPassword));
      
      if (recoverPassword.Token) {
        localStorage.setItem("token", recoverPassword.Token);

        let tokenLocation = localStorage.getItem("tokenLocation")
        // let token = loggedInUser.getToken();
        if (tokenLocation) {
          let location = loggedInUser.decryptData(tokenLocation);
          window.location.assign(location.redirect_url + "?token=" + recoverPassword.Token);
          localStorage.removeItem("tokenLocation");
        } else {
          ;
          window.location.assign(defaultRedirect+ "?token=" + recoverPassword.Token);
        }
      }
      else if(history.location.pathname.includes('uni-user')){
        history.push(`/uni-user/resetPassword/${payload.user.encryptedId}`);
      }
      else {
        history.push(`/user/resetPassword/${payload.user.encryptedId}`);
      }
    }
    else {

      yield put(recoverPasswordError(recoverPassword.meta.Message));
    }
  }
  catch (e) {
    yield put(recoverPasswordError(e));
  }
}
function* otpResend({ payload }) {
  try {
    ;
    let resendOtp;
    const { user } = payload;
    if(payload.history.location.pathname.includes('uni-user')){
      resendOtp = yield call(uniresendOtpAsync, user);
    }
    else{
      resendOtp = yield call(resendOtpAsync, user);
    }

    if (resendOtp.meta.code === 200) {
      yield put(otpResendSuccess(resendOtp.meta.Message));
    }
    else {
      yield put(otpResendError(resendOtp.meta.Message));
    }
  }
  catch (e) {
    yield put(otpResendError(e));
  }
}
function* resetWithEmail({ payload }) {
  const { history } = payload;
  try {
    let resetUser = yield call(resetWithEmailAsync, payload.user);
    if (resetUser.meta.code === 200) {
      yield put(resetUserSuccess(resetUser.meta.Message));
      history.push("/");
    } else if (resetUser.meta.code === 400) {
      var responseToSring = resetUser.Data.map(function (item) {
        return Object.values(item).toString();
      });
      yield put(resetUserError(responseToSring.toString()));
    } else {
      yield put(resetUserError(resetUser.meta.Message));
    }
  } catch (error) {
    yield put(resetUserError(error));
  }
}
function* resetPassword({ payload }) {
  const { history } = payload;
  try {
    ;
    let resetUser;
    if(history.location.pathname.includes('uni-user')){
      resetUser = yield call(uniresetPasswordAsync, payload.user);
    }
    else{
      resetUser = yield call(resetPasswordAsync, payload.user);
    }
    if (resetUser.meta.code === 200) {
      yield put(resetPasswordSuccess(resetUser));
      if(history.location.pathname.includes('uni-user')){
        history.push("/uni-user/login");
      }
      else{
        history.push("/user/login");
      }
    } else if (resetUser.meta.code === 400) {
      var responseToSring = resetUser.Data.map(function (item) {
        return Object.values(item).toString();
      });
      yield put(resetPasswordError(responseToSring.toString()));
    } else {
      yield put(resetPasswordError(resetUser.meta.Message));
    }
  } catch (error) {
    yield put(resetPasswordError(error));
  }
}

const logoutAsync = async history => {
  // await auth.signOut().then(authUser => authUser).catch(error => error);
  loggedInUser.logout();
  history.push("/");
};

function* logout({ payload }) {
  const { history } = payload;
  try {
    yield call(logoutAsync, history);
  } catch (error) { }
}

export function* watchLoginUser() {
  yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}
export function* watchLoginUniUser() {
  yield takeEvery(LOGIN_UNI_USER, loginUniUser);
}
export function* watchRegisterUser() {
  yield takeEvery(REGISTER_USER, registerUser);
}
export function* watchResetUser() {
  yield takeEvery(RESET_USER, resetWithEmail);
}
export function* watchForgetPassword() {
  yield takeEvery(FORGET_PASSWORD, forgetPassword);
}
export function* watchSendMagicLink() {
  yield takeEvery(SEND_MAGICLINK, sendMagicLink);
}
export function* watchMagicLogin() {
  yield takeEvery(MAGIC_LINK_VERIFY, magicLogin);
}
export function* watchVerifyEmailLink() {
  yield takeEvery(VERIFY_EMAIL_LINK, verifyEmailLink);
}
export function* watchUniForgetPassword() {
  yield takeEvery(UNI_FORGET_PASSWORD, uniForgetPassword);
}
export function* watchRecoverPassword() {
  yield takeEvery(RECOVER_PASSWORD, recoverPassword);
}
export function* watchLogoutUser() {
  yield takeEvery(LOGOUT_USER, logout);
}
export function* watchResetPassword() {
  yield takeEvery(RESET_PASSWORD, resetPassword);
}
export function* watchResendOtp() {
  yield takeEvery(OTP_RESEND, otpResend);
}

export default function* rootSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchVerifyEmailLink),
    fork(watchLoginUniUser),
    fork(watchLogoutUser),
    fork(watchResetPassword),
    fork(watchResetUser),
    fork(watchForgetPassword),
    fork(watchSendMagicLink),
    fork(watchMagicLogin),
    fork(watchUniForgetPassword),
    fork(watchRecoverPassword),
    fork(watchResendOtp),
    fork(watchRegisterUser)
  ]);
}
