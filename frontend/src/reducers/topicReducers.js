import {
  CLEAR_ERRORS,
  POST_TOPIC_FAIL,
  POST_TOPIC_REQUEST,
  POST_TOPIC_SUCCESS,
  ALL_TOPIC_REQUEST,
  ALL_TOPIC_SUCCESS,
  ALL_TOPIC_FAIL,
  TOPIC_DETAILS_REQUEST,
  TOPIC_DETAILS_SUCCESS,
  TOPIC_DETAILS_FAIL,
  TOPIC_REPLY_FAIL,
  TOPIC_REPLY_REQUEST,
  TOPIC_REPLY_SUCCESS,
  TOPIC_REPLY_RESET,
  TOPIC_UPVOTE_FAIL,
  TOPIC_UPVOTE_REQUEST,
  TOPIC_UPVOTE_SUCCESS,
  TOPIC_UPVOTE_RESET,
  TOPIC_DOWNVOTE_FAIL,
  TOPIC_DOWNVOTE_REQUEST,
  TOPIC_DOWNVOTE_SUCCESS,
  TOPIC_DOWNVOTE_RESET,
  TOPIC_REPLY_UPVOTE_REQUEST,
  TOPIC_REPLY_UPVOTE_SUCCESS,
  TOPIC_REPLY_UPVOTE_FAIL,
  TOPIC_REPLY_UPVOTE_RESET,
  TOPIC_REPLY_DOWNVOTE_REQUEST,
  TOPIC_REPLY_DOWNVOTE_SUCCESS,
  TOPIC_REPLY_DOWNVOTE_FAIL,
  TOPIC_REPLY_DOWNVOTE_RESET,
} from "../constants/topicConstant";

export const topicReducer = (state = { topic: [] }, action) => {
  switch (action.type) {
    case POST_TOPIC_REQUEST:
      return {
        loading: true,
      };
    case POST_TOPIC_SUCCESS:
      return {
        ...state,
        loading: false,
        topic: action.payload,
      };
    case POST_TOPIC_FAIL:
      return {
        ...state,
        loading: false,
        topic: null,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const topicsReducer = (state = { topics: [] }, action) => {
  switch (action.type) {
    case ALL_TOPIC_REQUEST:
      return {
        loading: true,
        topics: [],
      };
    case ALL_TOPIC_SUCCESS:
      return {
        loading: false,
        topics: action.payload.topics,
        topicsCount: action.payload.topicsCount,
        resultPerPage: action.payload.resultPerPage,
        filteredTopicsCount: action.payload.filteredTopicsCount,
      };
    case ALL_TOPIC_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const topicDetailsReducer = (state = { topic: {} }, action) => {
  switch (action.type) {
    case TOPIC_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case TOPIC_DETAILS_SUCCESS:
      return {
        loading: false,
        topic: action.payload,
      };
    case TOPIC_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const replyReducer = (state = {}, action) => {
  switch (action.type) {
    case TOPIC_REPLY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TOPIC_REPLY_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case TOPIC_REPLY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case TOPIC_REPLY_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const upVoteReducer = (state = {}, action) => {
  switch (action.type) {
    case TOPIC_REPLY_UPVOTE_REQUEST:
    case TOPIC_UPVOTE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TOPIC_REPLY_UPVOTE_SUCCESS:
    case TOPIC_UPVOTE_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case TOPIC_REPLY_UPVOTE_FAIL:
    case TOPIC_UPVOTE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case TOPIC_REPLY_UPVOTE_RESET:
    case TOPIC_UPVOTE_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const doDOWNVoteReducer = (state = {}, action) => {
  switch (action.type) {
    case TOPIC_REPLY_DOWNVOTE_REQUEST:
    case TOPIC_DOWNVOTE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TOPIC_REPLY_DOWNVOTE_SUCCESS:
    case TOPIC_DOWNVOTE_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case TOPIC_REPLY_DOWNVOTE_FAIL: 
    case TOPIC_DOWNVOTE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case TOPIC_REPLY_DOWNVOTE_RESET:
    case TOPIC_DOWNVOTE_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
