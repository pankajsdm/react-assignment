import React, { Component } from 'react';
import Header from "./../elements/header";
import {Link, Redirect} from 'react-router-dom';

export default class Cart extends Component {

    
    constructor(props) {
        super(props);
        this.state = { 
            name: "",
            isLoading: false,
            cartItem: [] 
        };
    }

    async componentDidMount(){
        const cartItem = JSON.parse(localStorage.getItem('cartItem'));
        const totalPrice = await cartItem.reduce((acc, item) => {
            return acc + parseInt(item.price)
        }, 0)
        this.setState({cartItem: cartItem, totalPrice: totalPrice});
    }

    isAuthenticated = () => {
        const isOrder = JSON.parse(localStorage.getItem('cartItem'));
        if (isOrder && isOrder.length==0) {
            return <Redirect to='/home'/>
        }
    };
    
    handleNameChange = event => {
        this.setState({name: event.target.value});
    };

    handleSubmit = event => {
        event.preventDefault();
        this.setState({isLoading: true});
        const headers = { 'Content-Type': 'application/json'}
        localStorage.setItem('userName', this.state.name)
        setTimeout( () =>{
            this.setState({redirect: true, isLoading: false});
        }, 2000)
        
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/order'/>
        }
    };

    render() {
        const isLoading = this.state.isLoading;
        return (
            <div className="container">
                 { this.isAuthenticated() } 
                <Header/>
 
                <br />
                <div className="row">
                    <div className="col-md-9 mb-0">
                        <h2>Checkout Form</h2>
                    </div>
                </div>
                <hr />

                <br />

                
                    <form className="card-body checkout-form" onSubmit={this.handleSubmit}>
                        <div className="row">
                        <div className="col-md-8 mb-4">
                            <h4 className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-muted">Fill given form in order to checkout</span>
                            </h4>

                            <div className="card">
                                
                                    <div className="row">
                                        <div className="col-md-6 mb-2">
                                            <div className="md-form ">
                                            <label className="">First name</label>
                                            <input type="text" name="name" id="name" className="form-control" onChange={this.handleNameChange} required/>
                                            
                                            </div>
                            
                                        </div>
                                        <div className="col-md-6 mb-2">
                                            <div className="md-form">
                                                <label className="">Last name</label>
                                                <input type="text" id="lastName" className="form-control" required/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-2">
                                            <div className="md-form ">
                                            <label className="">Email</label>
                                            <input type="email" id="firstName" className="form-control" required/>
                                            </div>
                            
                                        </div>
                                        <div className="col-md-6 mb-2">
                                            <div className="md-form">
                                                <label className="">Contact</label>
                                                <input type="number" id="lastName" className="form-control" required/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-2">
                                            <div className="md-form ">
                                            <label className="">City</label>
                                            <input type="text" id="firstName" className="form-control" required/>
                                            </div>
                            
                                        </div>
                                        <div className="col-md-6 mb-2">
                                            <div className="md-form">
                                                <label className="">State</label>
                                                <input type="text" id="lastName" className="form-control" required/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-2">
                                            <div className="md-form ">
                                            <label className="">Country</label>
                                            <input type="text" id="firstName" className="form-control" required/>
                                            </div>
                            
                                        </div>
                                        <div className="col-md-6 mb-2">
                                            <div className="md-form">
                                                <label className="">Address</label>
                                                <input type="text" id="lastName" className="form-control" required/>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    
                        <div className="col-md-4 mb-4">
                            <h4 className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-muted">Checkout Products</span>
                            </h4>
                            <ul className="list-group mb-3 z-depth-1">
                                
                                {
                                (this.state.cartItem)
                                ?
                                this.state.cartItem.map( (cartItem, index) =>
                                    ( <li key={cartItem._id} className="list-group-item d-flex justify-content-between lh-condensed">
                                        <div>
                                        <h6 className="my-0">{cartItem.title}</h6>
                                        <small className="text-muted">{cartItem.description}</small>
                                        </div>
                                        <span className="text-muted">${cartItem.price}</span>
                                    </li>
                                    )):''
                                }
                            
                            {
                            (this.state.cartItem.length>0)
                            ?
                                <li className="list-group-item d-flex justify-content-between">
                                    <span>Total Price(USD)</span>
                                    <strong>${this.state.totalPrice}</strong>
                                </li>: ''
                            }
                            </ul>
                            <div className="input-group-append">
                            <button className="btn btn-primary btn-block" type="submit" disabled={this.state.isLoading ? true : false}>Submit Checkout &nbsp;&nbsp;&nbsp;
                                    {isLoading ? (
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    ) : (
                                        <span></span>
                                    )}
                                </button>
                            </div>
                        </div>
                        
                    
                        </div>
                    </form>
                    {this.renderRedirect()}
            </div>
        );
    }
}
