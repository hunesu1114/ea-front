import {createSlice} from "@reduxjs/toolkit";

let modalSwitch=createSlice({
    name: 'modalSwitch',
    initialState: {'linkAddModal':false,'linkModifyModal': false,},
    reducers: {
        setLinkAddModalStatus(state, param) {
            state.linkAddModal=param.payload
        },
        setLinkModifyModalStatus(state, param) {
            state.linkModifyModal=param.payload
        },
    }
})
export let {setLinkAddModalStatus,setLinkModifyModalStatus} = modalSwitch.actions;

export default modalSwitch;