import articleService from '../../../services/articleService';
import Alert from './../../../common/Alert/Alert';
import Search from './Search';

import Pagination from '../../../common/Pagination';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';


function Article({ user }) {
  const [articles, setArticles] = useState([])
  const [totalArticleAmount, settotalArticleAmount] = useState(0)
  const [loadig, setLoadig] = useState(false)
  const [searchValue, setSearchValue] = useState();
  const [Error, setError] = useState("")
  const [message, setmessage] = useState()
  const [page, setPage] = useState(1)


  const getArticle = async (query = "", sort = "oldest", page = 1, perpage, categoryid) => {
    try {
      setLoadig(true)
      let articless = await articleService.getArtilces(user.id, query, sort, page, perpage = 1, categoryid);
      if (Array.isArray(articless.data)) {
        setArticles(articless.data);
        settotalArticleAmount(articless.lenght)
        console.log(articless.data);
      }
      setLoadig(false)
    } catch (error) {
      console.log(error);
      setError("خطا در دریافت داده");
      setLoadig(false)
    }
  }

  const deleteArticle = async (id) => {
    if (window.confirm("آیا مطمئن هستید")) {
      setLoadig(true);
      try {
        await articleService.deleteArticle(id);
        setmessage("مقاله با موفقیت حذف شد");
        getArticle(searchValue?.query, searchValue?.sort, searchValue?.page, 30, searchValue?.categoryid);
        setLoadig(false);
      } catch (error) {
        setLoadig(false);
        console.log(error);
        setError("خطا در حذف مقاله")
      }
    }
  }
  const truncate = (str) => {
    return str.length > 35 ? str.substring(0, 35) + "..." : str;
  }
  useEffect(() => {
    getArticle(searchValue?.query, searchValue?.sort, searchValue?.page, 30, searchValue?.categoryid);
  }, [searchValue]);

  const onPageClick = (page) => {
    console.log(totalArticleAmount);
    setPage(page)
    getArticle(searchValue?.query, searchValue?.sort, page, 30, searchValue?.categoryid);
  }

  const articleList = loadig ?
    <div className="p-5 text-center">
      Loading...
    </div> : (
      <div className="overflow-auto">
        <table className="table table-bordered table-striped table-hover text-nowrap">
          <thead>
            <tr>
              <th>#</th>
              <th className="text-center">عنوان مقاله</th>
              <th className="text-center">توضیحات</th>
              <th className="text-center">تاریخ ایجاد</th>
              <th className="text-center">تاریخ آخرین بروزرسانی</th>
              <th className="text-center">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => {
              return (
                <tr key={Math.floor(Math.random() * 1000000)}>
                  <td className="text-center">{articles.indexOf(article) + 1}</td>
                  <td className="text-center">{article.title}</td>
                  <td className="text-center" style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{
                    truncate(article.shortDescription)
                  }</td>
                  <td className="text-center">{article.createdAt}</td>
                  <td className="text-center">
                    {
                      article.createdAt === article.updatedAt ? <div>بدون بروزرسانی</div> : article.updatedAt
                    }
                  </td>
                  <td className="text-center">
                    <button className="btn btn-danger btn-lg mx-2" onClick={() => deleteArticle(article.id)}>حذف</button>
                    <Link className="btn btn-success btn-lg mx-2" to={`/panel/article/${article.id}/edit`}  >ویرایش</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );

  return (
    <div>
      <h2 className="m-3">مدیریت مقالات</h2>
      <Alert type="success" message={message} onClose={() => setmessage("")} ></Alert>
      <Alert type="danger" message={Error} onClose={() => setError("")} ></Alert>
      <div className="row d-felx align-items-center mb-3 ">
        <div className="col-6 offset-2 offset-md-1 col-md-7">
          <Search loading={loadig} setSearchValue={setSearchValue} />
        </div>
        <div className="col-4  col-md-2">
          <Link className="btn btn-success mx-2 ms-2" to={"/panel/articles/create"}>ساخت مقاله جدید</Link>
        </div>
      </div>
      <div className="w-100 border">
        {articles?.length === 0 ? (
          <div className="text-center py-5 text-grey">
            <i className="fa fa-info fa-4x mb-4" />
            <p>هیچ مقاله ای وجود ندارد</p>
          </div>
        ) : articleList}
      </div>
      <div className="my-4">
        <Pagination total={totalArticleAmount} currentPage={page} perPage={1} onPageClick={onPageClick} />
      </div>
    </div>
  )
}

const mapState = (state) => {
  return {
    user: state?.user
  }
}


export default connect(mapState, null)(Article)
