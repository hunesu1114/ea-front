import {configureStore, createSlice} from '@reduxjs/toolkit';
import linkData from "./store/linkDataSlice";
import modalSwitch from "./store/modalSwitchSlice";
import links from "./store/linksSlice";
import memo from "./store/memoSlice";
import memoData from "./store/memoDataSlice";
import memoDisplay from "./store/memoDisplaySlice";

export default configureStore({
    reducer: {
        links:links.reducer,
        linkData: linkData.reducer,
        modalSwitch: modalSwitch.reducer,
        memo:memo.reducer,
        memoDisplay: memoDisplay.reducer,
        memoData:memoData.reducer,
    }
})