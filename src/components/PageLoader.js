import React from 'react';

function PageLoader() {
    return (
        <div id="loader" className="dialog">
            <div className="dialog-wrapper loader-wrapper">
                <div className="loader"></div>
                <span className="loader-text">Please wait...</span>
            </div>
            <div className="dialog-backdrop"></div>
        </div>
    )
}
export default PageLoader