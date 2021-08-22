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
    const {data} = await http.post("users/create", { name: Name,email: Email });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default {
  getAllUsers, createNewUser
};
