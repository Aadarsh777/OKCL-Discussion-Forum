import React, { Fragment, useEffect, useState, useRef } from "react";
import { getElementsAtEvent, Line } from "react-chartjs-2";
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

const MostReplies = () => {
  const { loading, topics, error } = useSelector((state) => state.topics);
  const dispatch = useDispatch();
  const alert = useAlert();

  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Top 10 downVote Topics",
        data: [],
        backgroundColor: "rgba(22, 224, 225, 0.717)",
        borderColor: "rgba(224, 255, 22, 0.717)",
        tension: 0.5,
        fill: true,
        pointBorderColor: "rgba(0, 22, 225, 0.717)",
        link: [],
      },
    ],
  });

  const chartRef = useRef();
  const onClick = (e) => {
    if (getElementsAtEvent(chartRef.current, e).length > 0) {
      const clickDatasetIndex = getElementsAtEvent(chartRef.current, e)[0]
        .datasetIndex;
      const DataPoint = getElementsAtEvent(chartRef.current, e)[0].index;
      const link = data.datasets[clickDatasetIndex].link[DataPoint];
      window.open(link, "_self");
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    const fetchData = async () => {
      const { data } = await axios.get(`/api/v1/topics`);
      const topics = data.topics;
      topics.sort(function (a, b) {
        return b.replies.length - a.replies.length;
      });
      const slicedTopics = topics.slice(0, 10);
      const labels = slicedTopics.map(function (topic) {
        return topic.topicName;
      });

      const data1 = slicedTopics.map(function (topic) {
        return topic.replies.length;
      });

      const links = slicedTopics.map(function (topic) {
        return `/topic/${topic._id}`;
      });

      setData({
        labels: labels,
        datasets: [
          {
            label: "Most Replies",
            data: data1,
            backgroundColor: "rgba(22, 224, 225, 0.717)",
            borderColor: "rgba(224, 255, 22, 0.717)",
            tension: 0.5,
            fill: true,
            pointBorderColor: "rgba(0, 22, 225, 0.717)",
            link: links,
          },
        ],
      });
    };
    fetchData();
  }, [dispatch, error, alert]);

  return <Fragment>
  <div className="most-replies">
    {<Line data={data} onClick={onClick} ref={chartRef}></Line>}
  </div>
</Fragment>
};

export default MostReplies;
