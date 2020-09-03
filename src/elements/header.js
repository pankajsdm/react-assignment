import React, { Component } from 'react';
import {Link, Redirect} from "react-router-dom";
import TitleComponent from "../pages/title";


export default class Header extends Component {

    constructor(props) {
        super(props);
        this.handleClickLogout = this.handleClickLogout.bind(this)
    }

    state = {
        toDashboard: false,
    };

    handleClickLogout(){
        localStorage.removeItem('token');
        localStorage.setItem('isLoggedIn', false);
        this.setState({ toDashboard: true });
    }

    render() {
        if (this.state.toDashboard === true) {
            return <Redirect to='/' />
        }
        return (
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark static-top">
                    <TitleComponent title="React CRUD Login "></TitleComponent>

                    <Link to={'/home'} className="navbar-brand mr-1">Shopping Cart Assignment</Link>

                

                    <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
                        <div className="input-group"></div>
                    </form>

                    <ul className="navbar-nav ml-auto ml-md-0">
                        <li className="nav-item dropdown no-arrow">
                            <Link to={'#'} className="nav-link dropdown-toggle" id="userDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-user-circle fa-fw"></i>
                            </Link>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                                <Link to={'#'} className="dropdown-item">Settings</Link>
                                <div className="dropdown-divider"></div>
                                <Link to={'#'} onClick={this.handleClickLogout} className="dropdown-item" data-toggle="modal" data-target="#logoutModal">Logout</Link>
                            </div>
                        </li>
                    </ul>

                    <ul className="navbar-nav ml-auto ml-md-0">
                        <li className="nav-item dropdown no-arrow">

                        <Link to={'/cart'} className="nav-link" id="userDropdown" role="button">
                                <i className="fas fa-shopping-cart fa-fw"></i>
                            </Link>
                        </li>
                    </ul>

                </nav>

                <div className="row">
                    <div className="col-md-12 mb-0">
                    </div>
                </div>
            </div>

            
        );
    }
}
