import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../assets/logo-codeCook.svg';

const Navbar = () => {
    return (
        <div className='header'>
            <div className='header-links'>
                <Link to="/">
                    <img src={logo} alt='Logo Code & Cook'></img>
                </Link>
                <h3>Code & Cook</h3>
            </div>
        </div>
    )
}

export default Navbar;
