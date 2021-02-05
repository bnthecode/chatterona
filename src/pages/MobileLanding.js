import { Typography } from "@material-ui/core";

const MobileLanding = () => {
  return (
    <div
      style={{
        display: "flex",
        color: "white",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h5" style={{ marginTop: "25vh", color: "white" }}>
        Welcome to Chatterona
      </Typography>
      <br />
      <Typography variant="body1">
        At this time we do not offer a mobile desktop version.
        <br />
        <br />
      </Typography>
      <Typography variant="caption">
        Be on the lookout for Chatterona in the AppStore <br />
      </Typography>
    </div>
  );
};

export default MobileLanding;
