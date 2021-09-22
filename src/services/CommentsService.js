import http from "./base";


async function getComments(filter, page, perpage) {
    try {
        // console.log(`comments?filter=${filter}&page=${page}&perpage=${perpage}`);
        const { data } = await http.get(`comments?sort=${filter}&page=${page}&perPage=${perpage}`)
        return data;

    } catch (error) {
        console.log(error.response?.data?.Message);
        return error.response?.data?.Message;
    }
}
async function createComment(filter, page, perpage) {
    try {
        // console.log(`comments?filter=${filter}&page=${page}&perpage=${perpage}`);
        const { data } = await http.get(`comments?sort=${filter}&page=${page}&perPage=${perpage}`)
        return data;

    } catch (error) {
        console.log(error.response?.data?.Message);
        return error.response?.data?.Message;
    }
}



async function deleteComment(id) {
    try {
        console.log(id);
        const { data } = await http.delete(`comments?id=${id}`)
        console.log(data);
        return data;

    } catch (error) {
        console.log(error.response?.data?.Message);
        return error.response?.data?.Message;
    }
}
async function confirm(id) {
    try {
        console.log(id);
        const {data} = await http.put(`comments?id=${id}`) 
        console.log(data);
        return data;

    } catch (error) {
        console.log(error.response?.data?.Message);
        return error.response?.data?.Message;
    }
}
export default { getComments, deleteComment, confirm,createComment }