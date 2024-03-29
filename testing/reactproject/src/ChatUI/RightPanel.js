import React from "react";
import {
  Avatar,
  Box,
  IconButton,
  Input,
  Typography,
} from "@mui/material";
import CustomAppBar from "./AppBar";
import SearchIcon from "@mui/icons-material/Search";
import CustomMenuButton from "./MenuButtom";
import { rightPanelMenuItem } from "./utils/constants";
import MoodIcon from "@mui/icons-material/Mood";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MicIcon from "@mui/icons-material/Mic";

export default function RightPanel() {
  const globalIconStyle = {
    color: "#8696a1",
    height: "28px",
    width: "28px",
  };

  return (
    <Box height="100%" width="70%" display="flex" flexDirection="column">
      <CustomAppBar>
        <Box
          width="100%"
          height="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box display="flex">
            <Avatar />
            <Box
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              pl="10px"
            >
              <Typography variant="body1" color="white">
                Balram
              </Typography>
              <Typography variant="caption" color="#8496a0">
                online
              </Typography>
            </Box>
          </Box>
          <Box display="flex">
            <IconButton onClick={() => {}}>
              <SearchIcon
                sx={{
                  color: "#afbac0",
                }}
              />
            </IconButton>
            <CustomMenuButton menuItems={rightPanelMenuItem} />
          </Box>
        </Box>
      </CustomAppBar>
      <Box height="85.2%">
        <Box
          height="100%"
          width="100%"
          component="img"
          alt="background"
        />
      </Box>
      <Box
        height="62px"
        alignItems="center"
        display="flex"
        sx={{
          background: "#1f2c33",
          padding: "0px 15px",
        }}
      >
        <IconButton onClick={() => {}}>
          <MoodIcon sx={globalIconStyle} />
        </IconButton>
        <IconButton onClick={() => {}}>
          <AttachFileIcon
            sx={{
              ...globalIconStyle,
              transform: "rotateY(0deg) rotate(45deg)",
            }}
          />
        </IconButton>
        <Box flex={1} pl="5px" pr="5px">
          <Input
            fullWidth
            disableUnderline
            placeholder="Type a message"
            sx={{
              background: "#2b3943",
              height: "42px",
              borderRadius: "6px",
              color: "white",
              padding: "0px 10px",
            }}
          />
        </Box>
        <IconButton onClick={() => {}}>
          <MicIcon sx={globalIconStyle} />
        </IconButton>
      </Box>
    </Box>
  );
}
