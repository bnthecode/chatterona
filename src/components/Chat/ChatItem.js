import { Paper, Typography } from "@material-ui/core";
import React from "react";
import ChatItemImage from "./ChatItemImage";
import ChatItemLink from "./ChatItemLink";
import ChatItemText from "./ChatItemText";

const ChatItem = ({ messageRef, message }) => {
  console.log('this is the message recieved', message)
  const components = {
    image: ChatItemImage,
    link: ChatItemLink,
    text: ChatItemText,
  };

  const determineMessageType = (content) => {
    const isImage = content.type ? content.type.includes("image") : false;
    const isText = content.type === "text";
    const isExternalLink = content.type === "link";
    const component = [
      { name: "image", active: isImage },
      { name: "text", active: isText },
      { name: "link", active: isExternalLink },
    ].find((n) => n.active);
 
    const Component = component ? components[component.name] : components["text"];

    return <Component content={content} />;
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
          width: "90%",
          position: "relative",
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
            width: "100%",
            color: "white",
            fontWeight: 600,
          }}
        >
          <Typography
            style={{
              fontSize: '1rem',
              color: "white",
              fontWeight: 500,
              lineHeight: '1.375rem'
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
          <div style={{ marginTop: 4, width: "100%" }}>
            {message.content.map((content) => (
              <div>{determineMessageType(content)}</div>
              // <div>{content.message}</div>
            ))}
          </div>
        </Typography>
      </Paper>
    </div>
  );
};

export default ChatItem;
