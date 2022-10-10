import React from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {BiLogIn} from "react-icons/bi";
import axios from "axios";
function LogOut() {
  const navigate = useNavigate();
  const handleLogOut = async () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <Button onClick={handleLogOut}>
      <BiLogIn />
    </Button>
  );
}
const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  svg {
    font-size: 2rem;
    color: #ebe7ff;
  }
`;

export default LogOut;
