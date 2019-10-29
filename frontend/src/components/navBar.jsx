import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    // <nav className="navbar navbar-expand-md  navbar-light bg-light">
    //   <div className="container">
    //     <div className="collapse navbar-collapse" id="navbarMenu">
    //       <ul className="navbar-nav mx-auto">
    //         <NavLink className="nav-link" to="/">
    //           Home
    //         </NavLink>
    //         <NavLink className="nav-link" to="/about">
    //           About
    //         </NavLink>
    //         <NavLink className="nav-link" to="/contact">
    //           Contact
    //         </NavLink>
    //         {!user && (
    //           <React.Fragment>
    //             <NavLink className="nav-link" to="/login">
    //               Login
    //             </NavLink>
    //             <NavLink className="nav-link" to="/register">
    //               Register
    //             </NavLink>
    //           </React.Fragment>
    //         )}
    //         {user && (
    //           <React.Fragment>
    //             <NavLink className="nav-link" to="/profile">
    //               {user.name}
    //             </NavLink>
    //             <NavLink className="nav-link" to="/addArticle">
    //               Add
    //             </NavLink>
    //             <NavLink className="nav-link" to="/logout">
    //               Logout
    //             </NavLink>
    //           </React.Fragment>
    //         )}
    //       </ul>
    //     </div>
    //   </div>
    // </nav>

    <header role="banner">
      <div className="top-bar">
        <div className="container">
          <div className="row">
            <div className="col-3 search-top">
              <form action="#" className="search-top-form">
                <span className="icon fa fa-search"></span>
                <input
                  type="text"
                  id="s"
                  placeholder="Type keyword to search..."
                />
              </form>
            </div>
          </div>
        </div>
      </div>

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
          <div className="collapse navbar-collapse" id="navbarMenu">
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
};

export default NavBar;
