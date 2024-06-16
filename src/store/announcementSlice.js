import {createSlice} from "@reduxjs/toolkit";

let announcement=createSlice({
    name: 'announcement',
    initialState: [],
    reducers: {
        setAnnouncement(state, param) {
            return param.payload;
        },

    }
})
export let {setAnnouncement} = announcement.actions;

export default announcement;