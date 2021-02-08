const ChatItemImage = ({ content }) => {

const { url } = content;
  return (
    <a
      tabindex="0"
      href={url}
      rel="noreferrer noopener"
      target="_blank"
      role="button"
      style={{ maxWidth: "400px", maxHeight: "400px" }}
    >
      <img
        alt=""
        src={url}
        style={{ maxWidth: "400px", maxHeight: "400px" }}
      />
    </a>
  );
};

export default ChatItemImage;
