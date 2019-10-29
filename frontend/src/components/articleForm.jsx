import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
// import { Editor } from "react-draft-wysiwyg";
// import { EditorState, convertToRaw } from "draft-js";
// import draftToHtml from "draftjs-to-html";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-build-classic-simple-upload-adapter";
// import htmlToDraft from "html-to-draftjs";
import Joi from "joi-browser";
import Form from "./common/form";
import article from "../services/articleService";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

class ArticleForm extends Form {
  state = {
    data: { title: "", details: "", userId: "", token: "", articleId: "" },
    errors: {}
  };

  schema = {
    title: Joi.string()
      .required()
      .label("Title"),
    details: Joi.required(),
    userId: Joi.number(),
    token: Joi.string()
  };

  componentDidMount() {
    if (this.props.user) {
      if (this.props.formProps.match.params) {
        var data = { ...this.state.data };
        const { currentArticle } = this.props;
        console.log(currentArticle);
        data.title = currentArticle.title;
        data.details = currentArticle.details;
        data.articleId = currentArticle.id;
      }
      data.userId = this.props.user.id;
      data.token = this.props.user.token;
      this.setState({ data });
    }
  }

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await article.addArticle(data);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  uploadCallback(file) {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      var url = reader.readAsDataURL(file);
      resolve({ data: { link: url } });
    });
  }

  render() {
    const { editorState } = this.state;
    // const { article } = this.props.match.params;
    // if (article) {
    //   console.log("hi", article);
    // }

    return (
      <div>
        <h1>Article</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("userId", "User Id", "text", true)}
          {this.renderInput("token", "Token", "text", true)}
          {this.renderInput("articleId", "articleId", "text", true)}

          {this.renderInput("title", "Title")}
          <CKEditor
            editor={ClassicEditor}
            // data={this.state.data.details}
            onInit={editor => {
              editor.setData(this.state.data.details);
              // You can store the "editor" and use when it is needed.
            }}
            onChange={(event, editor) => {
              //   const data = editor.getData();
              const data = { ...this.state.data };
              data.details = editor.getData();
              //   setArticle(data);
              this.setState({ data });
            }}
            config={{
              simpleUpload: {
                // The URL that the images are uploaded to.
                uploadUrl: "http://blogbackend.local.com/api/upload",

                // Headers sent along with the XMLHttpRequest to the upload server.
                headers: {
                  "X-CSRF-TOKEN": "CSRF-Token",
                  Authorization: `Bearer${this.state.token}`
                }
              }
            }}
          />
          {this.state.data.title && (
            <button
              type="button"
              onClick={() => this.props.onEdit(this.state.data)}
              className="btn btn-primary"
            >
              Update
            </button>
          )}
          {!this.state.data.title && this.renderButton("Add Article")}
        </form>
      </div>
    );
  }
}

export default ArticleForm;
