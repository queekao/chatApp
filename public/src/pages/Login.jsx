import React, {Fragment, useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo-1.svg";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // must input css
import axois from "axios";
import {loginRoute} from "../utils/APIRoutes";
function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (validationHandler()) {
      //Send API
      const {password, username} = values;
      const {data} = await axois.post(loginRoute, {
        username,
        password,
      });
      if (!data.status) {
        toast.error(data.msg, toastOptions);
      } else if (data.status) {
        //if we already have user log in
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
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
    const {password, username} = values;
    if (password === "") {
      toast.error("Password is required", toastOptions);
      return false;
    }
    if (username === "") {
      toast.error("Username is required", toastOptions);
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
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => inputHandler(e)}
          />
          <button type="submit">Log In</button>
          <span>
            Already have an account ? <Link to="/register">Register</Link>
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
export default Login;
