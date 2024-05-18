import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {authApi} from "@/store/authApi";

const reducer = combineReducers({
    //auth: auth.reducer,
    //chat: chat.reducer,
    [authApi.reducerPath]: authApi.reducer,
    //[chatsApi.reducerPath]: chatsApi.reducer,
})

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch