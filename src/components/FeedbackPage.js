import React from 'react';
import Copyright from './Copyright';
import PageLoader from './PageLoader';
import Rating from './Rating';
import withRouter from './withRouter';

class FeedbackPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rating: 0,
            isLoading: false
        }
        this.ratingComponent = React.createRef();
    }

    async onFormSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const feedback = Object.fromEntries(formData);
        feedback.surveyId = this.props.params.id;
        const saveApiUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:4000/api/survey' : '/api/survey';
        this.setState(() => ({
            isLoading: true,
            message: null,
            isError: false
        }));
        try {
            const response = await fetch(saveApiUrl, {
                body: JSON.stringify(feedback),
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const result = await response.json();
            this.resetForm();
            this.setState(() => ({
                isLoading: false,
                isError: !response.ok,
                message: result.message
            }));
        } catch (ex) {
            this.setState(() => ({
                isLoading: false,
                isError: true,
                message: "Some error occurred while saving your survey. Please try again later."
            }));
        }
    }

    resetForm(rating) {
        document.forms['feedbackForm'].reset();
        this.ratingComponent.current.resetRating();
    }

    dismissAlert() {
        this.setState(() => ({
            isError: false,
            message: null
        }));
    }

    render() {
        return (
            <div className='full-page-gray'>
                <div className='container pt-4'>
                    <form name="feedbackForm" onSubmit={(e) => this.onFormSubmit(e)} onReset={() => { this.resetForm() }}>
                        <div className='card mb-3 feedback-banner shadow-sm'>
                        </div>

                        <div className='card border-top-lg mb-3 shadow-sm'>
                            <div className='card-body'>
                                <h1 className='h2 card-title fw-normal'>Bitling Feedback!</h1>
                                <p className='card-text'>Your opinions matter! Share honest feedback on the Bitling Programme and let us improve it together.</p>
                            </div>
                        </div>

                        <div className='card mb-3 shadow-sm'>
                            <div className='card-body'>
                                <label className='h5 card-title fw-normal'>Rate your experience <span className='text-danger'>*</span></label>
                                <div className='card-text'>
                                    <Rating ref={this.ratingComponent} />
                                </div>
                            </div>
                        </div>

                        <div className='card mb-3 shadow-sm'>
                            <div className='card-body'>
                                <label htmlFor="likeComment" className='h5 card-title fw-normal'>What are all the things you liked about this programme? <span className='text-danger'>*</span></label>
                                <textarea className="form-control" id="likeComment" name="likeComment" rows="3" required></textarea>
                            </div>
                        </div>

                        <div className='card mb-3 shadow-sm'>
                            <div className='card-body'>
                                <label htmlFor="programImprovement" className='h5 card-title fw-normal'>What can we do to improve the programme? <span className='text-danger'>*</span></label>
                                <textarea className="form-control" id="programImprovement" name="programImprovement" rows="3" required></textarea>
                            </div>
                        </div>

                        <div className='card mb-3 shadow-sm'>
                            <div className='card-body'>
                                <label htmlFor="trainerImprovement" className='h5 card-title fw-normal'>What improvement do you suggest for your trainer? <span className='text-danger'>*</span></label>
                                <textarea className="form-control" id="trainerImprovement" name="trainerImprovement" rows="3" required></textarea>
                            </div>
                        </div>

                        {
                            this.state.message && (
                                <div className={`alert alert-dismissible shadow-sm ${this.state.isError ? 'alert-danger' : 'alert-success'}`} role="alert">
                                    {this.state.isError ? (<strong>Error!</strong>) : <strong>Awesome!</strong>} {this.state.message}
                                    <button type="button" className="btn-close" aria-label="Close" onClick={() => this.dismissAlert()}></button>
                                </div>
                            )
                        }

                        <div className='d-flex justify-content-between'>
                            <button className='btn btn-primary shadow-sm' type='submit'>Submit</button>
                            <button className='btn btn-secondary shadow-sm' type='reset'>Reset Form</button>
                        </div>
                    </form>
                </div>
                <Copyright className="container" />
                {
                    this.state.isLoading && (
                        <PageLoader />
                    )
                }
            </div>
        )
    }
}
export default withRouter(FeedbackPage);