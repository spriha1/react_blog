import http from "./httpService";
import { toast } from "react-toastify";

const apiEndpoint = "http://blogbackend.local.com/api/articles";
const tokenKey = "token";

export async function getArticles(page) {
  if (page === undefined) {
    var { data } = await http.get(apiEndpoint);
  } else {
    var { data } = await http.get(apiEndpoint + "?page=" + page);
    // console.log("else", data.data);
  }

  if (data) {
    return data;
  } else {
    toast.error("There is an error in fetching the posts !!!");
  }
}

function toaster(status) {
  return new Promise((resolve, reject) => {
    if (status !== 200) {
      toast.error("There is an error in completing the action !!!", {
        onClose: () => {
          resolve();
        }
      });
    } else {
      toast.success("Action completed successfully", {
        onClose: () => {
          resolve();
        }
      });
    }
  });
}

export async function addArticle(article) {
  // console.log("post");
  const { data, status } = await http.post(apiEndpoint, article);
  await toaster(status);
  return data;
}

export async function updateArticle(article) {
  // console.log("put");
  const { data, status } = await http.put(apiEndpoint, article);
  await toaster(status);
}

export async function deleteArticle(id) {
  const { status } = await http.delete(apiEndpoint + "/" + id);
  await toaster(status);
  return status;
}

export async function searchArticles(value) {
  const apiEndpoint = "http://blogbackend.local.com/api/search";
  //   const { data, status } = await http.post(apiEndpoint, { value: value });
  const { data } = await http.post(apiEndpoint, { value: value });
  return data;
  // console.log(data);
  // console.log(config.data);
}

export default {
  getArticles,
  addArticle,
  updateArticle,
  deleteArticle,
  searchArticles
};
