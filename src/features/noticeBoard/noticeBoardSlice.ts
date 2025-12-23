import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const fetchNoticeBoard = createAsyncThunk(
    'noticeBoard/fetchNoticeBoard',
    async (_, thunkAPI) => {
        try{
            const response = await axiosInstance.get<NoticeBoard[]>('/data');
            return response.data;
        }catch(error: any){
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }

)

export interface NoticeBoard {
    reqId: string;
    bizCLS: string;
    idpType: string;
    fileName: string;
    filePath: string;
    page: number,
    status: string;
    startDateTime: string;
    endDateTime: string;
}

interface NoticeBoardState {
    items: NoticeBoard[];
    searchQuery: string;
    loading: boolean;
    error: string|null;
}

const initialState: NoticeBoardState = {
    items: [],
    searchQuery: '',
    loading: false,
    error: null,
};

const noticeBoardSlice = createSlice({
    name : 'noticeBoard',
    initialState : initialState,
    reducers : {
        changeTableRow(state, action) {
            state.items = action.payload;
        },
        setSearchQuery:(state, action: PayloadAction<string>)=>{
            state.searchQuery = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNoticeBoard.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchNoticeBoard.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchNoticeBoard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch';
            })
    }
})

export const { changeTableRow, setSearchQuery } = noticeBoardSlice.actions;

export default noticeBoardSlice.reducer;