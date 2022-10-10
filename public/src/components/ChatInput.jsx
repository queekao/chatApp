import React, {useState} from "react";
import styled from "styled-components";
import EmojiPicker from "emoji-picker-react";
import {IoMdSend} from "react-icons/io";
import {BsEmojiSmileFill} from "react-icons/bs";
function ChatInput({sendMsgHandler}) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");
  const emojiPickerHandler = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  const emojiClickHandler = (emoji, event) => {
    let message = msg;
    // console.log(emoji);
    message += emoji.emoji;
    setMsg(message);
  };
  const msgHandler = (e) => {
    setMsg(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (msg.length > 0) {
      sendMsgHandler(msg);
      setMsg("");
    }
  };
  return (
    <Container>
      <div className="button-container">
        <div className="emoji" onClick={emojiPickerHandler}>
          <BsEmojiSmileFill />
          {showEmojiPicker && <EmojiPicker onEmojiClick={emojiClickHandler} />}
        </div>
      </div>
      <form className="input-container" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="type your message here"
          value={msg}
          onChange={msgHandler}
        />
        <button className="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  background-color: #080420;
  padding: 1rem 1.5rem;
  width: 100%;
  .input-container {
    width: 90%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    background-color: #ffffff34;
    margin-left: 1.5rem;
    input {
      height: 60%;
      width: 90%;
      background-color: transparent;
      padding: 1rem 0;
      padding-left: 1rem;
      font-size: 1.6rem;
      border: none;
      color: white;
      &::selection {
        background-color: #9186f3;
      }
      &:focus {
        outline: none;
      }
    }
    .submit {
      padding: 0.7rem 2rem;
      border-radius: 0 4rem 4rem 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      cursor: pointer;
      border: none;
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    .emoji {
      position: relative;
      svg {
        font-size: 2.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .EmojiPickerReact {
        position: absolute;
        top: -48rem;
        background-color: #080420;
        box-shadow: 0 5px 10px rgba(#9a86f3, 0.2);
        border-color: #9186f3;
        height: 20rem;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
          .emoji-search {
            background-color: transparent;
            border-color: #9186f3;
          }
          .emoji-group:before {
            background-color: #080420;
          }
        }
      }
    }
  }
`;

export default ChatInput;
