import React, {Component} from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import TitleComponent from "./title";
var CONFIG = require('./../config/local');

export default class Login extends Component {

    state = {
        email: '',
        password: '',
        redirect: false,
        authError: false,
        isLoading: false
    };

    
    isAuthenticated = () => {
        const isAuthenticated = localStorage.getItem('token');
        if (isAuthenticated) {
            return <Redirect to='/home'/>
        }
    };

    handleEmailChange = event => {
        this.setState({email: event.target.value});
    };
    handlePwdChange = event => {
        this.setState({password: event.target.value});
    };

    handleSubmit = event => {
        event.preventDefault();
        this.setState({isLoading: true});
        const headers = { 'Content-Type': 'application/json'}
          
        this.state.role = 2;
        axios.post( `${CONFIG.apiUrl}/user/login`, this.state, {
            headers: headers
          }).then(result => {
                if (result.data.statusCode==200) {
                    localStorage.setItem('token', result.data.data.token);
                    this.setState({redirect: true, isLoading: false});
                    localStorage.setItem('isLoggedIn', true);
                    localStorage.setItem('cartItem', JSON.stringify([]));
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({authError: true, isLoading: false});
            });
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/home'/>
        }
    };

    render() {
        const isLoading = this.state.isLoading;
       
        return (
            <div className="container">
                 { this.isAuthenticated() } 
                <TitleComponent title="React CRUD Login "></TitleComponent>
                <div className="card card-login mx-auto mt-5">
                    <div className="card-header">Login</div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                
                                    <input className={"form-control " + (this.state.authError ? 'is-invalid' : '')} id="inputEmail" placeholder="Email address" type="text" name="email" onChange={this.handleEmailChange} autoFocus required/>
                                    
                                    <div className="invalid-feedback">
                                        Please provide a valid Email.
                                    </div>
                                
                            </div>
                            <div className="form-group">
                                
                                    <input type="password" className={"form-control " + (this.state.authError ? 'is-invalid' : '')} id="inputPassword" placeholder="Password" name="password" onChange={this.handlePwdChange} required/>
                                    
                                    <div className="invalid-feedback">
                                        Please provide a valid Password.
                                    </div>
                                
                            </div>
                            
                            <div className="form-group">
                                <button className="btn btn-primary btn-block" type="submit" disabled={this.state.isLoading ? true : false}>Login &nbsp;&nbsp;&nbsp;
                                    {isLoading ? (
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    ) : (
                                        <span></span>
                                    )}
                                </button>
                            </div>
                            {/* <div className="form-group">
                                <div className="form-group">
                                    <b>email:</b> gowthaman.nkl1@gmail.com
                                </div>
                                <div className="form-group">
                                    <b>password :</b> password
                                </div>
                            </div> */}
                        </form>
                        <div className="text-center">
                            <Link className="d-block small mt-3" to={'register'}>Register an Account</Link>
                            {/* <a className="d-block small" href="forgot-password.html">Forgot Password?</a> */}
                        </div>
                    </div>
                </div>
                {this.renderRedirect()}
               
            </div>
        );
    }
}


