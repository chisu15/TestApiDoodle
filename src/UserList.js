import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserList.css'; // Tạo file CSS tương ứng

const UserList = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    axios.get('https://music-web-orcin.vercel.app/api/v1/user', { withCredentials: true })
      .then(response => {
        console.log(response.data); // Log the response data
        setUserList(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching user list:', error);
      });
  }, []);

  // Handle loading state
  if (!Array.isArray(userList)) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-list-container">
      <h2>User List</h2>
      <table className="user-list-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList.length > 0 ? (
            userList.map(user => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button className="edit-link">Edit</button>
                  <button className="delete-link">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
