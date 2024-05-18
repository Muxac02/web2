import {Box, Button, Dialog, DialogActions, DialogTitle} from "@mui/material";
import {useEffect, useState} from "react";
import {useDeleteChatMutation} from "@/store/chatsApi";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {setSelectedChat} from "@/store/chats/chatsActions";
import * as React from "react";

export const DeleteChat = ({chatId} : {chatId: string}) => {
    const [open, setOpen] = useState(false);

    const [deleteChat, deleteChatResult] = useDeleteChatMutation();

    const dispatch = useDispatch();

    const userId = useSelector((state: RootState) => state.auth.userId);

    useEffect(()=>{
        if (deleteChatResult.isSuccess) {
            dispatch(setSelectedChat(null));
            setOpen(false);
        }
    }, [deleteChatResult])

    return (
        <>
            <Button variant={"contained"} onClick={()=> { setOpen(true) }}>DELETE CHAT</Button>
            <Dialog open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby={"dialog-title"}
                    fullWidth>
                <DialogTitle id={"dialog-title"}>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center"
                    }}>
                        Confirm chat deletion
                    </Box>
                </DialogTitle>
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
                                deleteChat({id: chatId, owner: userId});
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