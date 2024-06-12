import {configureStore, createSlice} from '@reduxjs/toolkit';
import linkData from "./store/linkDataSlice";
import modalSwitch from "./store/modalSwitchSlice";
import links from "./store/linksSlice";

export default configureStore({
    reducer: {
        links:links.reducer,
        linkData: linkData.reducer,
        modalSwitch: modalSwitch.reducer
    }
})