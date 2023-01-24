import React from 'react';

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            message: null,
            isError: false
        }
    }

    async onFormSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const loginRequest = Object.fromEntries(formData);
        const loginApiUrl = window.location.host === 'localhost:3000' ? 'http://localhost:4000/api/auth/login' : '/api/auth/login';
        this.setState(() => ({
            isLoading: true,
            message: null,
            isError: false
        }));
        try {
            const response = await fetch(loginApiUrl, {
                body: JSON.stringify(loginRequest),
                method: "POST",
                mode: window.location.host === 'localhost:3000' ? 'cors' : 'same-origin',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const result = await response.json();
            this.resetForm();
            this.setState(() => ({
                isLoading: false,
                isError: !response.ok,
                message: !response.ok ? result.message : null
            }));
            localStorage.setItem('userName', 'Admin');
            this.props.navigate('/dashboard')
        } catch (ex) {
            this.setState(() => ({
                isLoading: false,
                isError: true,
                message: "Some error occurred while trying to login. Please try again later."
            }));
        }
    }

    resetForm() {
        document.forms['loginForm'].reset();
    }

    dismissAlert() {
        this.setState(() => ({
            isError: false,
            message: null
        }));
    }

    render() {
        return (
            <div className="full-page-gray login-section" >
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-lg-4">
                            <div className="login-wrap p-4 p-md-5">
                                <div className="icon d-flex align-items-center justify-content-center bg-primary">
                                    <span className="material-icons">
                                        person
                                    </span>
                                </div>
                                <h3 className="text-center mb-4 text-primary">Admin Login</h3>
                                <form className="login-form" name="loginForm" onSubmit={(e) => this.onFormSubmit(e)}>
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" id="username" name="username" placeholder="Username" required />
                                        <label htmlFor="username">Username</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="password" className="form-control" id="password" name="password" placeholder="Password" required />
                                        <label htmlFor="password">Password</label>
                                    </div>
                                    {
                                        this.state.message && (
                                            <div className={`alert alert-dismissible shadow-sm mb-3 ${this.state.isError ? 'alert-danger' : 'alert-success'}`} role="alert">
                                                {this.state.isError ? (<strong>Error!</strong>) : <strong>Awesome!</strong>} {this.state.message}
                                                <button type="button" className="btn-close" aria-label="Close" onClick={() => this.dismissAlert()}></button>
                                            </div>
                                        )
                                    }
                                    <div className="input-group submit-button-wrapper">
                                        <button type="submit" className="btn btn-primary rounded submit p-3 px-5">Login</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default LoginPage