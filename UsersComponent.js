import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function UsersComponent() {
  const [users, setUsers] = useState([]);
  const [inputUser, setInputUser] = useState({
    username: "",
    password: "",
  });

  const userNameChange = (e) => {
    setInputUser({
      ...inputUser,
      username: e.target.value,
    });
  };

  const userPasswordChange = (e) => {
    setInputUser({
      ...inputUser,
      password: e.target.value,
    });
  };

  const addUser = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("http://localhost:8000/users", inputUser);
    setUsers([...users, data]);
    setInputUser({
      username: "",
      password: "",
    });
  };

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await axios.get("http://localhost:8000/users");
      setUsers(data);
    };
    getUsers();
  }, []);

  return (
    <div>
      <div className="user-form">
        <form>
          <label>Username: </label>
          <input
            type="text"
            placeholder="Username"
            onChange={userNameChange}
            value={inputUser.username}
          />
          <label>Password: </label>
          <input
            type="password"
            placeholder="Password"
            onChange={userPasswordChange}
            value={inputUser.password}
          />
        </form>
        <button onClick={addUser}>Add</button>
      </div>
      <div className="user-list">
        {users.map((user) => (
          <div className="user-card" key={user.id}>
            <p>{user._id}</p>
            <h3>Username: {user.username}</h3>
            <p>Password: {user.password}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
