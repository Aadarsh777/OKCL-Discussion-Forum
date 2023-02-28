import {
  POST_TOPIC_FAIL,
  POST_TOPIC_REQUEST,
  POST_TOPIC_SUCCESS,
  CLEAR_ERRORS,
  ALL_TOPIC_REQUEST,
  ALL_TOPIC_SUCCESS,
  ALL_TOPIC_FAIL,
  TOPIC_DETAILS_REQUEST,
  TOPIC_DETAILS_SUCCESS,
  TOPIC_DETAILS_FAIL,
  TOPIC_REPLY_FAIL,
  TOPIC_REPLY_REQUEST,
  TOPIC_REPLY_SUCCESS,
  TOPIC_UPVOTE_FAIL,
  TOPIC_UPVOTE_REQUEST,
  TOPIC_UPVOTE_SUCCESS,
  TOPIC_DOWNVOTE_FAIL,
  TOPIC_DOWNVOTE_REQUEST,
  TOPIC_DOWNVOTE_SUCCESS,
  TOPIC_REPLY_DOWNVOTE_REQUEST,
  TOPIC_REPLY_DOWNVOTE_SUCCESS,
  TOPIC_REPLY_UPVOTE_REQUEST,
  TOPIC_REPLY_UPVOTE_SUCCESS,
  TOPIC_REPLY_UPVOTE_FAIL,
  TOPIC_REPLY_DOWNVOTE_FAIL,
} from "../constants/topicConstant";

import axios from "axios";

export const postTopic = (userData) => async (dispatch) => {
  try {
    dispatch({ type: POST_TOPIC_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(`/api/v1/post/topic`, userData, config);
    dispatch({ type: POST_TOPIC_SUCCESS, payload: data.topic });
  } catch (error) {
    dispatch({
      type: POST_TOPIC_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getTopics =
  (keyword = "", currentPage = 1) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ALL_TOPIC_REQUEST,
      });

      let link = `/api/v1/topics?keyword=${keyword}&page=${currentPage}`;

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_TOPIC_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_TOPIC_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getTopicDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: TOPIC_DETAILS_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/topic/${id}`);

    dispatch({
      type: TOPIC_DETAILS_SUCCESS,
      payload: data.topic,
    });
  } catch (error) {
    dispatch({
      type: TOPIC_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getReply = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: TOPIC_REPLY_REQUEST,
    });
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.put(`/api/v1/reply`, userData, config);

    dispatch({
      type: TOPIC_REPLY_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: TOPIC_REPLY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getupVote = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: TOPIC_UPVOTE_REQUEST,
    });
    const { data } = await axios.put(`/api/v1/upvote`, userData);

    dispatch({
      type: TOPIC_UPVOTE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: TOPIC_UPVOTE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getdownVote = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: TOPIC_DOWNVOTE_REQUEST,
    });
    const { data } = await axios.put(`/api/v1/downvote`, userData);

    dispatch({
      type: TOPIC_DOWNVOTE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: TOPIC_DOWNVOTE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getreplyupVote = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: TOPIC_REPLY_UPVOTE_REQUEST,
    });
    const { data } = await axios.put(`/api/v1/reply/upvote`, userData);

    dispatch({
      type: TOPIC_REPLY_UPVOTE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: TOPIC_REPLY_UPVOTE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getreplydownVote = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: TOPIC_REPLY_DOWNVOTE_REQUEST,
    });
    const { data } = await axios.put(`/api/v1/reply/downvote`, userData);

    dispatch({
      type: TOPIC_REPLY_DOWNVOTE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: TOPIC_REPLY_DOWNVOTE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
