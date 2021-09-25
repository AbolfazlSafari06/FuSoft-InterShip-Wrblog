import http from "./base";


// async function getComments(filter, page, perpage,userid) {
//     try {
//         // console.log(`comments?sort=${filter}&page=${page}&perPage=${perpage}`);
//         const { data } = await http.get(`comments?sort=${filter}&page=${page}&perPage=${perpage}&userid=${userid}`)
//         console.log(data);
//         return data;
//     } catch (error) {
//         console.log(error);
//         return error.response?.data?.Message;
//     }
// }

async function getCommentsForArticle(articleId, page, perpage) {
    try {
        console.log(`comments/view?articleId=${articleId}&page=${page}&perPage=${perpage}`);
        const { data } = await http.get(`comments/view?articleId=${articleId}&page=${page}&perPage=${perpage}`)
        console.log("data", data);
        return data;
    } catch (error) {
        console.log(error);
        return error.response?.data?.Message;
    }
}


async function createComment(articleId, userId, body, number,fullname) {
    try {
        console.log(articleId, userId, body, number );
        const { data } = await http.post(`comments/create`, { articleId, userId, body, number ,fullname})
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
        const { data } = await http.put(`comments?id=${id}`)
        console.log(data);
        return data;

    } catch (error) {
        console.log(error.response?.data?.Message);
        return error.response?.data?.Message;
    }
}
export default { deleteComment, confirm, createComment, getCommentsForArticle }