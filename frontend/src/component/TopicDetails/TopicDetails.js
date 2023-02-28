import React, { Fragment, useEffect, useState } from "react";
import "./TopicDetails.css";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  clearErrors,
  getdownVote,
  getReply,
  getTopicDetails,
  getupVote,
} from "../../actions/topicAction";
import {
  LaptopWindows,
  ThumbDownAltOutlined,
  ThumbUpAltOutlined,
} from "@material-ui/icons";
import Replies from "./Replies";
import {
  TOPIC_DOWNVOTE_RESET,
  TOPIC_REPLY_RESET,
  TOPIC_UPVOTE_RESET,
} from "../../constants/topicConstant";

const TopicDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const [reply, setReply] = useState("");
  const { topic, loading, error } = useSelector((state) => state.topicDetails);
  const { success, error: replyError } = useSelector((state) => state.newReply);
  const { success: upVoteSuccess, error: upVoteError } = useSelector(
    (state) => state.newUpvote
  );
  const { success: downVoteSuccess, error: downVoteError } = useSelector(
    (state) => state.newDownvote
  );

  const { user } = useSelector((state) => state.user);

  const replySubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("comment", reply);
    myForm.set("topicId", topic._id);
    dispatch(getReply(myForm));
    window.setTimeout(function () {
      window.location.reload();
    }, 3000);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (replyError) {
      alert.error(replyError);
      dispatch(clearErrors());
    }
    if (upVoteError) {
      alert.error(upVoteError);
      dispatch(clearErrors());
    }
    if (downVoteError) {
      alert.error(downVoteError);
      dispatch(clearErrors());
    }
    if (success) {
      alert.show("Review Submitted Successfully");
      dispatch({ type: TOPIC_REPLY_RESET });
    }
    if (upVoteSuccess) {
      alert.show("Upvote Submitted Successfully");
      dispatch({ type: TOPIC_UPVOTE_RESET });
    }
    if (downVoteSuccess) {
      alert.show("Downvote Submitted Successfully");
      dispatch({ type: TOPIC_DOWNVOTE_RESET });
    }
    dispatch(getTopicDetails(id));
  }, [
    dispatch,
    id,
    error,
    alert,
    success,
    replyError,
    upVoteError,
    upVoteSuccess,
    downVoteError,
    downVoteSuccess,
  ]);

  const replyEditHandler = () => {
    document.getElementById("oke").focus();
    document.getElementById("oke").select();
  };

  const upVoteClickHandler = (e) => {
    const res = {
      topicId: topic._id,
    };
    dispatch(getupVote(res));
    if (document.getElementById("downVote").classList.contains("active")) {
      document.getElementById("downVote").classList.remove("active");
    }
    window.setTimeout(function () {
      window.location.reload();
    }, 1000);
  };

  user &&
    topic.upVote &&
    topic.upVote.length > 0 &&
    topic.upVote.forEach((rev) => {
      if (rev.user.toString() === user._id.toString()) {
        document.getElementById("upVote").classList.add("active");
      }
    });

  const downVoteClickHandler = (e) => {
    const res = {
      topicId: topic._id,
    };
    dispatch(getdownVote(res));
    if (document.getElementById("upVote").classList.contains("active")) {
      document.getElementById("upVote").classList.remove("active");
    }
    window.setTimeout(function () {
      window.location.reload();
    }, 1000);
  };

  user &&
    topic.downVote &&
    topic.downVote.length > 0 &&
    topic.downVote.forEach((rev) => {
      if (rev.user.toString() === user._id.toString()) {
        document.getElementById("downVote").classList.add("active");
      }
    });

  return (
    <Fragment>
      <div className="topicDetails">
        <div className="topic-container">
          <h1>{topic.topicName}</h1>
          <p className="topic-detail">{topic.topicQuestion}</p>
          <p className="topic-details">{topic.topicDescription}</p>
          <div>
            <span>
              <p id="upVote" className="reply-svg" onClick={upVoteClickHandler}>
                <ThumbUpAltOutlined />
              </p>
              <p className="reply-vote">
                {topic.upVote && topic.upVote.length}
              </p>
            </span>
            <span>
              <p
                id="downVote"
                className="reply-svg"
                onClick={downVoteClickHandler}
              >
                <ThumbDownAltOutlined />
              </p>
              <p className="reply-vote">
                {topic.downVote && topic.downVote.length}
              </p>
            </span>
          </div>
        </div>
        <div className="topic-reply">
          <h1 className="form-h1">Reply on the Topic</h1>
          <form className="form-reply" action="" onSubmit={replySubmitHandler}>
            <textarea
              name="Reply"
              placeholder="Enter You Reply...."
              id="oke"
              cols="30"
              rows="10"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            ></textarea>
            <button>Reply</button>
          </form>
        </div>
        <div className="replies-container">
          <h2>Replies</h2>

          {topic.replies && topic.replies[0] ? (
            topic.replies.map((reply) => (
              <div className="replies" key={reply._id}>
                <Replies replyEditHandler={replyEditHandler} reply={reply} />
              </div>
            ))
          ) : (
            <p className="no-reply">No Replies Yet</p>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default TopicDetails;
