import http from "./base";

async function getAllUsers() {
  try {
    const { data } = await http.get("users");
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
} 

export default {
  getAllUsers,
};
