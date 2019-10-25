import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/navBar";
import RegisterForm from "./components/registerForm";
import LoginForm from "./components/loginForm";
import ContactForm from "./components/contactForm";
import Home from "./components/home";
import auth from "./services/authService";
import Logout from "./components/logout";
import ArticleForm from "./components/articleForm";
// import NotFound from "./components/notFound";
// import About from "./components/about";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};

  async componentDidMount() {
    const user = await auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm}></Route>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/contact" component={ContactForm}></Route>
            <Route path="/logout" component={Logout}></Route>
            {/* <Route path="/addArticle" component={ArticleForm}></Route> */}
            <Route
              path="/addArticle/:article?"
              render={props => user && <ArticleForm {...props} user={user} />}
            ></Route>
            {/* <Route path="/" exact component={Home}></Route> */}
            <Route
              path="/"
              render={props => <Home {...props} user={user} />}
            ></Route>
            {/* <Route path="/about" component={About}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect to="/not-found" /> */}
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
