import { Typography } from "@material-ui/core"

const ServerHeader = ({ serverName }) => {
    return (
        <Typography
        style={{ color: "white", fontWeight: 600 }}
        variant="h6"
      >
        {serverName}
      </Typography>
    )
}

export default ServerHeader;