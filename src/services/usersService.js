import http from "./base";

async function getAllUsers(query, sort, page = 1, perPage = 1) {
  try {
    const { data } = await http.get(`users/getlist?query=${query}&sort=${sort}&page=${page}&perPage=${perPage}`); 
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
async function createNewUser(name, email, password, IsAdmin) {
  try {
    const data = await http.post("users/create", { name, email, password, IsAdmin });
    return data;
  } catch (error) {
    // console.log();
    throw error;
  }
}
async function deleteUser(id) {
  try {
    await http.delete(`users/Delete/${id}`);
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
  getAllUsers, createNewUser, deleteUser, upDateUser, getUser
};
