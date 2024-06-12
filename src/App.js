/*eslint-disable*/
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'

import {useEffect, useState} from "react";
import axios from "axios";
import Links from "./routes/Links";
import {Col, Container, Row} from "react-bootstrap";
import {useQuery} from "@tanstack/react-query";
import data from "bootstrap/js/src/dom/data";
import async from "async";

function App() {

    let [auth, setAuth] = useState(false);

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home auth={auth} setAuth={setAuth}/>}/>
                <Route path="/links" element={<Links/>}/>
                <Route path="/login" element={<Login/>}/>

                {/*<Route path="/memo" element={}/>*/}
                {/*<Route path="/data" element={}/>*/}
                {/*<Route path="/announcement" element={}/>*/}
                {/*<Route path="/logout" element={}/>*/}
            </Routes>
        </div>
    );
}

function Home(props) {
    let navigate = useNavigate();

    useEffect(() => {
        // axios.get('https://everyarchive.com/checkAuth')
        axios.get('https://everyarchive.com/checkAuth')
            .then((res) => {
                console.log("data & bool : " + res.data, res.data === false);
                props.setAuth(res.data);
            })
    }, [props.auth])

    if (props.auth === true) {
    // if (props.auth === false) {
        return (
            <div className="container-div">
                <h1 className="page-title" style={{marginTop: '50px'}}
                    onClick={() => {
                        navigate('/');
                    }}>Every Archive</h1>

                <div className="logon-main" id="logon-main" style={{display: 'block'}}>
                    <div className="d-flex justify-content-center" style={{marginTop: '20px'}}>
                        <button id="link-archive-btn" className="custom-btn main-btn"
                                style={{width: '200px'}}
                                onClick={() => {
                                    navigate("/links");
                                }}>Link Archive
                        </button>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button id="memo-archive-btn" className="custom-btn main-btn"
                                style={{width: '200px'}}
                        >Memo Archive
                        </button>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button id="data-archive-btn" className="custom-btn main-btn"
                                style={{width: '200px'}}
                        >Data Archive
                        </button>
                    </div>

                    <div className="d-flex justify-content-center">
                        <button id="chat-btn" className="custom-btn main-btn" style={{width: '200px'}}
                        >Announcement
                        </button>
                    </div>

                    <div className="d-flex justify-content-center">
                        <button id="logout-btn" className="custom-btn main-btn"
                                style={{width: '200px'}}>Logout
                        </button>
                    </div>
                </div>

                <div className="logout-main" id="logout-main" style={{display: 'none'}}>
                    <div className="d-flex justify-content-center" style={{marginTop: '20px'}}>
                        <button id="login-btn" className="custom-btn main-btn" style={{width: '200px'}}
                        >Login
                        </button>
                    </div>
                </div>

                <div className="row text-center font-color">
                    <p style={{marginTop: '30px', color: '#f1c40f'}}>Made By 김현수</p>
                </div>
            </div>
        );

    } else {
        return (
            <div className="container-div">
                <h1 className="page-title" style={{marginTop: '50px'}}
                    onClick={() => {
                        navigate('/');
                    }}>Every Archive</h1>
                <div className="logout-main" id="logout-main" style={{display: 'block'}}>
                    <div className="d-flex justify-content-center" style={{marginTop: '20px'}}>
                        <button id="login-btn" className="custom-btn main-btn" style={{width: '200px'}} onClick={() => {
                            navigate('/login')
                        }}
                        >Login
                        </button>
                    </div>
                </div>

                <div className="row text-center font-color">
                    <p style={{marginTop: '30px', color: '#f1c40f'}}>Made By 김현수</p>
                </div>
            </div>
        )
    }


}



function Login() {
    let navigate = useNavigate();
    return (
        <div className="container-div">
            <h1 className="page-title" style={{marginTop: '50px'}}
                onClick={() => {
                    navigate('/');
                }}>Every Archive</h1>
            <div className="d-flex justify-content-center" style={{marginTop: '50px'}}>
                <h5 id="visit-cnt"></h5>
            </div>

            <div className="login" id="login">
                <div className="d-flex justify-content-center" style={{marginTop: '20px'}}>
                    <button id="kakao-login-btn" className="custom-btn" style={{width: '200px'}}
                            onClick={() => {
                                // 로그인 ajax
                                axios.get('https://everyarchive.com/getOAuthParam')
                                    .then((res) => {
                                        console.log(res.data);
                                        let restapikey = res.data.restapikey;
                                        let redirectUri = res.data.redirectUri;
                                        location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${restapikey}&redirect_uri=${redirectUri}`
                                    })
                            }}>Kakao Login
                    </button>
                </div>
            </div>

            <div className="row text-center font-color">
                <p style={{marginTop: '30px', color: '#f1c40f'}}>Made By 김현수</p>
            </div>
        </div>
    )
}


export default App;
