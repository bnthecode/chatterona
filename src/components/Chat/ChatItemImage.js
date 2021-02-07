

const ChatItemImage = ({ url }) => {
    return <img
    
        src={url}
        style={{
          maxWidth: "400px",
          maxHeight: "400px",
          objectFit: "contain",
        }}
 
      />
}

export default ChatItemImage;