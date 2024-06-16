import Loader from "../modal/Loader";
import Finder from "../modal/Finder";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setFinderModalStatus, setLoaderModal} from "../store/modalSwitchSlice";
import {useEffect} from "react";
import axios from "axios";
import {setFiles, setFilesInit} from "../store/filesSlice";

function Files() {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let modalSwitch = useSelector((state) => {
        return state.modalSwitch;
    });
    let files=useSelector((state)=>state.files)

    useEffect(()=>{
        // axios.get('https://everyarchive.com/dataArchive/file/getList?type=file')
        axios.get('http://localhost:8080/dataArchive/file/getList?type=file')
            .then(function (res) {
                dispatch(setFiles(res.data));
            });
    },[])

    return (
        <div className="container-div">
            <h1 className="page-title" onClick={() => {
                navigate('/data');
            }}>File Archive</h1>

            <div className="row" style={{marginTop: '10px'}} id="file-list">
                <FileList type={'FILE'}/>
            </div>

            <div className="d-flex justify-content-center" style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{borderTop: 'solid 2px #f1c40f', width: '100%'}}></div>
                <div className="d-flex justify-content-center">
                    <button className="custom-btn" style={{width: '200px', marginTop: '20px'}} type="button"
                            id="add-file-btn"
                            onClick={() => {
                                dispatch(setFinderModalStatus(true));
                            }}>Add File
                    </button>
                </div>
            </div>

            {/*Finder Modal*/}
            {
                modalSwitch.finderModal && <Finder/>
            }

            {/*Loader Modal*/}
            {
                modalSwitch.loaderModal && <Loader/>
            }
        </div>
    );
}

function FileList({type}) {

    let files = useSelector((state) => state.files);
    /*files.map((e)=>{
        return (
            <div className="d-flex align-items-center" id="file-row"
                 style={{borderTop: 'solid 1px #f1c40f', display: 'flex', flexDirection: 'column'}}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        marginTop: '2px',
                        marginBottom: '2px'
                    }}>
                    <div
                        style={{
                            fontSize: 'large',
                            color: '#f1c40f',
                            fontWeight: 'bolder',
                            textAlign: 'center',
                            verticalAlign: 'center',
                            width: '70%'
                        }}>
                        {e.originalFilename}</div>
                    <div style={{width: '30%', alignContent: 'center'}}>
                        <button className="custom-btn" style={{height: '30px', margin: '0'}}
                                onClick={() => {

                                }}>Download
                        </button>
                        <button className="custom-btn" style={{height: '30px', margin: '0'}}
                                onClick={() => {

                                }}>Delete
                        </button>
                    </div>
                </div>
            </div>
        )
    })*/

    /*for (let i = 0; i < files.length; i++) {
        if (files.dataType === type) {
            return (
                <div className="d-flex align-items-center" id="file-row"
                     style={{borderTop: 'solid 1px #f1c40f', display: 'flex', flexDirection: 'column'}}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '100%',
                            marginTop: '2px',
                            marginBottom: '2px'
                        }}>
                        <div
                            style={{
                                fontSize: 'large',
                                color: '#f1c40f',
                                fontWeight: 'bolder',
                                textAlign: 'center',
                                verticalAlign: 'center',
                                width: '70%'
                            }}>
                            {files[i].originalFilename}</div>
                        <div style={{width: '30%', alignContent: 'center'}}>
                            <button className="custom-btn" style={{height: '30px', margin: '0'}}
                                    onClick={() => {

                                    }}>Download
                            </button>
                            <button className="custom-btn" style={{height: '30px', margin: '0'}}
                                    onClick={() => {

                                    }}>Delete
                            </button>
                        </div>
                    </div>
                </div>
            )
        }
    }*/
}

export default Files;