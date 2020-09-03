import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Sidebar extends Component {
    
    constructor(props) {
        super(props);
    }

    categoryList(category) {
        if(category){
            return category.reduce((acc, item) => {
                acc.push(<li key={item._id} onClick={() => this.handleClick(item._id)} className="nav-item"><div className="nav-link"><span>&nbsp; {`${item.title}`}</span></div></li>);
                //acc.push(<li key={item._id} onClick={() => this.handleClick(item._id)} className="nav-item"><div className="nav-link"><span>&nbsp; {`${item.title}`}</span></div></li>);
                return acc;
            }, []);
        }
    }

    handleClick = (_id) =>{
        this.props.onSelectCategory(_id);  
    }

    render() {
        if(this.props.category)
            this.category = this.props.category.data;
        
        //console.log("this.state cat puhu", this.props)
        return (
            <div id="wrapper">
                <ul className="sidebar navbar-nav">
                    <li className="nav-item active">
                        <div className="nav-link"><i className="fas fa-fw fa-tachometer-alt"></i>
                            <span>&nbsp;Categories</span></div>
                    </li>
                    
                    {this.categoryList(this.category)}

                   
                    
                </ul>
            </div>
        );
    }
}
