import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import M from "materialize-css";
import axios from "axios";

// import ParticlesBg from "./particles";

const Home = () => {
  const [email, setEmail] = useState("");
  const [employeeEmails, setEmployeeEmails] = useState("");
  const navigate = useNavigate();

  const onLoad = async (event) => {
    await axios
      .get("api/users")
      .then((res) => {
        setEmployeeEmails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleSubmit(event) {
    event.preventDefault();
    setPath();
  }
  function handleChange(event) {
    setEmail(event.target.value);
  }
  function setPath() {
    const isPresent = employeeEmails.includes(email);
    const firstNameSmall = email.split(".")[0];
    const lastNameSmall = email
      .split(".")[1]
      .substring(0, email.split(".")[1].indexOf("@"));
    const firstNameCapital =
      firstNameSmall.charAt(0).toUpperCase() + firstNameSmall.slice(1);
    const lastNameCapital =
      lastNameSmall.charAt(0).toUpperCase() + lastNameSmall.slice(1);
    if (isPresent) {
      const fullName = `${firstNameCapital} ${lastNameCapital}`;
      M.toast({
        html: `Welcome ${fullName}`,
        classes: "toast-valid",
        displayLength: "2600",
        inDuration: "800",
        outDuration: "800",
      });
      navigate("/instructions", { state: { fullName: fullName } });
    } else {
      M.toast({
        html: "The Email you Entered in Invalid",
        classes: "toast-invalid",
        displayLength: 1500,
      });
    }
  }

  const adminConsole = (event) => {
    event.preventDefault();
    navigate("/admin-login");
  };
  return (
    <>
      <div
        id="home"
        onLoad={onLoad}
        className="bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700"
      >
        <section>
          <button
            onClick={adminConsole}
            data-ripple-light="true"
            data-popover-target="menu"
            className="flex self-end middle none center mr-3 rounded-lg bg-gradient-to-tr from-orange-600 to-orange-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-lg shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            Admin
          </button>

          <div>
            <img src="./assets/img/gebeya-logo.png" alt="gebeya logo" />
          </div>
          <h1 className="text-green">Quiz App</h1>

          <div className="play-button-container"></div>
          <div className="auth-container">
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={handleChange}
                placeholder="Enter your Gebeya Email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center flex items-center"
                size="30"
              ></input>

              <button
                className="bg-gradient-to-tr from-purple-600 to-purple-400 shadow-lg shadow-purple-500/20 transition-all hover:shadow-lg hover:shadow-purple-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="submit"
                id="login-button"
              >
                Login
                {/* < to={instructions}>Login</Link> */}
              </button>
              {/* <button
                  type="submit"
                  className="auth-buttons text-white"
                  id="login-button"
                >
                  Login
                </button> */}
            </form>
            {/* <Link to="/register" className="auth-buttons" id="signup-button">
              Register
            </Link> */}
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
