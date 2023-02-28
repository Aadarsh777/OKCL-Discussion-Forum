import React, { Fragment, useEffect, useState, useRef } from "react";
import { getElementsAtEvent, Line } from "react-chartjs-2";
import "./Dashboard.css";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from "../../actions/topicAction";
import { useAlert } from "react-alert";
import axios from "axios";
import Top10Downvote from "./Top10Downvote";
import Top10UpVote from "./Top10Upvote";
import TopicCount from "./TopicCount";
import MostReplies from "./MostReplies";

ChartJS.register(
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
);

const Dashboard = () => {
  return (
    <Fragment>
      <div className="dashboard">
        <Top10UpVote />
        <Top10Downvote />
      </div>
      <div className="dashboard-2">
        <TopicCount />
        <MostReplies />
      </div>
    </Fragment>
  );
};

export default Dashboard;
