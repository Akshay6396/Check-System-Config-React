import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGIN_UNI_USER,
  LOGIN_UNI_USER_SUCCESS,
  LOGIN_UNI_USER_ERROR,
  RESET_USER,
  RESET_USER_SUCCESS,
  RESET_USER_ERROR,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
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
  LOGOUT_USER,
  CUSTOM_ERROR,
  RESET_ERRORS,
  SEND_MAGICLINK,
  SEND_MAGICLINK_SUCCESS,
  SEND_MAGICLINK_ERROR,
  MAGIC_LINK_VERIFY,
  MAGIC_LINK_VERIFY_SUCCESS,
  MAGIC_LINK_VERIFY_ERROR,
  VERIFY_EMAIL_LINK,
  VERIFY_EMAIL_LINK_SUCCESS,
  VERIFY_EMAIL_LINK_ERROR,
} from "../actions";
// import * as loggedInUser from "../../helpers/auth-service";

const INIT_STATE = {
  // user: loggedInUser.getProfile().user.user_id,
  loading: false,
  error: "",
  name: "",
  password: "",
  user_lname: "",
  user_fname: "",
  photo: "",
  mobile: "",
  otp: "",
  email: "",
  countryCode: "",
  resetUserSuccess: "",
  resetPasswordsuccess: "",
  loggedInUserSuccess: false,
  successVerifyOtp: "",
  forgetPasswordSuccess: "",
  user: "",
  signUp: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loading: true, error: "" };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedInUserSuccess: true,
        error: ""
      };
    case LOGIN_USER_ERROR:
      return {
        ...state,
        loading: false,
        user: "",
        error: action.payload.message
      };
    case LOGIN_UNI_USER:
      return { ...state, loading: true, error: "" };
    case LOGIN_UNI_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedInUserSuccess: true,
        error: ""
      };
    case LOGIN_UNI_USER_ERROR:
      return {
        ...state,
        loading: false,
        user: "",
        error: action.payload.message
      };
    case RESET_USER:
      return { ...state, loading: true, error: "" };
    case RESET_USER_SUCCESS:

      return {
        ...state,
        loading: false,
        resetUserSuccess: action.payload,
        error: ""
      };
    case RESET_USER_ERROR:
      return {
        ...state,
        loading: false,
        user: "",
        error: action.payload.message
      };
    case REGISTER_USER:
      return { ...state, loading: true, error: "" };
    case REGISTER_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload, error: "" };
      
    case REGISTER_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.message
      };
    case RESET_PASSWORD:
      return { ...state, loading: true, error: "" };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.meta.Message,
        error: action.payload.meta.Message
      };
    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        user: "",
        error: action.payload.message
      };
    case FORGET_PASSWORD:
      return {
        ...state, loading: true, error: ""
      };
    case FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        forgetPasswordSuccess: action.payload,
        error: action.payload
      };
    case FORGET_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        user: "",
        error: action.payload.message
      };
    case UNI_FORGET_PASSWORD:
      ;
      return {
        ...state, loading: true, error: ""
      };
    case UNI_FORGET_PASSWORD_SUCCESS:
      ;
      return {
        ...state,
        loading: false,
        forgetPasswordSuccess: action.payload,
        error: action.payload
      };
    case UNI_FORGET_PASSWORD_ERROR:

      return {
        ...state,
        loading: false,
        user: "",
        error: action.payload.message
      };
    case RECOVER_PASSWORD:
      return {
        ...state, loading: true, error: ""
      };
    case RECOVER_PASSWORD_SUCCESS:

      return {
        ...state,
        loading: false,
        successVerifyOtp: action.payload.meta.Message,
        error: action.payload.meta.Message
      };
    case RECOVER_PASSWORD_ERROR:

      return {
        ...state,
        loading: false,
        user: "",
        error: action.payload.message
      };
    case OTP_RESEND:
      return {
        ...state, loading: true, error: ""
      };
    case OTP_RESEND_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
        error: ""
      };
    case OTP_RESEND_ERROR:
      return {
        ...state,
        loading: false,
        user: "",
        error: action.payload.message
      };
    case SEND_MAGICLINK:
      return {
        ...state, loading: true, error: ""
      };
    case SEND_MAGICLINK_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
        error: "",
        signUp: false,
      };
    case SEND_MAGICLINK_ERROR:
      return {
        ...state,
        loading: false,
        user: "",
        signUp: true,
        error: action.payload.message
      };
    case MAGIC_LINK_VERIFY:

      return {
        ...state, loading: true, error: ""
      };
    case MAGIC_LINK_VERIFY_SUCCESS:

      return {
        ...state,
        loading: false,
        success: action.payload,
        error: ""
      };
    case MAGIC_LINK_VERIFY_ERROR:

      return {
        ...state,
        loading: false,
        user: "",
        error: action.payload.message
      };
    case VERIFY_EMAIL_LINK:

      return {
        ...state, loading: true, error: ""
      };
    case VERIFY_EMAIL_LINK_SUCCESS:

      return {
        ...state,
        loading: false,
        success: action.payload,
        error: ""
      };
    case VERIFY_EMAIL_LINK_ERROR:

      return {
        ...state,
        loading: false,
        user: "",
        error: action.payload.message
      };
    case CUSTOM_ERROR:
      return { ...state, loading: false, user: "", error: action.payload };
    case LOGOUT_USER:
      return { ...state, user: null, error: "" };
    case RESET_ERRORS:
      return { ...state, success: "", successVerifyOtp: "", error: "", user: "" };
    default:
      return { ...state };
  }
};
