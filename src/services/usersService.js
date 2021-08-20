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
async function Create(Name, Email) {
  try {
    const resopnse =  http.post("users/create", { name: Name, email: Email });
    return resopnse;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default {
  getAllUsers,Create
};
