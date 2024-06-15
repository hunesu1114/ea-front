import {createSlice} from "@reduxjs/toolkit";

let memoData=createSlice({
    name: 'memoData',
    initialState: {'id':null,'title': null, 'content': null,'addNewMemo':false},
    reducers: {
        setMemoDataInit(state) {
            return {'id':null,'title': null, 'content': null,'addNewMemo':false}
        },
        setMemoAddNewMemo(state, param) {
            state.addNewMemo = param.payload;
        },
        setMemoDataId(state,param) {
            state.id = param.payload;
        },
        setMemoDataTitle(state, param) {
            state.title = param.payload;
        },
        setMemoDataContent(state, param) {
            state.content = param.payload;
        },
    }
})
export let {setMemoDataInit,setMemoDataId,setMemoDataTitle,setMemoDataContent,setMemoAddNewMemo} = memoData.actions;

export default memoData;