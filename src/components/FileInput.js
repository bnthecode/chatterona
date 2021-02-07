import { faCamera, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { makeStyles, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";

const FileInput = (props) => {
  const {
    icon = faCamera,
    color = "grey",
    size = 40,
    style,
    fileHandler,
  } = props;

  const useStyles = makeStyles((theme) => ({
    btn: {
      cursor: "pointer",
      border: "none",
      backgroundColor: "transparent",
      "&:focus": {
        outline: "none",
        border: "none",
        backgroundColor: "transparent",
      },
    },
    icon: {
      color: color,
      fontSize: size,
    },
  }));
  const classes = useStyles();
  const [file, setFile] = useState("");

  const upload = () => {
    document.getElementById("select-image").click();
  };
  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };
// no idea why this garbage wont work
  return (
    <div style={{ display: "grid", ...style }}>
      <button className={classes.btn} onClick={upload}>
        <FontAwesomeIcon className={classes.icon} icon={icon}></FontAwesomeIcon>
      </button>

      <input id="select-image" hidden type="file" onChange={handleChange} />
    </div>
  );
};
export default FileInput;
