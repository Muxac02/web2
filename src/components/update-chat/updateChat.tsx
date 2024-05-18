import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {useUpdateChatMutation} from "@/store/chatsApi";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {setSelectedChat} from "@/store/chats/chatsActions";
import * as React from "react";

export const UpdateChat = ({chatId} : {chatId: string}) => {
    const [chatname, setChatname] = useState("");
    const [newParticipants, setNewParticipants] = useState("");
    const [newOwner, setNewOwner] = useState("");

    const [open, setOpen] = useState(false);

    const [updateChat, updateChatResult] = useUpdateChatMutation();

    const dispatch = useDispatch();

    const userId = useSelector((state: RootState) => state.auth.userId);

    useEffect(()=>{
        if (updateChatResult.isSuccess) {
            dispatch(setSelectedChat(null));
            setOpen(false);
        }
    }, [updateChatResult])

    return (
        <>
            <Button variant={"contained"} onClick={()=> { setOpen(true) }}>UPDATE CHAT</Button>
            <Dialog open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby={"dialog-title"}
                    aria-describedby={"dialog-content"}
                    fullWidth>
                <DialogTitle id={"dialog-title"}>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center"
                    }}>
                        Update chat
                    </Box>
                </DialogTitle>
                <DialogContent id={"dialog-content"}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        marginTop: "1vh"
                    }}>
                        <Box sx={{
                            display: "flex",
                            marginBottom: "2vh"
                        }}>
                            <TextField label={"Chat name"}
                                       value={chatname}
                                       onChange={(ev)=>setChatname(ev.target.value)}
                                       fullWidth
                            />
                        </Box>
                        <Box sx={{
                            display: "flex",
                            marginBottom: "2vh"
                        }}>
                            <TextField label={"Set participants"}
                                       value={newParticipants}
                                       onChange={(ev)=>setNewParticipants(ev.target.value)}
                                       fullWidth
                            />
                        </Box>
                        <TextField label={"Change owner"}
                                   value={newOwner}
                                   onChange={(ev)=>setNewOwner(ev.target.value)}
                                   fullWidth
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Box sx={{
                        display: "flex",
                        width: "100vw",
                        justifyContent: "center"
                    }}>
                        <Box sx={{
                            display: "flex",
                            marginRight: "1vw"
                        }}>
                            <Button variant={"outlined"} onClick={() => {
                                updateChat({id: chatId, user: userId, chatname: chatname, participants: newParticipants.split(","), owner: newOwner});
                            }}>Confirm</Button>
                        </Box>
                        <Box sx={{
                            display: "flex",
                            marginLeft: "1vw"
                        }}>
                            <Button variant={"contained"} onClick={() => {
                                setOpen(false);
                            }}>Cancel</Button>
                        </Box>
                    </Box>
                </DialogActions>
            </Dialog>
        </>
    );
}