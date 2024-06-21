import React from 'react'
import { NavLink } from 'react-router-dom';
import './utils/loader.style.css';

const Navbar = () => {
  
    return ( 
      <nav className="navbar navbar-expand-lg bg-dark bg-body-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">P News</NavLink>
          <button className="navbar-toggler"
            style={{color:'white', background:'white'}}
            type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" ></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
                <NavLink to="/" 
                  className="nav-link"  
                  style={{color: "white"}}
                >Home</NavLink>
            </li>
           
            <li className="nav-item">
              <NavLink className="nav-link" to="/business" style={{color: "white"}}>Business</NavLink>
              </li>
              
            <li className="nav-item">
              <NavLink className="nav-link" to="/general" style={{color: "white"}}>General</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/health" style={{color: "white"}}>Health</NavLink>
            </li>

                <li className="nav-item">
              <NavLink className="nav-link" to="/science" style={{color: "white"}}>Science</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sports" style={{color: "white"}}>Sports</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/technology" style={{color: "white"}}>Technology</NavLink>
            </li>


          </ul>
        </div>
      </div>
    </nav>
    
      
    );
}
export default Navbar;
