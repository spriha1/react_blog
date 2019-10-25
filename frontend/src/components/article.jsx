import React, { Component } from "react";
import { Link } from "react-router-dom";

class Article extends Component {
  state = {};

  render() {
    const { article, user, onDelete, onRead, onEdit } = this.props;
    const url = `/addArticle/${btoa(JSON.stringify(article))}`;

    return (
      <div className="card mb-2">
        <div className="card-body">
          <input type="hidden" name="id" value={article.id} />
          <h5 className="card-title">{article.title}</h5>
          <p className="card-text">{article.excerpt}</p>
          <button
            className="btn btn-primary mr-2"
            onClick={() => onRead(article)}
          >
            Read More ...
          </button>
          {user && user.id == article.userId && (
            <React.Fragment>
              <Link to={url} className="btn btn-primary mr-2">
                Edit
              </Link>
              {/* <button
                  className="btn btn-primary mr-2"
                  onClick={() => onEdit(article)}
                >
                  Edit
                </button> */}
              <button
                className="btn btn-primary"
                onClick={() => onDelete(article.id)}
              >
                Delete
              </button>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default Article;
