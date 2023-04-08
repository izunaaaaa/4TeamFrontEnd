import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/form/SignUp";
import Main from "./pages/main/Main";
import Mailbox from "./pages/messagebox/Mailbox";
import MsgComment from "./components/message/MsgComment";
import MsgRoom from "./pages/messagebox/MsgRoom";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MsgRoom />} />
        <Route path="/main" element={<Main />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
