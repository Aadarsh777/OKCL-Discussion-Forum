import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearErrors, postTopic } from "../../actions/topicAction";
import "./CreateTopic.css";

const CreateTopic = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.topic);
  const { user } = useSelector((state) => state.user);
  const alert = useAlert();
  const navigate = useNavigate();
  const [topic, setTopic] = useState({
    topicName: "",
    topicQuestion: "",
    topicDescription: "",
  });

  const { topicName, topicQuestion, topicDescription } = topic;

  const postSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("topicName", topicName);
    myForm.set("topicQuestion", topicQuestion);
    myForm.set("topicDescription", topicDescription);
    dispatch(postTopic(myForm));
    alert.success("Topic Created");
    topic.topicName = "";
    topic.topicQuestion = "";
    topic.topicDescription = "";
  };

  const postDataChange = (e) => {
    setTopic({ ...topic, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  return (
    <div className="createTopic">
      <h1>Create a Topic</h1>
      <form action="" onSubmit={postSubmit}>
        <input
          className="topicInput"
          type="text"
          name="topicName"
          placeholder="Enter the Topic Name"
          value={topicName}
          onChange={postDataChange}
        />
        <input
          className="topicInput"
          type="text"
          name="topicQuestion"
          placeholder="Enter the Question"
          value={topicQuestion}
          onChange={postDataChange}
        />
        <textarea
          className="topicTextArea"
          name="topicDescription"
          value={topicDescription}
          placeholder="Enter the Topic Description"
          cols="30"
          rows="10"
          onChange={postDataChange}
        ></textarea>
        <button className="createTopicButton">Post</button>
      </form>
    </div>
  );
};

export default CreateTopic;
