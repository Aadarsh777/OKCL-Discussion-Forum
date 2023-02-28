import React, { Fragment } from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <Fragment>
      <div className="section section-contact">
        <div className="container">
          <h2 className="common-heading">Contact Me</h2>
        </div>
        <div className="section-contact-main contact-container">
          <form action="https://formspree.io/f/xrgjdbej" method="POST">
            <div className="grid grid-two-column">
              <div>
                <label htmlFor="username"></label>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  id="username"
                  required
                  autoComplete="off"
                />
              </div>
              <div>
                <label htmlFor="email"></label>
                <input
                  type="email"
                  name="email"
                  placeholder="demo@mail.com"
                  id="email"
                  autoComplete="off"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject"></label>
              <input
                type="text"
                name="subject"
                placeholder="subject"
                id="subject"
                autoComplete="off"
                required
              />
            </div>
            <div>
              <label htmlFor="textaraea"></label>
              <textarea
                name="textarea"
                id="textarea"
                cols="30"
                rows="10"
                autoComplete="off"
                required
              ></textarea>
            </div>
            <div>
              <input
                type="submit"
                name="submit"
                className="btn"
                id="submit"
                value="send message"
              />
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Contact;
