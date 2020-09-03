import React, { Component } from 'react';
import Header from "./../elements/header";
import {Link, Redirect} from 'react-router-dom';


export default class Order extends Component {

    
    constructor(props) {
        super(props);
        this.state = { 
            cartItem: [],
            userName: '',
        };
    }

    async componentDidMount(){
        const cartItem = JSON.parse(localStorage.getItem('cartItem'));
        const userName = localStorage.getItem('userName');
        if(cartItem && cartItem.length>0){
            const totalPrice = await cartItem.reduce((acc, item) => {
                return acc + parseInt(item.price)
            }, 0)
            this.setState({cartItem: cartItem, totalPrice: totalPrice, userName: userName});
        }
        localStorage.removeItem('userName');
        localStorage.setItem('cartItem', JSON.stringify([]));
    }

    isAuthenticated = () => {
        const isOrder = JSON.parse(localStorage.getItem('cartItem'));
        if (isOrder && isOrder.length==0) {
            return <Redirect to='/home'/>
        }
    };


    render() {
        return (
            <div className="container">
                 { this.isAuthenticated() } 
                <Header/>
                <br />
                <div className="row">
                    <div className="col-md-9 mb-0">
                        <h2>Order Successfull!</h2>
                    </div>
                </div>
                <hr />

                <br />

                
                    <form className="card-body checkout-form">
                        <div className="row">
                       
                    
                        <div className="col-md-12 mb-4">
                            <h6 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-muted"><strong>Dear {this.state.userName},</strong> <br /><br /><br />Thanks for submitting this order. Here is the order information.</span>
                            </h6>
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
                            <span className="text-muted">We will process this order very soon and update you shortily via email. You can contact us through email for further inquiry and also can track you order from your profile.</span>
                            </div>
                        </div>
                        
                    
                        </div>
                    </form>
           
            </div>
        );
    }
}
