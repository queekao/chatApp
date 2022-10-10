import axios from "axios";
import React, {Fragment, useEffect, useRef, useState} from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import LogOut from "./LogOut";
import {v4 as uuidv4} from "uuid"; //unique id generator
import {getAllMessagesRoute, sendMessagesRoute} from "../utils/APIRoutes";
function ChatContainer({currentChat, currentUser, socket}) {
  //   const [msgFromChatInput, setMsgFromChatInput] = useState("");
  const [allMsg, setAllMsg] = useState([]);
  const [arrivalMsg, setArrivalMsg] = useState(null);
  const scrollRef = useRef();
  useEffect(() => {
    //Detect wherever the currentChat is changing
    if (currentChat) {
      const getAllMsg = async () => {
        const response = await axios.post(getAllMessagesRoute, {
          from: currentUser._id,
          to: currentChat._id,
        });
        setAllMsg(response.data);
      };
      getAllMsg();
    }
  }, [currentChat]); //if currentChat change we fetch data
  const sendMsgHandler = async (msg) => {
    // setMsgFromChatInput(ms g);
    await axios.post(sendMessagesRoute, {
      message: msg,
      from: currentUser._id,
      to: currentChat._id,
    });
    //emit the sending msg
    socket?.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      msg: msg,
    });
    const msgs = [...allMsg];
    console.log(msgs, msg);
    msgs.push({fromUser: true, message: msg});
    setAllMsg(msgs);
  };
  useEffect(() => {
    if (socket?.current) {
      socket?.current.on("msg-receive", (msg) => {
        setArrivalMsg({fromUser: false, message: msg});
      });
    }
  }, []);
  useEffect(() => {
    //set all arrival message
    arrivalMsg && setAllMsg((prev) => [...prev, arrivalMsg]);
  }, [arrivalMsg]);
  useEffect(() => {
    ///add scroll transition
    scrollRef.current?.scrollIntoView({behavior: "smooth"});
  }, [allMsg]);
  return (
    <Fragment>
      {currentChat && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentUser?.avatarImage}`}
                  alt="avatar"
                />
                <div className="username">
                  <h3>{currentUser?.username}</h3>
                </div>
              </div>
            </div>
            <LogOut />
          </div>
          <div className="chat-message">
            {allMsg.map((message, index) => {
              return (
                <div ref={scrollRef} key={uuidv4()}>
                  <div
                    className={`message ${
                      message.fromUser ? "sended" : "received"
                    }`}
                    key={index}
                  >
                    <div className="content">
                      <p>{message.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <ChatInput sendMsgHandler={sendMsgHandler} />
        </Container>
      )}
    </Fragment>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 78% 12%;
  gap: 0.1rem;
  overflow: hidden;
  padding-top: 1rem;
  @media screen and (min-width: 720px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    width: 95%;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        display: flex;
        align-items: center;
        gap: 1rem;
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
          font-size: 1.6rem;
        }
      }
    }
  }
  .chat-message {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    width: 95%;
    /* background-color: white; */
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 2rem;
        border-radius: 1rem;
        color: #d1d1d1;
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .received {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;
export default ChatContainer;
