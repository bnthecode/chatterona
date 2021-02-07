import { Paper, Typography } from "@material-ui/core";
import React from "react";
import ChatItemImage from "./ChatItemImage";

const ChatItem = ({ messageRef, message }) => {
  const determineMessageType = (content) => {
      console.log(content)
    switch (content.type) {
      case "text":
        return <div>{content.message}</div>;
        
      case "link":
        return <ChatItemImage url={content.url} />;
      default: return <div style={{ }}>{content.message}</div>;
    }
  };
  return (
    <div>
      <Paper
        elevation={0}
        ref={messageRef}
        style={{
          minHeight: 40,

          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "row",
          padding: 14,
          backgroundColor: "transparent",
          overflowY: "auto",
          width: "80%",
        }}
      >
        <Paper
          style={{
            backgroundImage: `url(${
              message.author ? message.author.photoURL : ""
            })`,
            borderRadius: 20,
            backgroundSize: "contain",
            height: 40,
            width: 40,
          }}
        ></Paper>
        <Typography
          style={{
            fontSize: 14,
            marginLeft: 22,

            color: "white",
            fontWeight: 600,
          }}
        >
          <Typography
            style={{
              fontSize: 12,
              color: "white",
              fontWeight: 800,
            }}
          >
            {" "}
            {message.author.name}
            <span
              style={{
                fontSize: 10,

                color: "grey",
                fontWeight: 500,
                marginLeft: 16,
              }}
            >
              {message.date}
            </span>
          </Typography>
          <div style={{ marginTop: 4 }}>
            {message.content.map((content) => <div style={{ position: 'relative'}}>{ determineMessageType(content)}</div>)}
          </div>
        </Typography>
      </Paper>
    </div>
  );
};

export default ChatItem;
