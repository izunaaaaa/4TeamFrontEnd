import React from "react";
import { data } from "./interface/Interface";
import Routing from "./Routing";

function App() {
  const newData: data = {
    id: 1,
    name: "fwe",
    content: "few",
  };

  console.log(newData);

  return (
    <>
      <Routing />
    </>
  );
}

export default App;
