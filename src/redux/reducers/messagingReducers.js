// messagingReducers.js
import {
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAIL,
  GET_MESSAGES_REQUEST,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAIL,
  EMAIL_SEND_REQUEST,
  EMAIL_SEND_SUCCESS,
  EMAIL_SEND_FAIL,
  CLEAR_MESSAGE_COUNTER_REQUEST,
CLEAR_MESSAGE_COUNTER_SUCCESS,
CLEAR_MESSAGE_COUNTER_FAIL,
GET_USER_MESSAGES_REQUEST,
GET_USER_MESSAGES_SUCCESS,
GET_USER_MESSAGES_FAIL,
} from "../constants/messagingConstants";

const initialState = {
  sending: false,
  sendingError: null,
  messages: [],
  loading: false,
  loadingError: null,
  success: false,
  sent: false,
  error: null,
};

export const getUserMessagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_MESSAGES_REQUEST:
      return { loading: true };
    case GET_USER_MESSAGES_SUCCESS:
      return {
        loading: false,
        success: true,
        messages: action.payload,
      };

    case GET_USER_MESSAGES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const clearMessageCounterReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_MESSAGE_COUNTER_REQUEST:
      return { loading: true };
    case CLEAR_MESSAGE_COUNTER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case CLEAR_MESSAGE_COUNTER_FAIL:
      return { loading: false, error: action.payload }; 
    default:
      return state;
  }
};

export const messagingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE_REQUEST:
      return { ...state, sending: true, sendingError: null };
    case SEND_MESSAGE_SUCCESS:
      return { ...state, sending: false, success: true };
    case SEND_MESSAGE_FAIL:
      return { ...state, sending: false, sendingError: action.payload };

    case GET_MESSAGES_REQUEST:
      return { ...state, loading: true, loadingError: null };
    case GET_MESSAGES_SUCCESS:
      return { ...state, loading: false, messages: action.payload };
    case GET_MESSAGES_FAIL:
      return { ...state, loading: false, loadingError: action.payload };

    default:
      return state;
  }
};
 
export const sendEmailReducer = (state = initialState, action) => { 
  switch (action.type) {
    case EMAIL_SEND_REQUEST:
      return {
        ...state,
        sending: true,
        sent: false,
        error: null,
      };
    case EMAIL_SEND_SUCCESS:
      return {
        ...state,
        sending: false,
        sent: true,
        error: null,
      };
    case EMAIL_SEND_FAIL:
      return {
        ...state,
        sending: false,
        sent: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
