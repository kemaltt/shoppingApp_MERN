
import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";


export default function SignUp() {

  const navigate = useNavigate();
  const [firstName, setFirstName] = useState();
  const [lastName, setlastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [alertClass, setAlertClass] = useState("alert alert-success d-none");

  const handleSubmit = (e) => {
    e.preventDefault();

    setFirstName("");
    setlastName("");
    setEmail("");
    setPassword("");
    setAlertClass("alert alert-success");

    setTimeout(() => {
      navigate("/login");
    }, 1000);

    // if (firstName && lastName && email && password) {
    //   navigate("/");
    // } else {
    //   setAlertClass("alert alert-danger");
    // }
  };



  return (
    <React.Fragment>
      <div className="register">
        <div className="form-image">
          <img
            src={"https://picsum.photos/800/800"}
            className="img-fluid"
            alt="photo"
          />
        </div>
        <div className="register-form">
          <div className={alertClass} role="alert">
            You have registered successfully!!!
          </div>
          <h1 className="form-title display-4">Register</h1>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="px-3"
            id="register"
          >
            <div className="mb-3">
              <label for="first-name" className="form-label ">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="first-name"
                placeholder="Enter your first name..."
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                required
              />
            </div>
            <div className="mb-3">
              <label for="last-name" className="form-label ">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="last-name"
                placeholder="Enter your last name..."
                onChange={(e) => setlastName(e.target.value)}
                value={lastName}
                required
              />
            </div>
            <div className="mb-3">
              <label for="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email address..."
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <div className="mb-3">
              <label for="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password..."
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>
            <input
              type="submit"
              className="btn btn-primary form-control"
              value="Register"
            />
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}
