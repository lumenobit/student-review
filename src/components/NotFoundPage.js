import React from 'react';
import TeamImg from '../assets/team.png';

function NotFoundPage() {
    return (
        <div className='container page-wrapper'>
            <div className='page-img mb-4'>
                <img className='img-gray' src={TeamImg} alt="Team" />
            </div>
            <h1>(404) Page Not Found!</h1>
            <p className='text-muted'>We're sorry. But the page you requested could not be found. To provide feedback about us, please visit the feedback link shared with you. If you didn't receive any such link, please contact your manager/person of contact.</p>
        </div>
    )
}
export default NotFoundPage