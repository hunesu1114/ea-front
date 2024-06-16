function Loader() {
    return (
        <div className="modal-container" id="loader-modal" tabIndex="-1" style={{display: 'block'}}>
            <div className="modal-dialog">
                <div className="modal-content" style={{backgroundColor: '#2c3e50'}}>
                    <div className="modal-body">
                        <div className="loader3" style={{width: '100%', textAlign: 'center'}}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loader;