import React from 'react'
import { useEffect, useState } from "react"; 
import Alert from "../../../common/Alert/Alert";
import usersService from "../../../services/usersService"; 
import { Link } from 'react-router-dom';


function User() {
  const [users, setUsers] = useState([]);
  const [loading, setloading] = useState(false);
  const [message, setmessage] = useState("")
  const [Error, setError] = useState("")

  const getUsers = async () => {
    try {
      setloading(false);
      const users = await usersService.getAllUsers();
      if (Array.isArray(users)) {
        setUsers(users);
      }
      setloading(true);

    } catch (error) {
      console.log("error => " + error);
      setloading(false);
    }
  };

  const renderContent = () => {
    if (loading) {
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
                    <Link to={`/panel/users/${user.id}`} className={"btn btn-success mx-2 ms-2"}  >ویرایش</Link>
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
    getUsers();
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
      <h2>کاربران</h2> 
      <Alert type="success" message={message} onClose={()=>setmessage("")} ></Alert>
      <Alert type="danger" message={Error}  onClose={()=>setError("")} ></Alert>
      {renderContent()}
    </div >
  );
}


export default User
