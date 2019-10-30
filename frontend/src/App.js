import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import MetaTags from "react-meta-tags";
import NavBar from "./components/navBar";
import RegisterForm from "./components/registerForm";
import LoginForm from "./components/loginForm";
import ContactForm from "./components/contactForm";
import Home from "./components/home";
import Logout from "./components/logout";
import ArticleForm from "./components/articleForm";
import auth from "./services/authService";
// import NotFound from "./components/notFound";
// import About from "./components/about";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "./css/animate.css";
import "./css/bootstrap.css";
import "./css/style.css";
import "./css/owl.carousel.min.css";
import "./fonts/flaticon/font/flaticon.css";
import "./fonts/fontawesome/css/font-awesome.min.css";
import "./fonts/ionicons/css/ionicons.min.css";

class App extends Component {
  state = {};

  async componentDidMount() {
    const user = await auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <div className="wrap bg-white">
        <MetaTags>
          <title>Wordify</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
        </MetaTags>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm}></Route>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/contact" component={ContactForm}></Route>
            <Route path="/logout" component={Logout}></Route>
            {/* <Route path="/addArticle" component={ArticleForm}></Route> */}
            {/* <Route
              path="/addArticle/:article?"
              render={props => user && <ArticleForm {...props} user={user} />}
            ></Route> */}
            {/* <Route path="/" exact component={Home}></Route> */}
            <Route
              path="/addArticle/:article?"
              render={props => (
                <Home {...props} user={user} element={{ add: 1 }} />
              )}
            ></Route>
            <Route
              path="/"
              render={props => <Home {...props} user={user} />}
            ></Route>
            {/* <Route path="/about" component={About}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect to="/not-found" /> */}
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
