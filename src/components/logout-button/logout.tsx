import {Box, Button} from "@mui/material";
import {useSelector} from "react-redux";
import * as React from "react";
import {useRouter} from "next/router";
import {RootState} from "@/store/store";

export default function LogoutButton() {

    const router = useRouter();

    return <Box sx={{
        display: "flex",
        flexDirection: "column"
    }}>
        <Button variant="outlined" sx={{}}
        onClick={() => {
            router.replace("/signin");
        }}>
        Logout</Button>
    </Box>
}