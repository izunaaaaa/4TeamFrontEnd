import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/main/Main";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" Component={}/> */}
        <Route path="/main" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
