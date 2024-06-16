import {createSlice} from "@reduxjs/toolkit";

let files=createSlice({
    name: 'files',
    initialState: [],
    reducers: {
        setFilesInit(state) {
            return []
        },
        setFiles(state, param) {
            return param.payload;
        },

    }
})
export let {setFiles,setFilesInit} = files.actions;

export default files;