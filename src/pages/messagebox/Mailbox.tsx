import React from "react";
import List from "@mui/material/List";
import MsgList from "../../components/message/MsgList";
import { msgMock } from "../../MsgMock";
import { Note } from "../../MsgMock";

function Mailbox() {
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {msgMock?.length
        ? msgMock?.map((item: Note, idx) => {
            return (
              <div key={idx}>
                <MsgList {...item} />
              </div>
            );
          })
        : "받은 쪽지가 없습니다."}
    </List>
  );
}

export default Mailbox;
