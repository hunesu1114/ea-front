import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import axios from "axios";
import {setMemo} from "../store/memoSlice";
import {setMemoDisplayInit, toggleMemoDisplay} from "../store/memoDisplaySlice";
import {
    setMemoAddNewMemo,
    setMemoDataContent,
    setMemoDataId,
    setMemoDataInit,
    setMemoDataTitle
} from "../store/memoDataSlice";

function Memo(props) {

    let memo = useSelector((state) => {
        return state.memo
    })

    let memoData=useSelector((state)=>{
        return state.memoData;
    })

    let navigate = useNavigate();
    let dispatch = useDispatch();

    useEffect(() => {
        // axios.get('https://everyarchive.com/memoArchive/getMemo')
        axios.get('http://localhost:8080/memoArchive/getMemo')
            .then((res) => {
                dispatch(setMemo(res.data))
                dispatch(setMemoDisplayInit());
                dispatch(setMemoDataInit);
            })
    }, []);


    return (
        <div className="container-div">
            <h1 className="page-title" onClick={() => {
                navigate('/');
            }}>Memo Archive</h1>

            <div className="row" style={{marginTop: "10px"}} id="memo-list">
                {memoData.addNewMemo&&<NewMemo/>}

                {
                    memo.map((e, idx) => {
                        return (
                            <>
                                <div className="d-flex align-items-center" id="write-memo"
                                     style={{border: "#f1c40f", display: "flex", flexDirection: "column"}}>
                                    <div style={{borderTop: "solid 2px #f1c40f", width: "100%"}}></div>
                                    <div className="hover-cursor"
                                         style={{
                                             width: "100%",
                                             marginTop: "10px",
                                             fontSize: "large",
                                             color: "#f1c40f",
                                             fontWeight: "bolder",
                                             textAlign: "center"
                                         }}
                                         onClick={() => {
                                             dispatch(toggleMemoDisplay(e.id))
                                         }}>{e.title}</div>

                                    <MemoDisplayStatue id={e.id}/>


                                </div>
                            </>
                        )
                    })

                }
            </div>

            <div className="d-flex justify-content-center" style={{display: "flex", flexDirection: "column"}}>
                <div style={{borderTop: "solid 2px #f1c40f", width: "100%"}}></div>
                <div className="d-flex justify-content-center">
                    <button className="custom-btn" style={{width: "200px", marginTop: "10px"}} type="button"
                            id="add-memo-btn"
                    onClick={()=>{
                        dispatch(setMemoAddNewMemo(true));
                    }}>Add Memo
                    </button>
                </div>
            </div>
        </div>
    )
}

function NewMemo() {

    let dispatch = useDispatch();
    let navigate = useNavigate();

    let titleTemp = '';
    let contentTemp = '';

    return (
        <div className="d-flex align-items-center" id="write-memo" style={{border: '#f1c40f',display: 'flex',flexDirection: 'column'}}>
            <div style={{borderTop:'solid 2px #f1c40f',width: '100%'}}></div>
            <input id="written-memo-title" type="text" placeholder="Title" style={{width: '50%', marginTop:'10px'}}
            onChange={(e)=>{
                titleTemp = e.target.value;
            }}/>
                <textarea className="memo-content" id="written-memo-content" placeholder="content" style={{width: '100%', height: '30vh',marginTop:'10px'}}
                onChange={(e)=>{
                    contentTemp = e.target.value;
                }}></textarea>
                <div style={{display: 'flex',flexDirection: 'row'}}>
                    <button className="custom-btn" id="cancel-btn" onClick={()=>{
                        dispatch(setMemoAddNewMemo(false));
                        dispatch(setMemoDataInit());
                    }}>Cancel</button>
                    <button className="custom-btn" id="save-btn" onClick={()=>{
                        axios.post('http://localhost:8080/memoArchive/save',{
                            'title':titleTemp,
                            'content':contentTemp
                        })
                            .then((res) => {
                                if (res.data === 'ok') {
                                    alert('Memo Saved Successfully.');
                                } else {
                                    alert(res.data);
                                }
                                navigate('/memo');
                                axios.get('http://localhost:8080/memoArchive/getMemo')
                                    .then((res) => {
                                        dispatch(setMemo(res.data))
                                        dispatch(setMemoDisplayInit());
                                        dispatch(setMemoDataInit());
                                    })
                            })
                    }}>Save</button>
                </div>
                <div style={{borderTop:'solid 2px #f1c40f',width: '100%'}}></div>
        </div>
    )
}

function MemoDisplayStatue({id}) {

    let memo=useSelector((state)=>{
        return state.memo;
    })
    let memoDisplay = useSelector((state)=>{
        return state.memoDisplay;
    })

    let dispatch = useDispatch();
    let navigate = useNavigate();
    let content;
    memo.map((e)=>{
        if (e.id === id) {
            content=e;
        }
    })

    let titleTemp = content.title;
    let contentTemp = content.content;

    for (let i = 0; i < memoDisplay.length; i++) {
        if (memoDisplay[i].id === id) {
            return memoDisplay[i].display && (
                <div id={"memo-content-block-" + content.id} style={{width: "100%"}}>
                    <input id={"memo-title-" + content.id} style={{width: "50%", marginTop: "10px"}}
                           defaultValue={content.title}
                           onChange={(e)=>{
                               titleTemp = e.target.value;
                           }}
                    />
                    <textarea className="memo-content" id={"memo-content" + content.id}
                              style={{
                                  width: "100%",
                                  height: "50vh",
                                  marginTop: "10px"
                              }}
                              defaultValue={content.content}
                              onChange={(e) => {
                                  contentTemp = e.target.value;
                              }}></textarea>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center"
                    }}>
                        <button className="custom-btn" id="cancel-btn"
                                onClick={() => {
                                    // axios.get('https://everyarchive.com/memoArchive/getMemo')
                                    axios.post('http://localhost:8080/memoArchive/delete?id=' + id)
                                        .then((res) => {
                                            if (res.data === 'ok') {
                                                alert('Delete Done Successfully.');
                                            } else {
                                                alert(res.data);
                                            }
                                            navigate('/memo');
                                            axios.get('http://localhost:8080/memoArchive/getMemo')
                                                .then((res) => {
                                                    dispatch(setMemo(res.data))
                                                    dispatch(setMemoDisplayInit());
                                                    dispatch(setMemoDataInit);
                                                })
                                        })
                                }}>Delete
                        </button>
                        <button className="custom-btn" id="update-btn"
                                onClick={() => {
                                    axios.post('http://localhost:8080/memoArchive/update',{
                                        'id':id,
                                        'title':titleTemp,
                                        'content':contentTemp
                                    })
                                        .then((res) => {
                                            if (res.data === 'ok') {
                                                alert('Update Done Successfully.');
                                            } else {
                                                alert(res.data);
                                            }
                                            navigate('/memo');
                                            axios.get('http://localhost:8080/memoArchive/getMemo')
                                                .then((res) => {
                                                    dispatch(setMemo(res.data))
                                                    dispatch(setMemoDisplayInit());
                                                    dispatch(setMemoDataInit);
                                                })
                                        })
                                }}>Modify
                        </button>
                    </div>
                </div>
            );
        }
    }

    return null;
}

export default Memo;