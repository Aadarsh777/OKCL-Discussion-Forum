import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import webFont from "webfontloader";
import "./App.css";
import store from "./store";
import Header from "./component/Header/Header.js";
import Footer from "./component/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import Register from "./component/User/Register.js";
import Login from "./component/User/Login.js";
import { loadUser } from "./actions/userAction";
import CreateTopic from "./component/Topic/CreateTopic.js";
import AllTopic from "./component/Topic/AllTopic.js";
import Contact from "./component/Contact/Contact";
import TopicDetails from "./component/TopicDetails/TopicDetails";
import Dashboard from "./component/AdminDashBoard/Dashboard";

function App() {
  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
  }, []);
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/register" element={<Register />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/post/topic" element={<CreateTopic />}></Route>
        <Route exact path="/topics" element={<AllTopic />}></Route>
        <Route exact path="/topics/:keyword" element={<AllTopic />}></Route>
        <Route exact path="/topic/:id" element={<TopicDetails />}></Route>
        <Route exact path="/dashboard" element={<Dashboard />}></Route>
        <Route exact path="/Contact" element={<Contact />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
