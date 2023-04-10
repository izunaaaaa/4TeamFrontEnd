import React from "react";
import { List, ListItem, Divider } from "@chakra-ui/react";
import { Note } from "../../MsgMock";

const MsgList = (props: Note) => {
  return (
    <div>
      {" "}
      <List alignItems="flex-start">
        <ListItem>{props.title}</ListItem>
        <ListItem>{props.content}</ListItem>
      </List>
      <Divider />
    </div>
  );
};

export default MsgList;
