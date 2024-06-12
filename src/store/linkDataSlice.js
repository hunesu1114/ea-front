import {createSlice} from "@reduxjs/toolkit";

let linkData=createSlice({
    name: 'linkData',
    initialState: {'id':null,'category': 'mail', 'description': null, 'url': null},
    reducers: {
        linkDataStateInit(state) {
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
        },
    }
})
export let {linkDataStateInit,setLinkDataId,setLinkDataCategory,setLinkDataDescription,setLinkDataUrl} = linkData.actions;

export default linkData;