import React from 'react'
import { useEffect, useState } from "react";
import Alert from "../../../common/Alert/Alert";
import usersService from "../../../services/usersService";
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';


function User() {
  const [users, setUsers] = useState([]);
  const [loading, setloading] = useState(false);
  const [message, setmessage] = useState("")
  const [Error, setError] = useState("")
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();

  const getUsers = async (query = "", sort = "") => {
    try {
      setloading(false);
      const users = await usersService.getAllUsers(query, sort); 
      if (Array.isArray(users.data)) {
        setUsers(users.data);
      }
      setloading(true); 
    } catch (error) {
      console.log("error => " + error);
      setloading(false);
    }
  };


  const onFilterSubmit = (data) => {

    getUsers(data.query, data.sort)
    console.log(data.query, data.sort);

  }
  const onFilterReseet = () => {

  }
  const renderContent = () => {
    if (!loading) {
      return (
        <div className="p-5 text-center">
          Loading...
        </div>
      )
    }
    if (users.length > 0) {
      return (
        <table className="table table-bordered table-striped table-hover text-nowrap">
          <thead>
            <tr>
              <td>#</td>
              <td>نام کاربر</td>
              <td>ایمیل کاربر</td>
              <td>عملیات</td>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={`user-${user.id}`}>
                  <td>{users.indexOf(user) + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <Link to={`/panel/users/${user.id}/edit`} className={"btn btn-success mx-2 ms-2"}  >ویرایش</Link>
                    <button onClick={() => onDeleteuser(user.id)} className={"btn btn-danger mx-2 ms-2"}  >حدف</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )
    } else {
      return (
        <div className="text-center py-5 text-grey">
          <i className="fa fa-info fa-4x mb-4" />
          <p>هیچ کاربری وجود ندارد</p>
        </div>
      )
    }
  }

  useEffect(() => {  
  }, [users]);


  const onDeleteuser = async (id) => {
    try {
      if (window.confirm("آیا مطمئن هستید؟")) {
        await usersService.deleteUser(id);
        await getUsers();
        setmessage("کاربر با موفقیت پاک شد.")
        setloading(false);
      }

    } catch (error) {
      setError("عملیات با موفقیت انجام نشد.")
      setloading(false);
    }
  }


  return (
    <div className="container py-3 my-4 h-100" style={{ width: "100%" }}>
      <div className="row mb-5">
        <div className="col-2 offset-8">
          <h2>کاربران</h2>
        </div>
        <div className="col-2 text-center">
          <Link to="/panel/users/create" className="btn btn-primary">ایجاد کاربر جدید </Link>
        </div>
        <div>
          <form className=" form-inline row gy-2 gx-3 align-items-center" onSubmit={handleSubmit(onFilterSubmit)}>
            <div className="col-auto">
              <input type="text" className="form-control" id="autoSizingInput" name="query" placeholder="جستجو..." {...register("query")} />
            </div>
            <div className="col-auto">
              <select className="form-select" id="autoSizingSelect" name="sort" {...register("sort")} >
                <option value="">مرتب سازی بر اساس</option>
                <option value="latest">جدید ترین</option>
                <option value="oldest">قدیمی ترین</option>
              </select>
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">ثبت</button>
            </div>
            <div className="col-auto">
              <button type="button" onClick={onFilterReseet} className="btn btn-info">نشان دادن همه</button>
            </div>
          </form>
        </div>
      </div>
      <Alert type="success" message={message} onClose={() => setmessage("")} ></Alert>
      <Alert type="danger" message={Error} onClose={() => setError("")} ></Alert>
      {renderContent()}
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li className="page-item"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div >
  );
}


export default User
