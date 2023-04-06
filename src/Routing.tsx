import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/form/SignUp";
import Main from "./pages/main/Main";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" Component={}/> */}
        <Route path="/main" element={<Main />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
