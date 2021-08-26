import React from 'react'
import { useEffect, useState } from "react";
import usersService from "../../../services/usersService";
import Adduser from "../../../components/user/Adduser";
import Updateuser from "../../../components/user/Updateuser";

function User() {
    const [users, setUsers] = useState([]);
    const [showadduser, setshowadduser] = useState(false)
    const [showUpdateUseer, setshowUpdateUseer] = useState(false)
    const [userIdToUpdate, setuserIdToUpdate] = useState(null)
  
  
    const getUsers = async () => {
      try {
        const users = await usersService.getAllUsers();
        if (Array.isArray(users)) {
          setUsers(users);
        }
      } catch (error) {
        console.log("error => " + error);
      }
    };
  
    const DaleteUser = async (id) => {
      try {
        console.log(id);
  
        await usersService.deleteUser(id);
      } catch (error) {
        console.log("error => " + error);
      }
    };
  
  
  
    const showadd = () => {
      setshowadduser(!showadduser);
    }
  
    const ShowUpdateUseer = () => {
      setshowUpdateUseer(!showUpdateUseer);
      
    }
  
    useEffect(() => {
      getUsers();
    }, [users]);
    return (
      <div className="container py-5 my-4 h-100" style={{width:"100%"}}>
        <h2>کاربران</h2>
        {users.length > 0 ? (
          <table className="table table-bordered table-striped table-hover">
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
                    <td>{users.indexOf(user) +1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <button className={"btn btn-danger my-2"} onClick={() => DaleteUser(user.id)}>حذف</button>
                      <button className={"btn btn-warning mx-2"} onClick={() => {ShowUpdateUseer();setuserIdToUpdate(user.id)}}>ویرایش</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-5 text-grey">
            <i className="fa fa-info fa-4x mb-4" />
            <p>هیچ کاربری وجود ندارد</p>
          </div>
        ) 
        }
  
        {
          showUpdateUseer && <Updateuser id={userIdToUpdate} />
        }
  
        {
          showadduser ? <Adduser show={showadd} /> : <div className={"row gx-2"}>
            <div className={"col-1 p-1 ms-1"}>
              <button className={"btn btn-success"} onClick={() => showadd()}>افزودن کاربر</button>
            </div>
          </div>
        }
  
      </div >
    );
}

export default User
