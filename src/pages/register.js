import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
var CONFIG = require('./../config/local');

export default class Register extends Component {

    state = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        phone: '',
        city: '',
        state: '',
        country: '',
        zip: '',
        address: '',
        redirect: false,
        authError: false,
        isLoading: false,
    };

    handleEmailChange = event => {
        this.setState({ email: event.target.value });
    };
    handlePwdChange = event => {
        this.setState({ password: event.target.value });
    };
    handleNameChange = event => {
        this.setState({ name: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.setState({isLoading: true});
        
        const headers = { 'Content-Type': 'application/json'}
        this.state.role = 2;
        axios.post(`${CONFIG.apiUrl}/user/register`, this.state,)
            .then(result => {
                this.setState({isLoading: false});
                if (result.data.statusCode==200) {
                    this.setState({redirect: true, authError: true});
                }else {
                    this.setState({redirect: false, authError: true});
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({ authError: true, isLoading: false });
            });
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to="/" />
        }
    };

    render() {
        const isLoading = this.state.isLoading;
        return (
            <div className="container">
                <div className="card card-login mx-auto mt-5">
                    <div className="card-header">Register</div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
  
                            <div className="form-group">
                                <input id="firstname" type="text" className={"form-control " + (this.state.authError ? 'is-invalid' : '')} placeholder="first name"  name="firstname" onChange={this.handleNameChange} required/>
                            </div>

                            <div className="form-group">
                                <input type="text" id="lastname" className="form-control" placeholder="last name"  name="lastname" onChange={this.handleNameChange} required/>                                
                            </div>

                            <div className="form-group">
                                    <input id="inputEmail" className={"form-control " + (this.state.authError ? 'is-invalid' : '')} placeholder="Email address" type="email" name="email" onChange={this.handleEmailChange} autoFocus required/>
                            </div>

                            <div className="form-group">
                                <input type="password" className="form-control" id="inputPassword" placeholder="******"  name="password" onChange={this.handlePwdChange} required/>  
                            </div>

                            <div className="form-group">
                                <input type="text" id="phone" className="form-control" placeholder="Phone number"  name="phone" onChange={this.handleNameChange} required/>     
                            </div>

                            <div className="form-group">
                                    <input type="text" id="city" className="form-control" placeholder="city"  name="city" onChange={this.handleNameChange} required/>
                            </div>

                            <div className="form-group">
                                
                                    <input type="text" id="state" className="form-control" placeholder="state"  name="state" onChange={this.handleNameChange} required/>
                                    
                            </div>

                            <div className="form-group">
                               
                                    <input type="text" id="country" className="form-control" placeholder="country"  name="country" onChange={this.handleNameChange} required/>
                                   
                            </div>

                            <div className="form-group">
                                
                                    <input type="text" id="zip" className="form-control" placeholder="zip code"  name="zip" onChange={this.handleNameChange} required/>
                                    
                            </div>

                            <div className="form-group">
                               
                                    <textarea type="text" id="address" className="form-control" placeholder="enter address"  name="address" onChange={this.handleNameChange} required></textarea>
                                 
                            </div>


                            <div className="form-group">
                                <button className="btn btn-primary btn-block" type="submit" disabled={this.state.isLoading ? true : false}>Register &nbsp;&nbsp;&nbsp;
                                    {isLoading ? (
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    ) : (
                                        <span></span>
                                    )}
                                </button>
                            </div>
                        </form>
                        <div className="text-center">
                            <Link className="d-block small mt-3" to={''}>Login Your Account</Link>
                           {/*  <Link className="d-block small" to={'#'}>Forgot Password?</Link> */}
                        </div>
                    </div>
                </div>
                {this.renderRedirect()}
            </div>
        );
    }
}


