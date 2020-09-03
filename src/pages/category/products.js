import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
var CONFIG = require('./../../config/local');

export default class Products extends Component {
    
    constructor(props) {
        super(props);
        
    }

    state = {
        isLoading: false,
        products: [],
        noProductFound: false
    };

    componentDidMount(){
       this.fetchProduct();
    };

    fetchProduct(){
        const isAuthenticated = localStorage.getItem('token');
        const headers = { 'Authorization': isAuthenticated}
        axios.get( `${CONFIG.apiUrl}/product/pagination`,  {
            headers: headers
          }).then(result => {
            if (result.data.statusCode==200) {
                this.setState({products: result.data.data.data})

                if(result.data.data.data.length==0)
                    this.setState({noProductFound:true})
                else
                    this.state.noProductFound = false
            }
        })
        .catch(error => {
            console.log(error);
            this.setState({authError: true, isLoading: false});
        });
    }

    render() {

        if(this.props.searchRecord){
            this.state.products = this.props.searchRecord;
            if(this.state.products.length==0)
                this.state.noProductFound = true
            else
                this.state.noProductFound = false
        }
   
        return (

            <div className="row">
                {
                    
                    (this.state.noProductFound)
                            ? <div className="alert alert-primary col-md-12" role="alert">Sorry! No product found with this specified search text.</div>: ''
                }

                {
                     (!this.state.products)
                        ? 'Loading product....'
                        :  this.state.products.map(item => (
                            <div key={item._id} className="col-md-4 mb-3">
                                {(item.title)?
                                    <div className="card">
                                        <div className="card-header text-center">{item.title}</div>
                                        <Link to={`/product/${item._id}`} >
                                        <img className="card-img-top" src={item.icon} alt="" />
                                        </Link>
                                        
                                        <div className="card-footer">
                                            <div className="row">
                                                    {/* <div className="col-md-7">
                                                        
                                                        {(item.variation && item.variation[0])?<span>${item.variation[0].variationFlatPrice}</span>:''}
                                                    </div> */}
                                                <div className="col-md-12 text-center">
                                                <Link to={`/product/${item._id}`} >
                                                    <button  type="button" className="btn btn-secondary btn-sm"> View Product</button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                : '' }
                            </div>
                        ))
                    }
            </div>
        );
    }
}
