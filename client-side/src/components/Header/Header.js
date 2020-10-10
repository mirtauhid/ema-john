import React, { useState } from 'react';
import logo from '../../images/logo2.png';
import './Header.css';
import { Link, useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../App';

const Header = (props) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let history = useHistory();


    const handleSearch = event => {
        props.searchHandler(event.target.value);
    }


    return (
        <div className="header">
            <div className="row">
                <div className="col-md-3">
                    <img src={logo} alt="" />
                </div>
                <div className="col-md-6">
                    <input type="text" onBlur={handleSearch} placeholder="Search" className="product-search" />
                </div>
                <div className="col-md-3">
                    <p style={{color: 'white', float: 'left', marginTop: '15px'}}><strong>Hello, {loggedInUser.name}</strong></p>
                </div>
            </div>
            <div className="row">
                <nav>
                    <Link to="/">Shop</Link>
                    <Link to="/review">Order Review</Link>
                    <Link to="/inventory">Manage Inventory</Link>
                    {
                        loggedInUser.email ? <button onClick={() => setLoggedInUser({})}>Sign out</button> : 
                        <button onClick={() => history.push("/login")}>Sign In</button>
                    }
                </nav>
            </div>
        </div>
    );
};

export default Header;