import React from "react";
import { Link } from "react-router-dom";
import { ThumbDown, ThumbUp } from "@material-ui/icons";

const TopicCard = ({ topic }) => {
  return (
    <Link className="pilink" to={`/topic/${topic._id}`}>
      <li className="topics-list">
        <div className="top-div">
          <h3>{topic.topicName}</h3>
          <p>{topic.topicQuestion}</p>
        </div>
        <div className="down-div">
          <div className="down-div-1">
            <ThumbUp />
            <span>{topic.upVote.length}</span>
            <ThumbDown />
            <span>{topic.downVote.length}</span>
          </div>
          <div className="down-div-2">
            <span>
              Date: {topic.createdAt.substr(0, 10)}{" "}
              {topic.createdAt.substr(11, 8)}
            </span>
            <span>Replies: {topic.replies.length}</span>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default TopicCard;
