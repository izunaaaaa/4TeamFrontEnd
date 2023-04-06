import React, { FC } from "react";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Note } from "../../MsgMock";

const MsgList = (props: Note) => {
  return (
    <div>
      {" "}
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="unknown" src="" />
        </ListItemAvatar>
        <ListItemText primary={props.title} secondary={props.content} />
      </ListItem>
      <Divider variant="inset" component="li" />
    </div>
  );
};

export default MsgList;
