import React,{useContext, useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import QuickDine from "../components/QuickDine.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Badge from "react-bootstrap/Badge"
import { UserContext } from './UserContext';

import axios from 'axios';
export default function Header() {


  const { user } = useContext(UserContext);
  const [cartItemCount, setCartItemCount] = useState(0);

  
  useEffect(() => {
    const fetchCartItemCount = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/cartItemCount?userEmail=${user.email}`);
        setCartItemCount(response.data.count);
      } catch (error) {
        console.error('Error fetching cart item count:', error);
      }
    };
    if (user.email) {
      fetchCartItemCount();
    }
  }, [user]);

  const nav = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    nav("/login");
  }



  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{
          background: "linear-gradient(to bottom, #FFB200, #FFA000)",
          fontFamily: "cursive",
          fontWeight: "bold",
        }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              src={QuickDine}
              alt="QuickDine Logo"
              height="50"
              style={{ marginTop: "-5px" }}
            />{" "}
            {/* Adjust height as needed */}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link text-dark active fs-5" aria-current="page" to="./">
                  Home
                </Link>
              </li>
            {(localStorage.getItem("authToken"))?
                <li className="nav-item">
                <Link className="nav-link text-dark active fs-5" aria-current="page" to="./myorder">
                  My Orders
                </Link>
              </li>
          :""}

            </ul>
            {(!localStorage.getItem("authToken"))?
            <div className="d-flex">
              <Link className="nav-link text-dark active fs-5" to="./login">
                Login
              </Link>
              <Link className="nav-link text-dark btn bg-danger text-white  fs-5" to="./createuser" style={{ borderRadius: "100px" }}>
                Sign Up
              </Link>
            </div>
            :
            <div className="d-flex">
              <Link className="nav-link text-dark active fs-5" to ="./cart">
                My Cart {" "}
                <Badge pill bg="danger" >{cartItemCount}</Badge>
              </Link>
              
              <Link className="nav-link text-white active fs-5" onClick={handleLogout} style={{ background: "#D62D41", borderRadius: "20px", marginLeft: "10px", padding: "8px 15px" }}>
                  <FontAwesomeIcon icon={faSignOutAlt} /> Logout
              </Link>
            </div>
            }
          </div>
        </div>
      </nav>
    </div>
    
  );
}
