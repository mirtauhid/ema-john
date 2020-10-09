import React, { useState } from 'react';
import logo from '../../images/logo.png';
import './Header.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../App';

const Header = (props) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    
    
    const handleSearch = event => {
        props.searchHandler(event.target.value);
    }
    
    
    return (
        <div className="header">
            <img src={logo} alt=""/>
            <input type="text" onBlur={handleSearch} className="product-search"/>
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/inventory">Manage Inventory</Link>
                <button onClick={() => setLoggedInUser({})}>Sign out</button>
            </nav>
        </div>
    );
};

export default Header;