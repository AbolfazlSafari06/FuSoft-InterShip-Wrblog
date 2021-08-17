import { useEffect, useState } from "react";
import usersService from "../../services/usersService";

function Home() {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const users = await usersService.getAllUsers();
      if (Array.isArray(users)) {
        setUsers(users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container py-5">
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
      <div>
        
      </div>
    </div>
  );
}

export default Home;
