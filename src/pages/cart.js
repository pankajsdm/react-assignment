import React, { Component } from 'react';
import Header from "./../elements/header";
import { Link } from 'react-router-dom';


export default class Cart extends Component {

    
    constructor(props) {
        super(props);
        this.state = { 
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

    handleClick = async (position) =>{

        this.state.cartItem.splice(position, 1);

        const totalPrice = await this.state.cartItem.reduce((acc, item) => {
            return acc + parseInt(item.price)
        }, 0)

        this.setState({cartItem: this.state.cartItem, totalPrice: totalPrice});
        localStorage.setItem('cartItem', JSON.stringify(this.state.cartItem))
    }


    render() {
        return (
            <div className="container">
                <Header/>
 
                <br />
                <div className="row">
                    <div className="col-md-9 mb-0">
                        <h2>Listing product entry in Cart</h2>
                    </div>

                    <div className="col-md-3 mb-0">
                        {
                            (this.state.cartItem.length>0)
                            ?
                            <Link to={`/checkout`} >
                                <button className="btn btn-primary" type="button">
                                    Checkout
                                </button>
                            </Link>:''  
                        }   
                    </div>
                </div>
                <hr />

                <br />
                <section>
                    <div className="row">
                        {
                            (this.state.cartItem)
                            ?
                            this.state.cartItem.map( (cartItem, index) =>
                            (   <div key={cartItem._id} className="row mb-4">
                                    <div className="col-md-4 col-lg-3 col-xl-2">
                                        <div className="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                                            <img className="img-fluid" width="700" src={cartItem.icon} alt="Sample" />
                                        </div>
                                    </div>

                                    <div className="col-xl-8">
                                        <div className="d-flex justify-content-between">
                                            <div><h5>{cartItem.title}</h5> </div>
                                        </div>

                                        <div className="d-flex justify-content-between align-items-center">
                                            <a onClick={() => this.handleClick(index)} type="button" className="card-link-secondary small text-uppercase mr-3"><i  className="fas fa-trash-alt mr-1"></i> Remove item </a>
                                        </div>
                                    </div>

                                    <div className="col-xl-2 cartPrice">
                                        <p><span><strong id="summary">${cartItem.price}</strong></span></p>
                                    </div>
                                </div>
                            )):''
                        }

                    </div>
                    <hr />

                    {
                        (this.state.cartItem.length>0)
                        ?<div className="row">
                            <div className="col-md-10 mb-0">
                                <h4>Total Price</h4>
                            </div>

                            <div className="col-md-2 mb-0">
                                <h4>${this.state.totalPrice}</h4>
                            </div>
                        </div>:<div className="row">
                            <div className="col-md-12 text-center">
                                <h6>Cart is empty</h6>
                            </div>

                        </div>
                    }


                    <hr />
                </section>
            </div>
        );
    }
}
