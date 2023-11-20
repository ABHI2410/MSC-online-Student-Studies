import React from "react";
import {
  Avatar,
  Box,
  IconButton,
  Input,
} from "@mui/material";
import CustomAppBar from "./AppBar";
import CustomMenuButton from "./MenuButtom";
import { leftPanelMenuItem } from "./utils/constants";
import ChatIcon from "@mui/icons-material/Chat";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import ChatCard from "./ChatCard.js";

const localChats = [
  {
    name: "Balram",
    lastText: "Hey there testing whatsapp",
    lastSeen: "4:21 PM",
    selected: true,
  },
  // ... (rest of the localChats array)
];

export default function LeftPanel() {
  return (
    <Box height="100%" width="30%" overflow="hidden">
      <CustomAppBar>
        <Box
          width="100%"
          height="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Avatar />
        </Box>
      </CustomAppBar>
      <Box
        sx={{
          background: "#101b20",
          padding: "12px",
        }}
        display="flex"
      >
        <Box
          display="flex"
          sx={{
            background: "#1f2c33",
            borderRadius: "8px",
            padding: "0px 8px",
          }}
          flex={1}
          alignItems="center"
        >
          <IconButton onClick={() => {}}>
            <SearchIcon
              sx={{
                color: "#8696a1",
                height: "20px",
                width: "20px",
              }}
            />
          </IconButton>
          <Input
            fullWidth
            disableUnderline
            placeholder="Search or start a new chat"
            sx={{
              height: "35px",
              color: "white",
              padding: "0px 13px",
              fontSize: "14px",
            }}
          />
        </Box>
        <IconButton onClick={() => {}}>
          <FilterListIcon
            sx={{
              color: "#8696a1",
              height: "20px",
              width: "20px",
            }}
          />
        </IconButton>
      </Box>
      <Box
        overflow="auto"
        height="90%"
        sx={{
          background: "#101b20",
        }}
      >
        {localChats.map((item) => (
          <ChatCard item={item} key={item.name} />
        ))}
        <Box pt="50px" />
      </Box>
    </Box>
  );
}
