import { useEffect, useState } from "react";
import usersService from "../../services/usersService";
import Adduser from "../user/Adduser";

function Home() {
  const [users, setUsers] = useState([]);
  const [showadduser, setshowadduser] = useState(false)


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

  const showadd = () => {
    setshowadduser(!showadduser);
    console.log("clicked");
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container py-5 my-4">
      <h2>کاربران</h2>
      {users.length > 0 ? (
        <table className="table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <td>#</td>
              <td>نام کاربر</td>
              <td>ایمیل کاربر</td>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={`user-${user.id}`}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
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
      )}
      {
        showadduser ? <Adduser /> : <div className={"row gx-2"}>
          <div className={"col-1 p-1 ms-1"}>
            <button className={"btn btn-warning"} onClick={() => showadd()}>افزودن کاربر</button>
          </div>
        </div>
      }
    </div>
  );
}

export default Home;
