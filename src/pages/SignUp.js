import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
export default function SignUp() {
  
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password, location:credentials.geolocation}),
    });

    const json = await response.json()
    console.log(json);
    
    if(!json.success){
      alert("Invalid Credentials!");
    }

  };
  

  const changeCredentials=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }

  return (
    
    <div  style={{
      backgroundImage: 'url("Sign_Up_bg.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
      <div className="container mt-3" style={{
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
              <h3 className="text-warning mb-4">Sign Up and Explore!</h3>
              <div className="mb-3">
                <label htmlFor="name" className="form-label text-white">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name ="name"
                  value={credentials.name} 
                  onChange={changeCredentials}
                  style={{ height: "30px" }}
                />
                <div className="form-text text-white"></div>
              </div>
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
              <div className="mb-4">
                <label htmlFor="name" className="form-label text-white">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="geolocation"
                  name ="geolocation"
                  value={credentials.geolocation} 
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
                Already have an account?{' '}
                <Link to="/login" className="text-warning">
                  Login
                </Link>
              </p>
            </form>
          </div>
          <div className="col-4"></div>
        </div>
      </div>
    </div>
  );
}
