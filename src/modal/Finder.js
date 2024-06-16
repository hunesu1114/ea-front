import {useDispatch, useSelector} from "react-redux";
import {setFinderModalStatus} from "../store/modalSwitchSlice";

function Finder() {
    let dispatch = useDispatch();

    return (
        <div className="modal" id="add-file-modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{display:'block'}}>
            <div className="modal-dialog">
                <div className="modal-content" style={{backgroundColor: '#2c3e50',border:'solid 2px #f1c40f'}}>
                    <div className="modal-header">
                        <h2 className="modal-title" id="add-link-modal-title"
                            style={{fontWeight: 'bold', color: '#f1c40f',textAlign: 'center'}}>ADD File</h2>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form id="file-upload-form" name="file-upload-form" method="post" encType="multipart/form-data">
                            <div className="filebox">
                                <input className="upload-name" value="첨부파일" placeholder="첨부파일"/>
                                    <label for="file">파일찾기</label>
                                    <input type="file" id="file" name="file"/>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer justify-content-center">
                        <button type="button" className="custom-btn" data-bs-dismiss="modal" onClick={()=>{
                            dispatch(setFinderModalStatus(false))
                        }}>Close</button>
                        <button type="button" className="custom-btn" id="upload-btn">Upload</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Finder;