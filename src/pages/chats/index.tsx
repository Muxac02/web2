import {Box} from "@mui/material";
import ActiveChat from "@/components/active-chat/activeChat";
import ChatsListContainer from "@/components/chat-list-container/chatListContainer";
import * as React from "react";
import LogoutButton from "@/components/logout-button/logout";
import { io } from "socket.io-client";
import {useEffect} from "react";

export const socket = io("localhost:8080");

export default function Chats() {

    socket.on("chat_updated", (payload)=> {
        console.log("Chat updated", payload)
    })

    useEffect(()=>{
        socket.connect();
        return ()=>{socket.disconnect();}
    }, [])

    return <Box sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        marginBottom: "5vh"
    }}>
    <Box sx={{
        display: "flex",
        height: "95%",
        width: "20%",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        flexDirection: "column",
        m:1
    }}>
        <LogoutButton />
        <ChatsListContainer />
    </Box>
        <Box sx={{
            display: "flex",
            flexDirection: "row",
            width: "75vw",
            height: "95vh",
            border: 3,
            borderColor: "primary.main",
            borderRadius: "16px"
        }}>
            <ActiveChat />
        </Box>
    </Box>
}