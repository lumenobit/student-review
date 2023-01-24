import React, { useState, useEffect } from 'react'
import Copyright from './Copyright'
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

function DashboardPage(props) {

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [feedbacks, setFeedbacks] = useState([]);

    const navigate = useNavigate();

    const feedbackResponse = async () => {
        setLoading(true);
        try {
            const feedbackApiUrl = window.location.host === 'localhost:3000' ?
                `http://localhost:4000/api/survey?page=${page}` : `/api/survey?page=${page}`;
            const response = await fetch(feedbackApiUrl, {
                method: "GET",
                mode: window.location.host === 'localhost:3000' ? 'cors' : 'same-origin',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const res = await response.json();
            if (response.ok) {
                setTotalCount(res.totalCount);
                setTotalPage(res.totalPage);
                setFeedbacks([...feedbacks, ...res.data, ...res.data, ...res.data, ...res.data, ...res.data]);
            } else {
                throw new Error(res.message || "Something went wrong!");
            }
        } catch (ex) {
            setError("Something went wrong!")
        }
        setLoading(false);
    }

    const handleScroll = () => {
        const scrollTop = document.documentElement.scrollTop
        const scrollHeight = document.documentElement.scrollHeight
        const clientHeight = document.documentElement.clientHeight

        if (Math.round(scrollTop) + clientHeight >= scrollHeight && page < totalPage && !loading) {
            setPage(page + 1)
        }
    }

    const logout = () => {
        localStorage.clear();
        navigate('/login');
    }

    useEffect(() => {
        (async () => {
            await feedbackResponse();
        })();
    }, [page])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [feedbacks]);

    return (
        <div className='container my-4'>

            <div className='d-flex justify-content-between align-items-center'>
                <h1 className='h3 mb-0'>Dashboard</h1>
                <button className='btn btn-light' style={{ lineHeight: 1 }} onClick={logout}>
                    <span class="material-icons">
                        power_settings_new
                    </span>
                </button>
            </div>
            <hr className='my-2' />

            <div className='my-2'>Total Reviews: {totalCount}</div>

            {
                totalCount > 0 && (
                    <ul className="list-group">
                        {feedbacks.map((feedback, i) =>
                            <li key={i} className="list-group-item">
                                <div>
                                    <div className='d-flex mb-2'>
                                        <span className={`material-icons me-2 rating-${feedback.rating}`}>
                                            star_border
                                        </span>
                                        <span>{feedback.rating}</span>
                                        <span className='m-auto'></span>
                                        <span className='badge text-bg-light'>{moment(feedback.insertedAt).format('llll')}</span>
                                    </div>
                                    <div className='d-flex mb-2'>
                                        <span className="material-icons me-2 like-comment">
                                            thumb_up_off_alt
                                        </span>
                                        <span>{feedback.likeComment}</span>
                                    </div>
                                    <div className='d-flex mb-2'>
                                        <span className="material-icons me-2 programme-improvement">workspace_premium</span>
                                        <span>{feedback.programImprovement}</span>
                                    </div>
                                    <div className='d-flex'>
                                        <span className="material-icons me-2 trainer-improvement">face_retouching_natural</span>
                                        <span>{feedback.trainerImprovement}</span>
                                    </div>
                                </div>
                            </li>
                        )}
                    </ul>
                )
            }

            {
                !loading && !error && totalCount === 0 && (
                    <div className='h3 fw-normal text-muted text-center my-5'>No records found.</div>
                )
            }

            {
                loading && (
                    <div className='d-flex justify-content-center align-items-center'>
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )
            }

            {
                !loading && error && (
                    <div className="alert alert-danger mb-0" role="alert">
                        {error}
                    </div>
                )
            }

            <Copyright />
        </div>
    )
}
export default DashboardPage