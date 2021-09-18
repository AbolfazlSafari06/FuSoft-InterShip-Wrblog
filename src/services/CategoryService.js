import http from "./base";

async function getAllCategories() {
  try {
    const data = await http.get(`category`);
    console.log("category",data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
async function getlistOfCategoriesWithNameAndid() {
  try {
    const {data} = await http.get(`category/listofnameandid`);
    console.log("category",data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
async function getCategory(id) {
  try {
    const { data } = await http.get(`category/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
}

async function createNewCategory(title, order, parentId) {
  try {
    const data = await http.post("category/create", { title, order, parentId });
    return data;
  } catch (error) {
    console.log();
    throw error;
  }
}
async function deleteCategories(id) {
  try {
    await http.delete(`category/Delete/${id}`);
  } catch (error) {
    throw error;
  }
}
async function upDateCategories(id, title, order, parentid) {
  try {
    const { data } = await http.post(`category/update`, { id, title, order, parentid });
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
}

async function getParentCategory(name) {
  try {
    const { data } = await http.get(`category/getparents/${name}`);
    console.log("parents=>", data);
    return data
  } catch (error) {
    throw error;
  }
}

export default {
  getAllCategories, createNewCategory, deleteCategories, upDateCategories, getParentCategory, getCategory, getlistOfCategoriesWithNameAndid
};
