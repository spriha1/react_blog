import React, { Component } from "react";
import { Link } from "react-router-dom";
import article from "../services/articleService";
import Article from "./article";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import _ from "lodash";
import Select from "react-select";
import ArticleForm from "./articleForm";

class Home extends Component {
  state = { currentArticle: {} };

  constructor(props) {
    super(props);
    this.searchRef = React.createRef();
  }

  async componentDidMount() {
    const data = await article.getArticles();
    const articles = data.data;
    this.setState({ data, articles, currentArticle: articles[0] });
  }

  async componentDidUpdate() {
    const data = await article.getArticles();
    const articles = data.data;
    if (this.state.currentArticle.id != articles[0].id) {
      this.setState({ currentArticle: articles[0], articles: articles });
    }
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
  };

  handleSearch = async e => {
    const articles = await article.searchArticles(this.searchRef.current.value);
    const searchArticles = [...articles];
    this.setState({ searchArticles });
  };

  handleSelect = selectedOption => {
    this.setState({ currentArticle: selectedOption.value });
  };

  handleEdit = async a => {
    const data = await article.updateArticle(a);
    const art = this.state.articles.filter(a => a.id == data.id);

    const articles = [...this.state.articles];
    const index = articles.indexOf(art);
    articles[index] = { ...articles[index] };
    articles[index].title = data.title;
    articles[index].details = data.details;
    this.setState({ articles });
    window.location.href = "/";
  };

  render() {
    const { articles, data, currentPage, currentArticle } = this.state;
    const { user, element, match } = this.props;
    const pages = data ? _.range(1, data.last_page + 1) : [0];
    return (
      <React.Fragment>
        {element && match.params.article && (
          <ArticleForm
            formProps={this.props}
            currentArticle={currentArticle}
            onEdit={this.handleEdit}
            user={user}
          />
        )}
        {element && !match.params.article && (
          <ArticleForm
            formProps={this.props}
            onEdit={this.handleEdit}
            user={user}
          />
        )}
        {!element && (
          <div className="row">
            {currentArticle && (
              <div className="col-md-9 shadow p-3 mb-5 bg-white rounded">
                <div className="sidebar-box search-form-wrap">
                  <form className="form-inline search-form">
                    <div className="input-group mb-2 mr-2">
                      <span className="icon fa fa-search"></span>
                      <input
                        className="form-control"
                        id="s"
                        ref={this.searchRef}
                        type="text"
                        placeholder="Search"
                        name="search"
                        onChange={this.handleSearch}
                      />
                      {this.state.searchArticles && (
                        <Select
                          value={this.currentArticle}
                          onChange={this.handleSelect}
                          options={
                            this.state.searchArticles &&
                            this.state.searchArticles.map(a => ({
                              label: a.title,
                              value: a
                            }))
                          }
                        />
                      )}
                    </div>
                    {/* <button
                type="submit"
                className="btn btn-primary mb-2"
                onClick={this.handleSearch}
                >
                Submit
              </button> */}
                  </form>
                </div>

                <div className="card mb-2 shadow p-3 mb-5 bg-white rounded">
                  <div className="card-body">
                    <input type="hidden" name="id" value={currentArticle.id} />
                    <h5 className="card-title">{currentArticle.title}</h5>
                    <div className="card-text">
                      {parse(DOMPurify.sanitize(currentArticle.details))}
                    </div>
                    {user && user.id == currentArticle.userId && (
                      <React.Fragment>
                        <Link
                          to={`/addArticle/${currentArticle.id}`}
                          className="btn btn-info mr-2"
                        >
                          Edit
                        </Link>
                        {/* <button
                  className="btn btn-primary mr-2"
                  onClick={() => onEdit(currentArticle)}
                >
                  Edit
                </button> */}
                        <button
                          className="btn btn-danger"
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
        )}
      </React.Fragment>
    );
  }
}

export default Home;
