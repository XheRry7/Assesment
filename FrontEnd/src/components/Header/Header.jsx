import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function Header({ LogOutHandler }) {
  return (
    <React.Fragment>
      <Toolbar
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          backgroundColor: "#1976d2",
          color: "white",
        }}
      >
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          Registered Cars
        </Typography>
        <div style={{ backgroundColor: "gray" }}>
          <Button variant="filled" size="small" onClick={LogOutHandler}>
            Sign Out
          </Button>
        </div>
      </Toolbar>
    </React.Fragment>
  );
}

export default Header;
