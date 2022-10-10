import React, {Fragment, useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import loader from "../assets/loader.gif";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // must input css
import {registerRoute} from "../utils/APIRoutes";
import axios from "axios";
import {avatarRoute} from "../utils/APIRoutes";
import {Buffer} from "buffer";
function SetAvatar() {
  const api = "https://api.multiavatar.com/45678945"; //free avatar open source api
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };
  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = JSON.parse(localStorage.getItem("chat-app-user"));
      //In localStorage we have the complete user infomation
      const {data} = await axios.post(`${avatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });
      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Error setting avatar, Please try again", toastOptions);
      }
    }
  };
  // const selectAvatar = (e) => {
  //   e.stopPropagation();
  //   console.log(e.target.id);
  //   if (e.target.id) {
  //     setSelectedAvatar(e.target.id);
  //     console.log(e.target.style.opacity);
  //     e.target.style.opacity = 0.5;
  //     console.log(selectedAvatar);
  //   } else if (!e.target.id) {
  //     console.log(e.target);
  //     return;
  //   }
  // };
  useEffect(() => {
    const data = [];
    const fetchAvatar = async () => {
      //   console.log("update avatar");
      try {
        for (let i = 0; i < 4; i++) {
          const image = await axios.get(`${api}/${Math.random() * 1000}`);
          const buffer = new Buffer(image.data);
          data.push(buffer.toString("base64"));
          setAvatars(data);
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAvatar();
    if (!localStorage.getItem("chat-app-user")) {
      //if no user
      navigate("/login");
    }
    // console.log(selectedAvatar);
  }, []);
  return (
    <Fragment>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    id={index}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button className="submit" onClick={setProfilePicture}>
            Set as Profile picture
          </button>
        </Container>
      )}
      <ToastContainer />
    </Fragment>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #131324;
  gap: 3rem;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 1rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.2s ease-in-out;
    }
    img {
      height: 6rem;
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit {
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
      background-color: #4317bd;
    }
  }
`;
export default SetAvatar;
