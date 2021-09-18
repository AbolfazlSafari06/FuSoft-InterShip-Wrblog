import http from "./base";

// async function getArtilces(query, sort, page = 1, perPage = 15) {
async function getArtilces(query, sort, page = 1, perPage = 30, categoryId="") {
  try {
    // console.log(`article?query=${query}&sort=${sort}&page=${page}&perPage=${perPage}&categoryId=${categoryId}`);
    const { data } = await http.get(`article?query=${query}&sort=${sort}&page=${page}&perPage=${perPage}&categoryId=${categoryId}`);
    // // console.log(Array.isArray(data));
    // console.log(data);
    // console.log(data.data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
async function createNewArticle(name, email, password, IsAdmin) {
  try {
    const data = await http.post("users/create", { name, email, password, IsAdmin });
    return data;
  } catch (error) {
    // console.log();
    throw error;
  }
}
async function deleteArticle(id) {
  try {
    await http.delete(`article/delete/${id}`);
  } catch (error) {
    throw error;
  }
}
async function upDateUser(id, name, email, password, IsAdmin) {
  try {
    const { data } = await http.post(`users/update`, { id, name, email, password, IsAdmin });
    return data;
  } catch (error) {
    throw error;
  }
}
async function getUser(Id) {
  try {
    const { data } = await http.post(`users/get/${Id}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export default {
  getArtilces, createNewArticle, deleteArticle, upDateUser, getUser
};
