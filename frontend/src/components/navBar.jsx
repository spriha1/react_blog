import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class NavBar extends Component {
  state = { toggle: false };

  setToggle = () => {
    const toggle = !this.state.toggle;
    this.setState({ toggle });
  };

  render() {
    const { user } = this.props;
    return (
      <header role="banner" className="mb-5">
        <div className="container logo-wrap">
          <div className="row pt-5">
            <div className="col-12 text-center">
              <a
                className="absolute-toggle d-block d-md-none"
                data-toggle="collapse"
                href="#navbarMenu"
                role="button"
                aria-expanded="false"
                aria-controls="navbarMenu"
                onClick={this.setToggle}
              >
                <span className="burger-lines"></span>
              </a>
              <h1 className="site-logo">
                <a>Wordify</a>
              </h1>
            </div>
          </div>
        </div>

        <nav className="navbar navbar-expand-md  navbar-light bg-light">
          <div className="container">
            <div
              className={
                this.state.toggle
                  ? "collapse navbar-collapse show"
                  : "collapse navbar-collapse"
              }
              id="navbarMenu"
            >
              <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/about">
                    About
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/contact">
                    Contact
                  </NavLink>
                </li>
                {!user && (
                  <React.Fragment>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/login">
                        Login
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/register">
                        Register
                      </NavLink>
                    </li>
                  </React.Fragment>
                )}
                {user && (
                  <React.Fragment>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/profile">
                        {user.name}
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/addArticle">
                        Add
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/logout">
                        Logout
                      </NavLink>
                    </li>
                  </React.Fragment>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

export default NavBar;
