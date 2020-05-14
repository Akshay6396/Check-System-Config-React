import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_ERROR,
  RESET_USER,
  RESET_USER_SUCCESS,
  RESET_USER_ERROR,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  FORGET_PASSWORD,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_ERROR,
  UNI_FORGET_PASSWORD,
  UNI_FORGET_PASSWORD_SUCCESS,
  UNI_FORGET_PASSWORD_ERROR,
  RECOVER_PASSWORD,
  RECOVER_PASSWORD_SUCCESS,
  RECOVER_PASSWORD_ERROR,
  OTP_RESEND,
  OTP_RESEND_SUCCESS,
  OTP_RESEND_ERROR,
  CUSTOM_ERROR,
  RESET_ERRORS,
  LOGIN_UNI_USER,
  LOGIN_UNI_USER_SUCCESS,
  LOGIN_UNI_USER_ERROR,
  SEND_MAGICLINK,
  SEND_MAGICLINK_SUCCESS,
  SEND_MAGICLINK_ERROR,
  MAGIC_LINK_VERIFY,
  MAGIC_LINK_VERIFY_SUCCESS,
  MAGIC_LINK_VERIFY_ERROR,
  VERIFY_EMAIL_LINK,
  VERIFY_EMAIL_LINK_ERROR,
  VERIFY_EMAIL_LINK_SUCCESS,
} from "../actions";
export const loginUser = (user, history) => ({
  type: LOGIN_USER,
  payload: { user, history }
});
export const loginUserSuccess = user => ({
  type: LOGIN_USER_SUCCESS,
  payload: user
});
export const loginUserError = message => ({
  type: LOGIN_USER_ERROR,
  payload: { message }
});
export const loginUniUser = (user, history) => ({
  type: LOGIN_UNI_USER,
  payload: { user, history }
});
export const loginUniUserSuccess = user => ({
  type: LOGIN_UNI_USER_SUCCESS,
  payload: user
});
export const loginUniUserError = message => ({
  type: LOGIN_UNI_USER_ERROR,
  payload: { message }
});
export const resetUser = (user, history) => ({
  type: RESET_USER,
  payload: { user, history }
});
export const resetUserSuccess = user => ({
  type: RESET_USER_SUCCESS,
  payload: user
});
export const resetUserError = message => ({
  type: RESET_USER_ERROR,
  payload: { message }
});
export const customError = message => ({
  type: CUSTOM_ERROR,
  payload: { message }
});

export const registerUser = (user, history) => ({
  type: REGISTER_USER,
  payload: { user, history },
});
export const registerUserSuccess = user => ({
  type: REGISTER_USER_SUCCESS,
  payload: user
});
export const registerUserError = message => ({
  type: REGISTER_USER_ERROR,
  payload: { message }
});

export const resetPassword = (user, history) => ({
  type: RESET_PASSWORD,
  payload: { user, history }
});
export const resetPasswordSuccess = user => ({
  type: RESET_PASSWORD_SUCCESS,
  payload: user
});

export const resetPasswordError = message => ({
  type: RESET_PASSWORD_ERROR,
  payload: { message }
});

export const logoutUser = history => ({
  type: LOGOUT_USER,
  payload: { history }
});
export const forgetPassword = (user, history) => ({
  type: FORGET_PASSWORD,
  payload: { user, history }
});
export const forgetPasswordError = (message) => ({
  type: FORGET_PASSWORD_ERROR,
  payload: { message }
});
export const forgetPasswordSuccess = (user) => ({
  type: FORGET_PASSWORD_SUCCESS,
  payload: user
});
export const uniForgetPassword = (user, history) => ({
  type: UNI_FORGET_PASSWORD,
  payload: { user, history }
});
export const uniForgetPasswordError = (message) => ({
  type: UNI_FORGET_PASSWORD_ERROR,
  payload: { message }
});
export const uniForgetPasswordSuccess = (user) => ({
  type: UNI_FORGET_PASSWORD_SUCCESS,
  payload: user
});
export const recoverPassword = (user, history) => ({
  type: RECOVER_PASSWORD,
  payload: { user, history }
});
export const recoverPasswordError = (message) => ({
  type: RECOVER_PASSWORD_ERROR,
  payload: { message }
});
export const recoverPasswordSuccess = (user) => ({
  type: RECOVER_PASSWORD_SUCCESS,
  payload: user
});
export const otpResend = (user, history) => ({
  type: OTP_RESEND,
  payload: { user, history }
});
export const otpResendError = (message) => ({
  type: OTP_RESEND_ERROR,
  payload: { message }
});
export const otpResendSuccess = (user) => ({
  type: OTP_RESEND_SUCCESS,
  payload: user
});
export const sendMagicLink = (user, history) => ({
  type: SEND_MAGICLINK,
  payload: { user, history }
});
export const sendMagicLinkError = (message) => ({
  type: SEND_MAGICLINK_ERROR,
  payload: { message }
});
export const sendMagicLinkSuccess = (user) => ({
  type: SEND_MAGICLINK_SUCCESS,
  payload: user
});

export const verifyEmailLink = (user, history) => ({
  type: VERIFY_EMAIL_LINK,
  payload: { user, history }
});
export const verifyEmailLinkError = (message) => ({
  type: VERIFY_EMAIL_LINK_ERROR,
  payload: { message }
});
export const verifyEmailLinkSuccess = (user) => ({
  type: VERIFY_EMAIL_LINK_SUCCESS,
  payload: user
});

export const magicLogin = (token, history) => ({
  type: MAGIC_LINK_VERIFY,
  payload: { token, history }
});
export const magicLoginError = (message) => ({
  type: MAGIC_LINK_VERIFY_ERROR,
  payload: { message }
});
export const magicLoginSuccess = (user) => ({
  type: MAGIC_LINK_VERIFY_SUCCESS,
  payload: user
});
export const resetErrors = (user) => ({
  type: RESET_ERRORS,
  payload: user
});