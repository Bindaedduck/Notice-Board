import { combineReducers, configureStore } from "@reduxjs/toolkit";
import noticeBoardReducer from './features/noticeBoard/noticeBoardSlice.tsx'

const rootReducer = combineReducers({
    noticeBoard: noticeBoardReducer 
})

const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>;

export default store;