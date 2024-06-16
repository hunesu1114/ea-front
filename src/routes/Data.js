import {useNavigate} from "react-router-dom";

function Data() {

    let navigate = useNavigate();
    return (
        <div className="container-div">
            <h1 className="page-title" onClick={() => {
                navigate('/');
            }}>Data Archive</h1>

            <div className="d-flex justify-content-center" style={{marginTop: '150px'}}>
                <div className="d-flex justify-content-center" style={{display: 'flex', flexDirection: 'column'}}>
                    <button className="custom-btn" style={{
                        width: '400px',
                        height: '60px',
                        fontSize: 'large',
                        fontWeight: 'bold',
                        margin: '20px'
                    }}
                            type="button" id="file-btn"
                            onClick={() => {
                                navigate('/data/files');
                            }}>file
                    </button>
                    <button className="custom-btn" style={{
                        width: '400px',
                        height: '60px',
                        fontSize: 'large',
                        fontWeight: 'bold',
                        margin: '20px'
                    }}
                            type="button" id="photo-btn"
                            onClick={() => {
                                navigate('/data/photo');
                            }}>Photo
                    </button>
                    <button className="custom-btn" style={{
                        width: '400px',
                        height: '60px',
                        fontSize: 'large',
                        fontWeight: 'bold',
                        margin: '20px'
                    }}
                            type="button" id="video-btn"
                            onClick={() => {
                                navigate('/data/video');
                            }}>Video
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Data;