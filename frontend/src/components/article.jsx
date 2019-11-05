import React, { Component } from "react";
import { Link } from "react-router-dom";

class Article extends Component {
  state = {};

  render() {
    const { article, user, onDelete, onRead, onEdit } = this.props;
    const url = `/addArticle/${btoa(JSON.stringify(article))}`;

    return (
      <li>
        <Link to={`/${article.id}`}>
          <input type="hidden" name="id" value={article.id} />
          <img
            src={require("../images/img_10.jpg")}
            alt="Image placeholder"
            className="mr-4"
          />
          <div className="text">
            <h4>{article.title}</h4>
            <div className="post-meta">
              <span className="mr-2">{article.excerpt}</span>
            </div>
          </div>
        </Link>
      </li>

      // <div className="card mb-2 shadow p-3 mb-5 bg-white rounded">
      //   <div className="card-body">
      //     <input type="hidden" name="id" value={article.id} />
      //     <h5 className="card-title">{article.title}</h5>
      //     <p className="card-text">{article.excerpt}</p>
      //     <Link to={`/${article.id}`}>
      //       <button
      //         className="btn btn-primary mr-2"
      //         // onClick={() => onRead(article)}
      //       >
      //         Read More ...
      //       </button>
      //     </Link>
      //     {/* {user && user.id == article.userId && (
      //       <React.Fragment>
      //         <Link to={url} className="btn btn-primary mr-2">
      //           Edit
      //         </Link>
      //         <button
      //             className="btn btn-primary mr-2"
      //             onClick={() => onEdit(article)}
      //           >
      //             Edit
      //           </button>
      //         <button
      //           className="btn btn-primary"
      //           onClick={() => onDelete(article.id)}
      //         >
      //           Delete
      //         </button>
      //       </React.Fragment>
      //     )} */}
      //   </div>
      // </div>
    );
  }
}

export default Article;
