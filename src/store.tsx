import { configureStore } from "@reduxjs/toolkit";
import noticeBoardReducer from './features/noticeBoard/noticeBoardSlice.tsx';

const store = configureStore({
    reducer: {
        noticeBoard: noticeBoardReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;

export default store;