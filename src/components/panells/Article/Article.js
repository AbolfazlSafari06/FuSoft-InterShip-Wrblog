import articleService from '../../../services/articleService';
import CategoryService from '../../../services/CategoryService';
import Alert from './../../../common/Alert/Alert';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Search from './Search';


function Article() {
  const [articles, setArticles] = useState([])
  const [loadig, setLoadig] = useState(false)
  const [searchValue, setSearchValue] = useState();
  const [Error, setError] = useState("")
  const [message, setmessage] = useState()


  const deleteArticle = async (id) => {
    setLoadig(true);
    if (window.confirm("آیا مطمئن هستید")) {
      try {
        await articleService.deleteArticle(id);
        setmessage("کاربر با موفقیت حذف شد")
      } catch (error) {
        console.log(error);
        setError("خطا در حذف کاربر")
      }
    }
    setLoadig(false);
  }





  const getArticle = async (query = "", sort = "oldest", page = 1, perpage, categoryid) => {
    try {
      setLoadig(true)
      let articless = await articleService.getArtilces(query, sort, page, perpage = 30, categoryid); 
      if (Array.isArray(articless)) {
        setArticles(articless);
      } 
      setLoadig(false)
    } catch (error) {
      console.log(error);
      setError("خطا در دریافت داده");
      setLoadig(false)
    }
  }


  useEffect(() => {
    getArticle(searchValue?.query, searchValue?.sort, searchValue?.page, 30, searchValue?.categoryid);
  }, [searchValue]);



  const articleList = loadig ?
    <div className="p-5 text-center">
      Loading...
    </div> : (
      <table className="table table-bordered table-striped table-hover text-nowrap">
        <thead>
          <tr>
            <th>#</th>
            <th>عنوان مقاله</th>
            <th>نویسنده</th>
            <th>توضیحات</th>
            <th>دسته بندی</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => {
            return (
              <tr key={Math.floor(Math.random() * 1000000)}>
                <td>{articles.indexOf(article) + 1}</td>
                <td>{article.title}</td>
                <td>{article.user}</td>
                <td>{article.shortDescription}</td>
                <td>{article.category}</td>
                <td>
                  <button className="btn btn-danger btn-lg mx-2" onClick={deleteArticle}>حذف</button>
                  <Link className="btn btn-success btn-lg mx-2" to={`articles/edit/${article.id}`}  >ویرایش</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );

  return (
    <div>
      <h2 className="m-3">مدیریت مقالات</h2>
      <Alert type="success" message={message} onClose={() => setmessage("")} ></Alert>
      <Alert type="danger" message={Error} onClose={() => setError("")} ></Alert>
      <Search setSearchValue={setSearchValue}  />
      <div className="w-100 border">
        {articles?.length === 0 ? (
          <div className="text-center py-5 text-grey">
            <i className="fa fa-info fa-4x mb-4" />
            <p>هیچ مقاله ای وجود ندارد</p>
          </div>
        ) : articleList}
      </div>
    </div>
  )
}

export default Article
