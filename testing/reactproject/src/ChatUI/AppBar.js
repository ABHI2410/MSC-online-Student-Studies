import { Box } from "@mui/material";
import React from "react";

function CustomAppBar({ children }) {
  return (
    <Box
      height="63px"
      sx={{
        background: "#1f2c33",
        padding: "0px 20px",
      }}
    >
      {children}
    </Box>
  );
}

export default CustomAppBar;
