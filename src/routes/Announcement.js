import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setAnnouncement} from "../store/announcementSlice";

function Announcement() {
    let navigate = useNavigate();
    let dispatch = useDispatch();

    let announcement = useSelector((state) => {
        return state.announcement;
    });
    let annArr = [];

    useEffect(() => {
        // axios.get('https://everyarchive.com/announcement/getList')
        axios.get('http://localhost:8080/announcement/getList')
            .then((res) => {
                dispatch(setAnnouncement(res.data))
            })
    }, []);

    annArr.push(...announcement);

    console.log(annArr[0])
    return (
        <div className="container-div">
            <h1 className="page-title" onClick={() => {
                navigate('/');
            }}>Announcement</h1>
            {/*<h3 id="date">{annArr[0].date}</h3>*/}
            <div className="row" style={{marginTop:'10px'}} id="announcement-list">
                {
                    annArr.map((e)=>{
                        return (
                            <div className="d-flex align-items-center" id="write-memo"
                                 style={{border: '#f1c40f',display: 'flex',flexDirection: 'column'}}>
                                <div style={{borderTop:'solid 2px #f1c40f',width: '100%'}}></div>

                                <div className="hover-cursor"
                                     style={{width:'100%',marginTop:'10px',fontSize: 'large',color: '#f1c40f',fontWeight: 'bolder',textAlign: 'center'}}>
                                    <a className="ann-text" href={e.slink} target="_blank">{e.title}</a></div>
                                <div className="hover-cursor" style={{color: '#f1c40f'}}>
                                    <a className="ann-text" href={e.slink} target="_blank">{e.company}</a>
                                </div>
                                <div className="ann-text" className="hover-cursor" style={{color: '#f1c40f',marginTop: '10px'}}>
                                    <a  className="ann-text" href={e.jlink} target="_blank">잡플래닛 가기</a></div>
                            </div>
                        )
                    })
                }
            </div>

            <div className="d-flex justify-content-center" style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{borderTop: 'solid 2px #f1c40f', width: '100%'}}></div>

            </div>


        </div>
    )
}



export default Announcement;