import http from "./base";

async function getAllUsers(query = "", sort = "", page = 1, perPage = 15) {
  try {
    const { data } = await http.get(`users/getlist?query=${query}&sort=${sort}&page=${page}&perPage=${perPage}`);
    console.log(`users/getlist?query=${query}&sort=${sort}&page=${page}&perPage=${perPage}`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
async function createNewUser(Name, Email) {
  try {
    const data = await http.post("users/create", { name: Name, email: Email });
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
    console.log("Delete Eror => ", error);
    throw error;
  }
}
async function upDateUser(Id, Name, Email) {
  try {
    const { data } = await http.post(`users/update`, { id: Id, name: Name, email: Email });
    return data;
  } catch (error) {
    console.log("Delete Eror => ", error);
    throw error;
  }
}
async function getUser(Id) {
  try {
    const { data } = await http.post(`users/get/${Id}`);
    return data;
  } catch (error) {
    console.log("Delete Eror => ", error);
    throw error;
  }
}

export default {
  getAllUsers, createNewUser, deleteUser, upDateUser, getUser
};
