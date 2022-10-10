import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Chat from "./pages/Chat.jsx";
import SetAvatar from "./pages/setAvatar.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/avatar" element={<SetAvatar />} />
        <Route path="/" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
