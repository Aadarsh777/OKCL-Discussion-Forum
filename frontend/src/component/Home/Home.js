import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { clearErrors, getTopics } from "../../actions/topicAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import TopicCard from "../Topic/TopicCard";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, topics } = useSelector((state) => state.topics);
  const topicSubmit = () => {
    navigate("/post/topic");
  };

  topics.sort(function (a, b) {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getTopics());
  }, [dispatch, error, alert]);

  return (
    <div className="home">
      <button className="topic-button" onClick={topicSubmit}>
        CREATE YOUR TOPIC
      </button>
      <h1>TOPICS.</h1>
      <div className="topics-container">
        <ul className="topics">
          {topics &&
            topics.map((topic) => <TopicCard key={topic._id} topic={topic} />)}
        </ul>
      </div>
    </div>
  );
};

export default Home;
