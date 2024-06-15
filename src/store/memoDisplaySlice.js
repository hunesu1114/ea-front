import {createSlice} from "@reduxjs/toolkit";

let memoDisplay=createSlice({
    name:'memoDisplay',
    initialState:[],
    reducers:{
        setMemoDisplayInit(state) {
            return [{'id':null, 'display': false}];
        },
        toggleMemoDisplay(state, id) {
            console.log("=========");
            let workDone=false
            state.map((elt)=>{
                if (elt.id === id.payload) {
                    if (elt.display === true) {
                        elt.display = false;
                    } else {
                        elt.display = true;
                    }
                    workDone = true;
                }
            })
            if(!workDone){
                state.push({
                    'id':id.payload,
                    'display': true,
                })
            }
        },

    }

})

export let {setMemoDisplayInit, toggleMemoDisplay} = memoDisplay.actions;

export default memoDisplay;