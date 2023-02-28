import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors, register } from "../../actions/userAction";
import "./Register.css";

const Register = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phoneNo: "",
  });
  const { name, email, password, phoneNo } = user;

  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("phoneNo", phoneNo);
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, alert, error, isAuthenticated, navigate]);

  return (
    <div className="register">
      <h1>Register</h1>
      <form className="register-form" action="" onSubmit={registerSubmit}>
        <input
          type="text"
          required
          name="name"
          placeholder="Name"
          value={name}
          onChange={registerDataChange}
        />

        <input
          type="email"
          required
          name="email"
          placeholder="Email"
          value={email}
          onChange={registerDataChange}
        />
        <input
          type="number"
          required
          size={10}
          name="phoneNo"
          value={phoneNo}
          onChange={registerDataChange}
          placeholder="Mobile Number"
        />
        <input
          type="password"
          required
          name="password"
          value={password}
          onChange={registerDataChange}
          placeholder="Password"
        />
        <button>Register</button>
        <p>
          Already have a account. Go to <Link to="/login" className="link">Login</Link>Page
        </p>
      </form>
    </div>
  );
};

export default Register;
