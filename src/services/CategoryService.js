import http from "./base";

async function getAllCategories(Page = 1, PerPage) {
  try {
    console.log(`category?page${Page}&PerPage${PerPage}`);
    const { data } = await http.get(`category?page=${Page}&PerPage=${PerPage}`);
    console.log("category", data);
    return data;
  } catch (error) {
    console.log(error?.response?.data?.Message);
    throw error;
  }
}
async function getCategoryViewList(PerPage) {
  try {
    // console.log(`category/view?PerPage${PerPage}`);
    const { data } = await http.get(`category/view?PerPage=${PerPage}`);
    console.log("category", data);
    return data;
  } catch (error) {
    console.log(error?.response?.data?.Message);
    throw error?.response?.data?.Message;
  }
}
async function getlistOfCategoriesWithNameAndid() {
  try {
    const { data } = await http.get(`category/listofnameandid`);
    console.log("category", data);
    return data;
  } catch (error) {
    console.log(error?.response?.data?.Message);
    throw error?.response?.data?.Message;
  }
}
async function getCategory(id) {
  try {
    const { data } = await http.get(`category/${id}`);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw error?.response?.data?.Message;
  }
}

async function createNewCategory(title, order, parentId) {
  try {
    console.log({ title, order, parentId });
    const data = await http.post("category/create", { title, order, parentId });
    return data;
  } catch (error) {
    console.log(error?.response?.data?.Message);
    throw error?.response?.data?.Message;
  }
}
async function deleteCategories(id) {
  try {
    await http.delete(`category/Delete/${id}`);
  } catch (error) {
    throw error?.response?.data?.Message;
  }
}
async function upDateCategories(id, title, order, parentid) {
  try {
    const { data } = await http.post(`category/update`, { id, title, order, parentid });
    console.log(data);
    return data;
  } catch (error) {
    throw error?.response?.data?.Message;
  }
}

async function getParentCategory(name) {
  try {
    const { data } = await http.get(`category/getparents/${name}`);
    console.log("parents=>", data);
    return data
  } catch (error) {
    throw error?.response?.data?.Message;
  }
}

export default {
  getAllCategories, createNewCategory, deleteCategories, upDateCategories, getParentCategory, getCategory, getlistOfCategoriesWithNameAndid, getCategoryViewList
};
