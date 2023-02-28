import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer } from "./reducers/userReducers";
import {
  topicDetailsReducer,
  topicReducer,
  topicsReducer,
} from "./reducers/topicReducers";
import { getdownVote, getReply, getupVote } from "./actions/topicAction";

const reducer = combineReducers({
  user: userReducer,
  topic: topicReducer,
  topics: topicsReducer,
  topicDetails: topicDetailsReducer,
  newReply: getReply,
  newUpvote: getupVote,
  newDownvote: getdownVote,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
