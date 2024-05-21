import {Box} from "@mui/material";
import ActiveChat from "@/components/active-chat/activeChat";
import ChatsListContainer from "@/components/chat-list-container/chatListContainer";
import * as React from "react";
import LogoutButton from "@/components/logout-button/logout";
import { io } from "socket.io-client";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";
import NewChat from "@/components/new-chat/newChat";
import {render} from "react-dom";

export const socket = io("localhost:8080");

export default function Chats() {

    const [msg, upmsg] = useState(false);

    socket.on("chat_updated", (payload)=> {
        console.log("new message in ", payload);
        upmsg(!msg);
    })

    const userId = useSelector((state: RootState) => state.auth.userId);

    useEffect(()=>{
        socket.connect();
        socket.emit("add_user_to_rooms",  {userId});
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
        <NewChat />
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