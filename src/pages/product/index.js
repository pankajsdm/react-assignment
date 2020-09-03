import React, { Component } from 'react';
import Header from "./../../elements/header";
import { Link } from 'react-router-dom';
import axios from 'axios';
var CONFIG = require('./../../config/local');


export default class Product extends Component {

    constructor(props) {
        super(props);
        this.state = { variationPrice : 0, isProductInCart: false, isVariationSelected: false };
    }

    componentDidMount(){
        const isAuthenticated = localStorage.getItem('token');
        const headers = { 'Authorization': isAuthenticated}
        axios.get( `${CONFIG.apiUrl}/product/pagination`,  {
            headers: headers
          }).then(result => {
            if (result.data.statusCode==200) {
                if(result.data.data){
                    var ffilteredProduct = result.data.data.data.filter(product =>{
                        return product._id === this.props.match.params.id
                    });
                    this.existProductFilter(ffilteredProduct);
                    this.setState({singleProduct: ffilteredProduct})
                }
            }
        })
        .catch(error => {
            console.log(error);
            this.setState({authError: true, isLoading: false});
        });
    }

    existProductFilter(product){
        if(product){
            const cartItem = JSON.parse(localStorage.getItem('cartItem'))
            const isExistArr = cartItem.filter(cartArr => {
                return cartArr._id === product[0]._id
            });
            if(isExistArr && isExistArr.length>0){
                this.state.isProductInCart  = true;
            }
        }
    }

    handleClick = () =>{
        //this.state.isProductInCart  = true;
        this.setState({isProductInCart: true});
        const cartItem = JSON.parse(localStorage.getItem('cartItem'))
        const productData = {
            _id: this.state.singleProduct[0]._id,
            categoryID: this.state.singleProduct[0].categoryID,
            icon: this.state.singleProduct[0].icon,
            title: this.state.singleProduct[0].title,
            description: this.state.singleProduct[0].description,
            price: this.state.variationPrice,
            qty: 1,
        }

        console.log("this.state", this.state)
        cartItem.push(productData);
        localStorage.setItem('cartItem', JSON.stringify(cartItem))

    }

    render() {
        return (
            <div className="container">
                <Header/>

                <br/>

                {
                    (!this.state)
                        ? 'Loading product....'
                        : <div>
                            
                            {
                                (this.state.singleProduct)
                                ?<div className="row">

                                    {                                   
                                     (this.state.singleProduct[0].title)
                                        ?<div className="col-md-4 mt-3">
                                            <h3>{this.state.singleProduct[0].title}</h3>
                                        </div>:''
                                    }

                                    
                                </div>: ''
                            }
                            

                            {
                                (this.state.singleProduct)
                                ?
                                <div className="row">
                                <div className="col-md-6 mb-5">
                                    <div className="card h-100">
                                    <img className="card-img-top" src={this.state.singleProduct[0].icon} alt="" />
                                    </div>
                                </div>
                                
                                <div className="col-md-4 mb-5">
                                    
                                <div className="card-footer">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h6>Product Meta Data </h6>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-footer">
                                    

                                    <div className="row">
                                        <div className="col-md-7">
                                            <h6>Name</h6>
                                        </div>
                                        <div className="col-md-5 p-0">
                                            {this.state.singleProduct[0].title}
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-8 mt-3">
                                            <h6>Merchant Name</h6>
                                        </div>
                                        {
                                            (this.state.singleProduct[0].merchantID.name)
                                            ?<div className="col-md-4 mt-3">
                                                {this.state.singleProduct[0].merchantID.name}
                                            </div>:''
                                        }
                                        

                                    </div>

                                    <div className="row">
                                        <div className="col-md-8 mt-3">
                                            <h6>Variations</h6>
                                        </div>
                                        <div className="col-md-4 mt-3">
                                            <select name="variation" onChange={(e) => this.setState({variationPrice: e.target.value, isVariationSelected: true})}>
                                                <option value="0">Select</option>
                                            {   
                                                (!this.state.singleProduct[0].variation)
                                                ?'':
                                                this.state.singleProduct[0].variation.map(vrt => 
                                                    (<option key={vrt._id} value={vrt.variationFlatPrice}>{vrt.title}</option>)
                                                )
                                            }
                                            </select>
                                        </div>
                                    </div>
                                            
                                    {
                                        (this.state.variationPrice==0)
                                        ?'':<div className="row">
                                                <div className="col-md-8 mt-3">
                                                    <h6>Price</h6>
                                                </div>
                                                <div className="col-md-4 mt-3">
                                                    ${this.state.variationPrice}
                                                </div>
                                            </div>
                                    }


                                </div>
                                
                                    <div className="row">
                                        <div className="col-md-12 mt-5">
                                        { (!this.state.isProductInCart)?
                                            
                                            (this.state.isVariationSelected)?
                                                <button onClick={() => this.handleClick()} type="button" className="btn btn-secondary btn-sm"> Add to Cart</button>:''
                                            
                                            
                                            
                                            :<div>
                                                <button type="button" className="btn btn-secondary btn-sm" disabled> Already added in cart</button>
                                                &nbsp;&nbsp; &nbsp; &nbsp; 
                                                <Link to={`/cart`} >
                                                <button type="button" className="btn btn-secondary btn-sm"> View Cart</button>
                                                </Link>
                                            </div>
                                            
                                        }   
                                        </div>
                                    </div>
                                       
                            </div>
                        </div>:''
                        }
                    </div>
                }
            </div>
        );
    }
}
