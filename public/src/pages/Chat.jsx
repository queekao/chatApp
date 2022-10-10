import axios from "axios";
import React, {useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import {userRoute, host} from "../utils/APIRoutes";
import {io} from "socket.io-client";
function Chat() {
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsloaded] = useState(false);
  const socket = useRef();
  const navigate = useNavigate();
  // const user = useMemo(() => {
  //   {avatar:currentUser.avatar}
  // },[])
  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/Login");
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")));
      // console.log("set user");
    }
    const fetchData = async () => {
      const data = await axios.get(`${userRoute}/${currentUser._id}`);
      setContacts(data.data);
    };
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
      //wherever the current user log in send id to the backend
      if (currentUser.isAvatarImageSet) {
        fetchData();
        // console.log(contacts);
        setIsloaded(true);
      } else {
        navigate("/avatar");
      }
    }
  }, [currentUser?.isAvatarImageSet]);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <Container>
      <div className="container">
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />
        {!currentChat && isLoaded ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatContainer
            currentUser={currentUser ? currentUser : ""}
            currentChat={currentChat ? currentChat : ""}
            socket={socket}
          />
        )}
      </div>
    </Container>
  );
}
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #2b2b50;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
export default Chat;
