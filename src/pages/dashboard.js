import React, { Component } from 'react';
import Header from "../elements/header";
import Sidebar from "../elements/sidebar";
import { Link } from 'react-router-dom';


export default class Dashboard extends Component {

    render() {
        return (
            <div className="container">
                <Header/>
               
                <div className="row">
                    <div className="col-md-4 mb-5">
                        <div className="card h-100">
                        <img className="card-img-top" src="https://placehold.it/300x200" alt="" />

                            <div className="card-footer">
                                <div className="row">
                                    <div className="col-md-8">$12</div>
                                    <div className="col-md-4 p-0">
                                        <button type="button" className="btn btn-secondary btn-sm"> Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-5">
                        <div className="card h-100">
                        <img className="card-img-top" src="https://placehold.it/300x200" alt="" />

                            <div className="card-footer">
                                <div className="row">
                                    <div className="col-md-8">$25</div>
                                    <div className="col-md-4 p-0">
                                        <button type="button" className="btn btn-secondary btn-sm"> Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-5">
                        <div className="card h-100">
                        <img className="card-img-top" src="https://placehold.it/300x200" alt="" />

                            <div className="card-footer">
                                <div className="row">
                                    <div className="col-md-8">$17</div>
                                    <div className="col-md-4 p-0">
                                        <button type="button" className="btn btn-secondary btn-sm"> Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    
                </div>
            </div>
        );
    }
}
