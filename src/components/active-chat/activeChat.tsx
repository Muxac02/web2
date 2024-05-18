import {Box, TextField, Button} from "@mui/material";
import MessageItem from "@/components/message-item/messageItem";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {DeleteChat} from "@/components/delete-chat/deleteChat";
import {UpdateChat} from "@/components/update-chat/updateChat";
import * as React from "react";

export default function ActiveChat() {
    const selectedChat = useSelector((state: RootState) => state.chat.selectedChat);

    return <Box sx={{
        display: "flex",
        flexDirection: "column"
    }}>
        {selectedChat ? (
            <>
                <Box sx={{
                    display: "flex",
                    height: "5vh",
                    width: "62vw",
                    justifyContent: "center",
                    fontSize: 30
                }}>
                    Chat name: {selectedChat.chatname}
                </Box>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    height: "10vh",
                    width: "51vw",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    fontSize: 20
                }}>
                    Participants:
                    <Box
                        sx={{
                            border: 1,
                            borderColor: "primary.main",
                            borderRadius: "16px",
                            px: "100px",
                            marginLeft: "1vh",
                            marginRight: "1vh"
                        }}
                    >
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            overflowY: "auto",
                            maxHeight: "30px",
                            "&::-webkit-scrollbar": {width: "0px"}
                        }}
                        >
                            {selectedChat?.participants.map((user) => (
                                <Box key={user}>
                                    {user}
                                </Box>
                            ))}
                        </Box>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        <Box sx={{
                            display: "flex",
                            marginBottom: "1vh"
                        }}>
                            <UpdateChat chatId={selectedChat._id}/>
                        </Box>
                        <DeleteChat chatId={selectedChat._id}/>
                    </Box>
                </Box>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    height: "80vh",
                    width: "46vw",
                    alignItems: "flex-end",
                    justifyContent: "flex-end"
                }}>
                    <TextField label={"Enter your message"} variant={"standard"} sx={{width: "20vw"}}></TextField>
                    <Button variant={"contained"}>SEND MESSAGE</Button>
                </Box>
            </>
        ) : (
            <Box sx={{
                display: "flex",
                height: "5vh",
                width: "62vw",
                justifyContent: "center",
                fontSize: 30
            }}>Select a chat in the left side</Box>
        )}
    </Box>
}