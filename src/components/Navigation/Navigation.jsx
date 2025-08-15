import React from 'react'
import {NavLink} from "react-router-dom";

const navClass = ({ isActive }) => (isActive ? 'tabActive' : 'tab');

const Navigation = () => {
    return (
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <NavLink to="/" className="brand">
                <span className="brandMark" aria-hidden="true"/>
                Movie Search
            </NavLink>

            <div className="tabs">
                <NavLink className={navClass} to='/' end>Home Page</NavLink>
                <NavLink className={navClass} to='/movies'>Movies</NavLink>
            </div>
        </div>
    );
}

export default Navigation;