import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import "./AllTopic.css";
import TopicCard from "./TopicCard";
import Pagination from "react-js-pagination";
import { clearErrors, getTopics } from "../../actions/topicAction";
import Search from "../Search/Search";
import { useParams } from "react-router-dom";

const AllTopic = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [currentPage, setCurrentPage] = useState(1);
  const {keyword} = useParams();
  const {
    loading,
    topics,
    error,
    topicsCount,
    resultPerPage,
    filteredTopicsCount,
  } = useSelector((state) => state.topics);

  topics.sort(function (a, b) {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  let count = filteredTopicsCount;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getTopics(keyword, currentPage));
  }, [dispatch, error, alert, keyword, currentPage]);

  return (
    <Fragment>
      <Search />
      <h2 className="topicsHeading">Topics</h2>
      <div className="topics">
        {topics &&
          topics.map((topic) => <TopicCard key={topic._id} topic={topic} />)}
      </div>
      {resultPerPage < count && (
        <div className="paginationBox">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resultPerPage}
            totalItemsCount={topicsCount}
            onChange={setCurrentPageNo}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="1st"
            lastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          />
        </div>
      )}
    </Fragment>
  );
};

export default AllTopic;
