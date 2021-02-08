
import { makeStyles } from "@material-ui/core";
import axios from "axios";



const useStyles = makeStyles(() => ({
    iframe: {
        height: 200,
        width: 200
    }
}))
const ChatItemLink = ({ content }) => {
    const classes = useStyles()
  const meta = new URL(content.url);


  return (
    <div style={{ display: "flex", marginTop: 8, flexDirection: "column", height: 400, width: 400, backgroundColor: '#2f3136' }}>
        
      <a
        tabindex="0"
        href={meta.href}
        id="linker"
        rel="noreferrer noopener"
        target="_blank"
        role="button"
        style={{
          maxWidth: "400px",
          textDecoration: "none",
          color: "#2196f3",
          maxHeight: "400px",
        }}
      >
        {meta.host.split('.')[1]}
      </a>

    </div>
  );
};

export default ChatItemLink;
