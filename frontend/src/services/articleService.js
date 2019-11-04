import http from "./httpService";
import { toast } from "react-toastify";
import auth from "./authService";

const apiEndpoint = "http://blogbackend.local.com/api/articles";
const tokenKey = "token";

export async function getArticles(page) {
  if (page === undefined) {
    var { data } = await http.get(apiEndpoint);
  } else {
    var { data } = await http.get(apiEndpoint + "?page=" + page);
  }

  if (data) {
    return data;
  } else {
    toast.error("There is an error in fetching the posts !!!");
  }
}

export async function getArticle(id) {
  var { data } = await http.get(
    "http://blogbackend.local.com/api/article/" + id
  );
  return data;
}

export function toaster(status) {
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
  const user = await auth.getCurrentUser();
  const { data, status } = await http.post(apiEndpoint, { article, user });
  await toaster(status);
  return data;
}

export async function updateArticle(article) {
  const user = await auth.getCurrentUser();
  const { data, status } = await http.put(apiEndpoint, { article, user });
  await toaster(status);
  return data;
}

export async function deleteArticle(id) {
  const user = await auth.getCurrentUser();
  const { status } = await http.delete(apiEndpoint + "/" + id, {
    data: { user }
  });
  await toaster(status);
  return status;
}

export async function searchArticles(value) {
  const apiEndpoint = "http://blogbackend.local.com/api/search";
  //   const { data, status } = await http.post(apiEndpoint, { value: value });
  const { data } = await http.post(apiEndpoint, { value: value });
  return data;
}

export default {
  getArticles,
  addArticle,
  updateArticle,
  deleteArticle,
  searchArticles,
  getArticle
};
