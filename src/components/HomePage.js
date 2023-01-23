import React from 'react';
import TeamImg from '../assets/team.png';

function HomePage() {
    return (
        <div className='container page-wrapper'>
            <div className='page-img mb-4'>
                <img src={TeamImg} alt="Team" />
            </div>
            <h1>Welcome to the Lumenobit Feedback Page</h1>
            <p className='text-muted'>To provide feedback about us, please visit the feedback link shared with you. If you didn't receive any such link, please contact your manager/person of contact.</p>
        </div>
    )
}
export default HomePage