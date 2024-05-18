import {Box} from "@mui/material";
import ActiveChat from "@/components/active-chat/activeChat";
import ChatsListContainer from "@/components/chat-list-container/chatListContainer";
import * as React from "react";

export default function Chats() {
    return <Box sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "5vh"
    }}>
        <ChatsListContainer />
        <Box sx={{
            display: "flex",
            flexDirection: "row",
            width: "50vw",
            height: "100vh",
            border: 3,
            borderColor: "primary.main",
            borderRadius: "16px"
        }}>
            <ActiveChat />
        </Box>
    </Box>
}