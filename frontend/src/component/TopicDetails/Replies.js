import {
  Edit,
  ThumbDownAltOutlined,
  ThumbUpAltOutlined,
} from "@material-ui/icons";
import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearErrors, getreplydownVote, getreplyupVote, getTopicDetails } from "../../actions/topicAction";

const Replies = ({ reply, replyEditHandler }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { topic, loading, error: topicError } = useSelector((state) => state.topicDetails);

  const {user, error} = useSelector(state => state.user);

  const upVoteReplyHandler = (e) => {
    const res = {
      topicId: topic._id,
      repliesId: reply._id,
    }
    dispatch(getreplyupVote(res));
    window.setTimeout(function () {
      window.location.reload();
    }, 1000);

    if(document.getElementById("replydownVote").classList.contains("active")){
      document.getElementById("replydownVote").classList.remove("active");
    }
  };

  user && reply.repliesupVote && reply.repliesupVote.length > 0 && reply.repliesupVote.forEach((rev) => {
    if(rev.user.toString() === user._id.toString()) {
      document.getElementById("replyupVote").classList.add("active");
    }
  })

  const downVoteReplyHandler = (e) => {
    const res = {
      topicId: topic._id,
      repliesId: reply._id,
    }
    dispatch(getreplydownVote(res));
    window.setTimeout(function () {
      window.location.reload();
    }, 1000);

    if(document.getElementById("replyupVote").classList.contains("active")){
      document.getElementById("replyupVote").classList.remove("active");
    }
  }

  user && reply.repliesdownVote && reply.repliesdownVote.length > 0 && reply.repliesdownVote.forEach((rev) => {
    if(rev.user.toString() === user._id.toString()) {
      document.getElementById("replydownVote").classList.add("active");
    }
  })

  useEffect(() => {
    if(topicError) {
      alert.error(topicError);
      dispatch(clearErrors());
    }
    if(error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [])
  

  return (
    <Fragment>
      <div className="reply-section">
        <div className="reply-name">
          <h4>{reply.name}</h4>
          <Edit onClick={() => replyEditHandler()} />
        </div>
        <div className="reply-comment">
          <p>{reply.comment}</p>
        </div>
        <div className="replies-vote">
          <span id="replyupVote" onClick={upVoteReplyHandler}>
            <ThumbUpAltOutlined />
            <p>{reply.repliesupVote && reply.repliesupVote.length}</p>
          </span>
          <span id="replydownVote" onClick={downVoteReplyHandler}>
            <ThumbDownAltOutlined />
            <p>{reply.repliesdownVote && reply.repliesdownVote.length}</p>
          </span>
        </div>
      </div>
    </Fragment>
  );
};

export default Replies;
