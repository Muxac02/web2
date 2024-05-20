//import Head from 'next/head'
//import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import React from "react"
import {Link} from "@mui/material"
import Box from "@mui/material/Box";

export default function Home() {
  return (
    <main className={styles.main}>
      <Box
          sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              flexDirection: "column",
              marginBottom: "5vh"}}
      >
          <Link href="/signup" variant="body2">
          New here? Sign up
      </Link>
          <Link href="/signin" variant="body2">
              Have an account? Sign in
          </Link>
      </Box>
    </main>
  )
}
