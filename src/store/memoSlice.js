import {createSlice} from "@reduxjs/toolkit";

let memo=createSlice({
    name: 'memo',
    initialState: [],
    reducers: {
        setMemo(state, param) {
            return param.payload;
        },

    }
})
export let {setMemo} = memo.actions;

export default memo;