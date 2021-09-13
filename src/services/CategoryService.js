import http from "./base";

async function getAllCategories() {
  try {
    const { data } = await http.get(`category`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
async function createNewCategory(title, order, parent) {
  try {
    const data = await http.post("category/create", { title, order, parent });
    return data;
  } catch (error) {
    // console.log();
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
async function upDateCategories(id, title, order, parent) {
  try {
    const { data } = await http.post(`users/update`, { id, title, order, parent });
    return data;
  } catch (error) {
    throw error;
  }
}
export default {
  getAllCategories, createNewCategory, deleteCategories, upDateCategories
};
