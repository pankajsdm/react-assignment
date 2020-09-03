import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from "./pages/login";
import Category from "./pages/category/index";
import Product from "./pages/product/index";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import Order from "./pages/order";
import Register from "./pages/register";
import NotFound from "./pages/notfound";
import ProtectedRoute from './protected-route';

class App extends Component {
    
    

    render() {
        
        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route exact path='/' component={Login} />
                        <Route path='/register' component={Register} />
                        <ProtectedRoute path="/home" component={Category} />
                        <Route path='/product/:id' component={Product} />
                        <ProtectedRoute path='/cart' component={Cart} />
                        <ProtectedRoute path='/checkout' component={Checkout} />
                        <ProtectedRoute path='/order' component={Order} />
                        <Route path='*' component={NotFound} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
