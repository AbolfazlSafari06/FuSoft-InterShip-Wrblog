import http from "./base";

// async function getArtilces(query, sort, page = 1, perPage = 15) {
async function getArtilces(userid = "",query = "", sort = "", page = 1, perPage = 5, categoryId = "") {
  try {
    console.log(`article?userid=${userid}&query=${query}&sort=${sort}&page=${page}&perPage=${perPage}&categoryId=${categoryId}`);
    const { data } = await http.get(`article?userid=${userid}&query=${query}&sort=${sort}&page=${page}&perPage=${perPage}&categoryId=${categoryId}`);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.response?.data?.Message);
    throw error;
  }
}
async function getArtilcesView(count) {
  try {
    const { data } = await http.get(`article/articleView?count=${count}`); 
    return data;
  } catch (error) {
    console.log(error.response?.data?.Message);
    throw error;
  }
}

async function uploadImage(image) {
  try {
    const data = new FormData();
    data.append("image", image);
    await http.post(`article/image`, data, {
      "Content-Type": `multipart/form-data;`,
    });
  } catch (error) {
    let message = "خطا در آپلود تصویر";
    if (error.response?.data?.Message) {
      message = error.response?.data?.Message;
    }
    throw message;
  }
}

async function createNewArticle(Title, shortDescription, Body, Status, userId, categoryId) {
  try {
    console.log({ Title, Body, shortDescription, Status, userId, categoryId });
    const data = await http.post("article/create", { Title, Body, shortDescription, Status, userId, categoryId });
    return data;
  } catch (error) {
    console.log(error?.response?.data?.Message);
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
async function EditArticle(Id, Title, shortDescription, Body, createdAt, Status, userId, categoryId) {
  try {
    console.log( { Id, Title, Body, shortDescription, createdAt ,updatedAt:null, Status,  categoryId });
    const { data } = await http.post(`article/edit`, { Id, Title, Body, shortDescription, createdAt ,updatedAt:null, Status,  categoryId });
    return data;
  } catch (error) {
    throw error;
  }
}
async function getArticel(Id) {
  try {
    const { data } = await http.get(`article/${Id}`);
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
}

export default {
  getArtilces, createNewArticle, deleteArticle, EditArticle, getArticel, uploadImage,getArtilcesView
};
