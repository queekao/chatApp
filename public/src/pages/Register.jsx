import React, {Fragment, useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo-1.svg";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // must input css
import axios from "axios";
import {registerRoute} from "../utils/APIRoutes";
function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/avatar");
    }
  }, []);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (validationHandler()) {
      //Send API
      // console.log("in validation", registerRoute);
      const {password, email, username} = values;
      const {data} = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      if (!data.status) {
        toast.error(data.msg, toastOptions);
      } else if (data.status) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/avatar");
      }
    }
  };
  const toastOptions = {
    // css apply
    position: "bottom-right",
    autoClose: 4000, // set the sec
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const validationHandler = () => {
    const {password, confirmPassword, email, username} = values;
    if (password !== confirmPassword) {
      toast.error("Password and confirm password should be same", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be greater than 3 characters", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("Password should be greater than 8 characters", toastOptions);
      return false;
    } else if (email.length < 3) {
      toast.error("Email should not be empty", toastOptions);
      return false;
    }
    return true;
  };
  const inputHandler = (e) => {
    setValues({...values, [e.target.name]: e.target.value}); //...values for more than one data
  };
  return (
    <Fragment>
      <FormContainer>
        <div className="brand">
          <img src={Logo} alt="logo" />
          <h1>snappy</h1>
        </div>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => inputHandler(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => inputHandler(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => inputHandler(e)}
          />
          <input
            type="password"
            placeholder="confirm Password"
            name="confirmPassword"
            onChange={(e) => inputHandler(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/Login">Log In</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
      {/* write toast container after Form container */}
    </Fragment>
  );
}
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #5d5d9b;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    img {
      width: 10rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
      font-size: 3rem;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #121212;
    border-radius: 2rem;
    padding: 4rem 6rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid white;
      border-radius: 4px;
      color: white;
      width: 100%;
      font-size: 2rem;
      &:focus {
        border: 0.2rem solid #5d5d9b;
        outline: none;
      }
    }
    button {
      background-color: #5d5d9b;
      color: white;
      border: none;
      font-weight: 700;
      cursor: pointer;
      border-radius: 0.4rem;
      text-transform: uppercase;
      font-size: 1rem;
      transition: all 0.3s;
      padding: 1.5rem;
      &:hover {
        background-color: #4e0eff;
      }
    }
    span {
      font-size: 1.5rem;
      color: white;
      text-transform: uppercase;
      a {
        color: #5d5d9b;
        font-weight: bold;
        text-transform: none;
        text-decoration: none;
        margin-left: 0.5rem;
        font-size: 2rem;
      }
    }
  }
`;
export default Register;
