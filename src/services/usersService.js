import http from "./base";

async function getAllUsers() {
  try {
    const { data } = await http.get("users/getlist");
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
async function createNewUser(Name, Email) {
  try {
    const { data } = await http.post("users/create", { name: Name, email: Email });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
async function deleteUser(id) {
  console.log(id);
  try {
    const { data } = await http.delete(`users/Delete/${id}`);
    return data;
  } catch (error) {
    console.log("Delete Eror => ", error);
    throw error;
  }
}
async function upDateUser(Id,Name, Email) {
  try {
    const { data } = await http.post(`users/update`,{id:Id,name:Name,email:Email});
    return data;
  } catch (error) {
    console.log("Delete Eror => ", error);
    throw error;
  }
}

export default {
  getAllUsers, createNewUser, deleteUser ,upDateUser
};
