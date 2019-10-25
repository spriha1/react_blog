import React, { Component } from "react";
import { Link } from "react-router-dom";
import article from "../services/articleService";
import Article from "./article";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import _ from "lodash";

class Home extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.searchRef = React.createRef();
  }

  async componentDidMount() {
    const data = await article.getArticles();
    const articles = data.data;
    this.setState({ data, articles, currentArticle: articles[0] });
  }

  handleDelete = async id => {
    const status = await article.deleteArticle(id);
    if (status === 200) {
      const originalArticles = this.state.articles;
      const articles = originalArticles.filter(a => a.id !== id);
      this.setState({ articles, currentArticle: articles[0] });
    }
  };

  onPageChange = async page => {
    const result = await article.getArticles(page);
    this.setState({ data: result, articles: result.data, currentPage: page });
  };

  handleClick = () => {};

  handleRead = article => {
    const originalArticles = [...this.state.articles];
    const a = originalArticles.filter(a => a.id == article.id);
    this.setState({ currentArticle: a[0] });
    // console.log(a);
    // const currentArticle = { ...this.state.articles[article.id] };
    // this.setState({ currentArticle });
  };

  handleSearch = e => {
    // e.preventDefault();
    // console.log(this.searchRef.current.value);
    const articles = article.searchArticle(this.searchRef.current.value);
    // this.setState({ currentArticle: article });
  };

  handleEdit = article => {};

  render() {
    const { articles, data, currentPage, currentArticle } = this.state;
    const { user } = this.props;
    const pages = data ? _.range(1, data.last_page + 1) : [0];
    return (
      <div className="row">
        {currentArticle && (
          <div className="col-md-9">
            <form className="form-inline mb-2 mt-2">
              <div className="input-group mb-2 mr-sm-2">
                <input
                  ref={this.searchRef}
                  type="text"
                  placeholder="Search"
                  name="search"
                  onChange={this.handleSearch}
                />
              </div>
              {/* <button
                type="submit"
                className="btn btn-primary mb-2"
                onClick={this.handleSearch}
              >
                Submit
              </button> */}
            </form>

            <div className="card mb-2">
              <div className="card-body">
                <input type="hidden" name="id" value={currentArticle.id} />
                <h5 className="card-title">{currentArticle.title}</h5>
                <div className="card-text">
                  {parse(DOMPurify.sanitize(currentArticle.details))}
                </div>
                {user && user.id == currentArticle.userId && (
                  <React.Fragment>
                    <Link to="#" className="btn btn-primary mr-2">
                      Edit
                    </Link>
                    {/* <button
                  className="btn btn-primary mr-2"
                  onClick={() => onEdit(currentArticle)}
                >
                  Edit
                </button> */}
                    <button
                      className="btn btn-primary"
                      onClick={() => this.handleDelete(currentArticle.id)}
                    >
                      Delete
                    </button>
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>
        )}
        <div className="col-md-3">
          {articles &&
            articles.map(article => (
              <Article
                key={article.id}
                article={article}
                user={user}
                onRead={this.handleRead}
                onEdit={this.handleEdit}
                onDelete={this.handleDelete}
              />
            ))}

          <nav>
            <ul className="pagination">
              {pages.map(page => (
                <li
                  key={page}
                  className={
                    page === currentPage ? "page-item active" : "page-item"
                  }
                >
                  <a
                    className="page-link"
                    onClick={() => this.onPageChange(page)}
                  >
                    {page}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default Home;
