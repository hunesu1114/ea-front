import {createSlice} from "@reduxjs/toolkit";

let memoData=createSlice({
    name: 'memoData',
    initialState: {'id':null,'title': null, 'content': null, 'writeStatus': false},
    reducers: {


        /*linkDataStateInit(state) {
            return {'id': null, 'category': 'mail', 'description': null, 'url': null};
        },
        setLinkDataId(state,id) {
            state.id = id.payload;
        },
        setLinkDataCategory(state, category) {
            state.category = category.payload;
        },
        setLinkDataDescription(state, description) {
            state.description = description.payload;
        },
        setLinkDataUrl(state, url) {
            state.url = url.payload;
        },*/
    }
})
export let {} = memoData.actions;

export default memoData;