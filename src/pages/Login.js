import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from '../components/UserContext';

export default function Login() {

  let navigate = useNavigate()
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email:credentials.email, password:credentials.password}),
    });

    const json = await response.json()
    console.log(json);
    
    if(!json.success){
      alert("Invalid Credentials!");
    }
    if(json.success){
      localStorage.setItem("authToken",json.authToken);
      localStorage.setItem("userEmail", credentials.email);
      console.log(localStorage.getItem("authToken"))

      setUser({ email: credentials.email });

      navigate("/");
    }

  };
  

  const changeCredentials=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }

  return (
    <div  style={{
      backgroundImage: 'url("login_bg.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
      <div className="container mt-2" style={{
          fontFamily: 'cursive' ,
          fontWeight: 'bold'
        }}>
        <div className="row">
          <div className="col-4"></div>
          <div className="col-4">
            <form
              onSubmit={handleSubmit}
              style={{
                background: 'rgba(0, 0, 0, 0.4)',
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              <h2 className="text-warning mb-4">Log in to QuickDine!</h2>

              <div className="mb-3">
                <label
                  htmlFor="exampleInputEmail1"
                  className="form-label text-white"
                >
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  name="email"
                  value={credentials.email}
                  onChange={changeCredentials}
                  style={{ height: "30px" }}
                />
                <div id="emailHelp" className="form-text text-white"></div>
              </div>

              <div className="mb-3">
                <label
                  htmlFor="exampleInputPassword1"
                  className="form-label text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  name="password"
                  value={credentials.password}
                  onChange={changeCredentials}
                  style={{ height: "30px" }}
                />
              </div>
              <button
                type="submit"
                className="btn btn-warning btn-block"
                style={{
                  borderRadius: "5px",
                  height: "30px",
                  width: "100%",
                  padding: "1px",
                }}
              >
                Submit
              </button>
              <p className="mt-3 text-white">
                New User?{' '}
                <Link to="/createuser" className="text-warning">
                    Create Your Account!
                </Link>
              </p>
            </form>
          </div>
          <div className="col-4"></div>
        </div>
      </div>
    </div>
  )
}
