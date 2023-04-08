import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/form/SignUp";
import Main from "./pages/main/Main";
import Mailbox from "./pages/messagebox/Mailbox";
import MsgNote from "./components/message/MsgNote";
import Layout from "./UI/Layout";
import Feed from "./pages/main/Feed";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MsgNote />} />
        <Route path="/main" element={<Main />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/home"
          element={
            <Layout>
              <Feed />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
