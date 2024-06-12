import {useEffect} from "react";
import axios from "axios";
import {Col, Container, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {
    linkDataStateInit,
    setLinkDataCategory,
    setLinkDataDescription,
    setLinkDataId,
    setLinkDataUrl
} from "../store/linkDataSlice";
import {useNavigate} from "react-router-dom";
import {setLinkAddModalStatus, setLinkModifyModalStatus} from "../store/modalSwitchSlice";
import {setLinks} from "../store/linksSlice";

function Links(props) {

    let links=useSelector((state)=>{
        return state.links;
    })

    let modalSwitch=useSelector((state)=>{
        return state.modalSwitch;
    })

    let navigate = useNavigate();

    let dispatch = useDispatch();

    useEffect(() => {
        axios.get('https://172.31.15.45:8080/linkArchive/getLinks')
        // axios.get('http://localhost:8080/linkArchive/getLinks')
            .then((res) => {
                dispatch(setLinks(res.data));
            })
    }, []);


    return (
        <div className="container-div">
            <h1 className="page-title" onClick={() => {
                navigate('/');
            }}>Link Archive</h1>

            <div className="d-flex justify-content-end" id="login-btn-div">
            </div>

            <Container className='links-list'>
                <Row className='thead'>
                    <Col md='2'>Category</Col>
                    <Col md='8'>Description</Col>
                    <Col md='2'>Modify</Col>
                </Row>
                {
                    links.map((e, idx) => {
                        return (
                            <>
                                <Row className='tbody' key={idx}>
                                    <Col md='2'>{e.category}</Col>
                                    <Col md='8'>{e.description}</Col>
                                    <Col md='2'>
                                        <button className='modify-btn' onClick={() => {
                                            dispatch(setLinkModifyModalStatus(true))
                                            dispatch(setLinkDataId(e.id))
                                            dispatch(setLinkDataCategory(e.category))
                                            dispatch(setLinkDataDescription(e.description))
                                            dispatch(setLinkDataUrl(e.url))
                                        }}>Modify
                                        </button>
                                    </Col>
                                </Row>
                            </>
                        )
                    })
                }
            </Container>


            <div className="d-flex justify-content-center">
                <button className="custom-btn" style={{width: "200px", marginTop: '20px'}} type="button"
                        id="add-link-btn" onClick={() => {
                    dispatch(setLinkAddModalStatus(true));
                }}>Add Link
                </button>
            </div>


            {/*링크 추가 모달*/}
            {
                modalSwitch.linkAddModal && <LinkAddModal/>
            }


            {/*링크 수정 모달*/}
            {
                modalSwitch.linkModifyModal &&
                <LinkModifyModal/>
            }

        </div>
    );
}


function LinkAddModal(props) {

    let linkData=useSelector((state=>{
        return state.linkData;
    }))

    let dispatch = useDispatch();

    let navigate = useNavigate();

    return (
        <div className="modal-container" id="add-link-modal" tabIndex="-1" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div className="modal-content" style={{background: "#2c3e50", width: "40%", height: "auto"}}>
                <div className="modal-header justify-content-center">
                    <h2 className="modal-title" id="add-link-modal-title"
                        style={{fontWeight: "bold", color: "#f1c40f", textAlign: "center"}}>ADD LINK</h2>

                </div>
                <div className="modal-body">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="category" className="col-form-label"
                                   style={{color: '#f1c40f', fontWeight: 'bold'}}>Category:</label>
                            <select className="form-control" name="category" id="category"
                                    style={{width: '100%', textAlign: 'center'}}
                                    onChange={(e) => {
                                        dispatch(setLinkDataCategory(e.target.value))
                                    }}>
                                <option value="mail">mail</option>
                                <option value="job">job</option>
                                <option value="tech">tech</option>
                                <option value="etc">etc</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="col-form-label"
                                   style={{color: '#f1c40f', fontWeight: 'bold'}}>Description:</label>
                            <textarea className="form-control" id="description" onChange={(e) => {
                                dispatch(setLinkDataDescription(e.target.value))
                            }}></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="url" className="col-form-label"
                                   style={{color: '#f1c40f', fontWeight: 'bold'}}>Url:</label>
                            <textarea className="form-control" id="url" onChange={(e) => {
                                dispatch(setLinkDataUrl(e.target.value))
                            }}></textarea>
                        </div>
                    </form>
                </div>
                <div className="modal-footer justify-content-center">
                    <button type="button" className="custom-btn" style={{marginRight: "10px"}}
                            onClick={() => {
                                dispatch(setLinkAddModalStatus(false));
                            }}>Close
                    </button>
                    <button type="button" className="custom-btn" id="add-btn"
                            onClick={() => {
                                axios.post("http://localhost:8080/linkArchive/save", linkData)
                                    .then(function (res) {
                                        if (res.data === "ok") {
                                            alert('Added Successfully.');
                                            navigate('/links');
                                            dispatch(setLinkAddModalStatus(false));
                                            dispatch(linkDataStateInit());
                                            axios.get('http://localhost:8080/linkArchive/getLinks')
                                                .then((res2) => {
                                                    dispatch(setLinks(res2.data));
                                                })
                                        } else {
                                            alert(res.data);
                                            navigate('/links');
                                            dispatch(setLinkAddModalStatus(false));
                                            dispatch(linkDataStateInit());
                                        }
                                    });
                            }}>ADD
                    </button>
                </div>
            </div>
        </div>

    );
}

function LinkModifyModal(props) {

    let linkData=useSelector((state=>{
        return state.linkData;
    }))

    let dispatch = useDispatch();

    let navigate = useNavigate();
    return (
        <div className="modal-container" id="add-link-modal" tabIndex="-1" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div className="modal-content" style={{background: "#2c3e50", width: "40%", height: "auto"}}>
                <div className="modal-header justify-content-center">
                    <h2 className="modal-title" id="modify-link-modal-title"
                        style={{fontWeight: 'bold', color: '#f1c40f', textAlign: 'center'}}>ADD LINK</h2>

                </div>
                <div className="modal-body">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="category" className="col-form-label"
                                   style={{color: '#f1c40f', fontWeight: 'bold'}}>Category:</label>
                            <select className="form-control" name="category" id="m-category"
                                    style={{width: '100%', textAlign: 'center'}}
                                    onChange={(e)=>{
                                        dispatch(setLinkDataCategory(e.target.value));
                                    }}>
                                <option value="mail" selected={linkData.category==='mail'}>mail</option>
                                <option value="job" selected={linkData.category==='job'}>job</option>
                                <option value="tech" selected={linkData.category==='tech'}>tech</option>
                                <option value="etc" selected={linkData.category==='etc'}>etc</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="col-form-label"
                                   style={{color: '#f1c40f', fontWeight: 'bold'}}>Description:</label>
                            <textarea className="form-control" id="m-description"
                                      onChange={(e)=>{
                                          dispatch(setLinkDataDescription(e.target.value));
                                      }}>{linkData.description}</textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="url" className="col-form-label"
                                   style={{color: '#f1c40f', fontWeight: 'bold'}}>Url:</label>
                            <textarea className="form-control" id="m-url"
                                      onChange={(e)=>{
                                          dispatch(setLinkDataUrl(e.target.value));
                                      }}>{linkData.url}</textarea>
                        </div>
                    </form>
                </div>
                <div className="modal-footer justify-content-center">
                    <button type="button" className="custom-btn" style={{marginRight: '10px'}} onClick={() => {
                        dispatch(setLinkModifyModalStatus(false));
                    }}>Close
                    </button>
                    <button type="button" className="custom-btn" style={{marginRight: '10px'}} id="modify-btn"
                            onClick={() => {
                                axios.post('http://localhost:8080/linkArchive/updateLink?linkId='+linkData.id, linkData)
                                    .then(function (res) {
                                        if (res.data === 'ok') {
                                            alert('Modified Successfully.');
                                            navigate('/links');
                                            dispatch(setLinkModifyModalStatus(false));
                                            dispatch(linkDataStateInit());
                                            axios.get('http://localhost:8080/linkArchive/getLinks')
                                                .then((res2) => {
                                                    dispatch(setLinks(res2.data));
                                                })
                                        } else {
                                            alert(res.data);
                                            navigate('/links');
                                            dispatch(setLinkModifyModalStatus(false));
                                            dispatch(linkDataStateInit());
                                        }
                                    });
                            }}>Modify
                    </button>
                    <button type="button" className="custom-btn" id="delete-btn"
                            style={{color: 'red', fontWeight: 'bold'}}
                            onClick={() => {
                                axios.post('http://localhost:8080/linkArchive/deleteLink?id=' + linkData.id, null)
                                    .then(function (res) {
                                        if (res.data === 'ok') {
                                            alert('Deleted Successfully.');
                                            navigate('/links');
                                            dispatch(setLinkModifyModalStatus(false));
                                            dispatch(linkDataStateInit());
                                            axios.get('http://localhost:8080/linkArchive/getLinks')
                                                .then((res2) => {
                                                    dispatch(setLinks(res2.data));
                                                })
                                        } else {
                                            alert('Failed To Delete.');
                                            navigate('/links');
                                            dispatch(setLinkModifyModalStatus(false));
                                            dispatch(linkDataStateInit());
                                        }
                                    });
                            }}>Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Links;