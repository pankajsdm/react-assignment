import React, { Component } from 'react';
import Header from "./../../elements/header";
import Sidebar from "./../../elements/sidebar";
import Products from "./products";
import { Link } from 'react-router-dom';
import axios from 'axios';
var CONFIG = require('./../../config/local');

export default class Category extends Component {
    
    category = [];
    serchText = "";
    state = {
        isLoading: false,
        searchRecord: [],
        blank: "",
        isSubmitedSearch: false,
        searchKeyword: ''
    };

    componentDidMount(){
        this.setState({isLoading: true});
        axios.get( `${CONFIG.apiUrl}/subcategory/pagination`, {}).then(result => {
                if (result.data.statusCode==200) {
                    this.setState({results: result.data.data});
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({authError: true, isLoading: false});
            });
    };

    handleSearchInput = event => {
        this.serchText = event.target.value;
    };

    handleSubmit = event => {
        event.preventDefault();

        this.setState({searchKeyword: this.serchText, isSubmitedSearch: true});
        const isAuthenticated = localStorage.getItem('token');
        const headers = { 'Authorization': isAuthenticated}
        axios.get( `${CONFIG.apiUrl}/product/search?keyword=${this.serchText}`,  {
            headers: headers
          }).then(result => {
            if (result.data.statusCode==200) {
                this.setState({searchRecord: result.data.data})
            }
        })
        .catch(error => {
            console.log(error);
            this.setState({authError: true, isLoading: false});
        });
        
    };

    handleCategory = (subcategoryID) =>{
        this.setState({searchKeyword: 'subcategoryID', isSubmitedSearch: true});
        const isAuthenticated = localStorage.getItem('token');
        const headers = { 'Authorization': isAuthenticated}
        axios.get( `${CONFIG.apiUrl}/product/pagination?subcategoryID=${subcategoryID}`,  {
            headers: headers
          }).then(result => {
            if (result.data.statusCode==200) {
                this.setState({searchRecord: result.data.data.data})
            }
        })
        .catch(error => {
            console.log(error);
            this.setState({authError: true, isLoading: false});
        });
    }

    render() {
        

        return (
            <div className="container">
                <Header/>
                <br/>
                <div className="row">
                    <div className="col-md-9 mb-0">
                        <h2>Category and Product Listing </h2>
                    </div>
                    <div className="col-md-3 mb-0">
                    <form onSubmit={this.handleSubmit} className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
                        <div className="input-group">
                            <input type="text" name="searchText" onChange={this.handleSearchInput} className="form-control" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                            <div className="input-group-append">
                                <button type="submit" className="btn btn-primary">
                                    <i className="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                    </div>
                </div>
                <hr/>


                <div className="row">
                    <div className="col-md-3 mb-0">
                        <Sidebar onSelectCategory={this.handleCategory} category={this.state.results}></Sidebar>
                    </div>
                    <div className="col-md-9 mb-0">

                     

  
                       {
                            (this.state.isSubmitedSearch)
                            ?<Products searchRecord={this.state.searchRecord}></Products>
                            :<Products></Products>
                        }
                        
                    </div>
                </div>
            </div>
        );
    }
}
