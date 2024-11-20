import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserList.css";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";

const UserList = ({ onEdit, onCreate }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // Customize users per page

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const fetchUsers = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users`
      );
      const startIndex = (page - 1) * usersPerPage;
      setUsers(response.data.slice(startIndex, startIndex + usersPerPage));
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch users");
    }
  };

  const deleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id));
      toast.success("User deleted successfully!");
    }
  };

  return (
    <div className="user-list">
      <button className="add-btn" onClick={onCreate}>
        Add User
      </button>
      {loading ? (
        <div className="loading-container" >
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
          />
          </div>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name.split(" ")[0]}</td>
                  <td>{user.name.split(" ")[1]}</td>
                  <td>{user.email}</td>
                  <td className="buttons-container">
                    <button onClick={() => onEdit(user)}>Edit</button>
                    <button
                      className="dlt-btn"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination ">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Previous
            </button>
            <span>Page {currentPage}</span>
            <button onClick={() => setCurrentPage((prev) => prev + 1)}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserList;
