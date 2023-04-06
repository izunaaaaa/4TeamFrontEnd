import React from "react";
import "./App.css";
import { data } from "./interface/Interface";
import Routing from "./Routing";

function App() {
  const newData: data = {
    id: 1,
    name: "ex",
    content: "ex",
  };

  console.log(newData);

  return (
    <>
      <Routing />
    </>
  );
}

export default App;
