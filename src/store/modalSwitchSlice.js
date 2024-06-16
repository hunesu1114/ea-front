import {createSlice} from "@reduxjs/toolkit";

let modalSwitch=createSlice({
    name: 'modalSwitch',
    initialState: {'linkAddModal':false,'linkModifyModal': false,'finderModal':false,'loaderModal':false},
    reducers: {
        setLinkAddModalStatus(state, param) {
            state.linkAddModal=param.payload
        },
        setLinkModifyModalStatus(state, param) {
            state.linkModifyModal=param.payload
        },
        setFinderModalStatus(state, param) {
            state.finderModal = param.payload;
        },
        setLoaderModal(state, param) {
            state.loaderModal = param.payload;
        },
    }
})
export let {setLinkAddModalStatus,setLinkModifyModalStatus,setFinderModalStatus,setLoaderModal} = modalSwitch.actions;

export default modalSwitch;