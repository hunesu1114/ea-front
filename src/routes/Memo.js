import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import axios from "axios";
import {setMemo} from "../store/memoSlice";
import {setMemoDisplayInit, toggleMemoDisplay} from "../store/memoDisplaySlice";


function Memo(props) {

    let memo = useSelector((state) => {
        return state.memo
    })

    let memoDisplay = useSelector((state)=>{
    })



    let navigate = useNavigate();
    let dispatch = useDispatch();

    useEffect(() => {
        // axios.get('https://everyarchive.com/memoArchive/getMemo')
        axios.get('http://localhost:8080/memoArchive/getMemo')
            .then((res) => {
                dispatch(setMemo(res.data))
                dispatch(setMemoDisplayInit());
                console.log("memo : " + res.data);
            })
    }, []);


    return (
        <div className="container-div">
            <h1 className="page-title" onClick={() => {
                navigate('/');
            }}>Memo Archive</h1>

            <div className="row" style={{marginTop: "10px"}} id="memo-list">
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

                                    {
                                        MemoDisplayStatue(e.id) &&
                                        (<div id={"memo-content-block-" + e.id} style={{width: "100%"}}>
                                            <input id={"memo-title-" + e.id} style={{width: "50%", marginTop: "10px"}}
                                                   defaultValue={e.title}/>
                                            <textarea className="memo-content" id={"memo-content" + e.id}
                                                      style={{
                                                          width: "100%",
                                                          height: "50vh",
                                                          marginTop: "10px"
                                                      }}>{e.content}</textarea>
                                            <div style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                justifyContent: "center"
                                            }}>
                                                <button className="custom-btn" id="cancel-btn"
                                                        onClick={() => {

                                                        }}>Delete
                                                </button>
                                                <button className="custom-btn" id="save-btn"
                                                        onClick={() => {

                                                        }}>Modify
                                                </button>
                                            </div>
                                        </div>)
                                    }


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
                            id="add-memo-btn">Add Memo
                    </button>
                </div>
            </div>
        </div>
    )
}

function MemoDisplayStatue(id) {

    let memoDisplay = useSelector((state) => {
        return state.memo;
    })

    memoDisplay.map((e) => {
        if (e.id === id) {
            return e.display;
        }
    })
    return false;
}

export default Memo;