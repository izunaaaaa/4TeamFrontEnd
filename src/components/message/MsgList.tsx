import React from "react";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import { Note } from "../../MsgMock";

const MsgList = (props: Note) => {
  return (
    <div>
      {" "}
      <ListItem alignItems="flex-start">
        <ListItemText primary={props.title} secondary={props.content} />
      </ListItem>
      <Divider variant="inset" component="li" />
    </div>
  );
};

export default MsgList;
