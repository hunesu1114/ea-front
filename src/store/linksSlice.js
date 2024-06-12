import {createSlice} from "@reduxjs/toolkit";

let links=createSlice({
    name: 'links',
    initialState: [],
    reducers: {
        setLinks(state, param) {
            return param.payload;
        },

    }
})
export let {setLinks} = links.actions;

export default links;