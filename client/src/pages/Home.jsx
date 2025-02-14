import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5050/users");
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      const res = axios.delete(`http://localhost:5050/users/delete/${id}`);
      if (!res) {
        return alert("Failed");
      }

      setUsers((prevUsers) => prevUsers.filter(({ _id }) => _id !== id));
      alert("Successfully delete");
    } catch (err) {
      return alert("Failed to delete user");
    }
  };

  return (
    <div>
      <table className="w-[720px] border-collapse p-2 bg-white rounded-md overflow-hidden">
        <thead>
          <tr>
            <th className="p-2 bg-slate-400 text-slate-700">Name</th>
            <th className="p-2 bg-slate-400 text-slate-700">Username</th>
            <th className="p-2 bg-slate-400 text-slate-700">Password</th>
            <th className="p-2 bg-slate-400 text-slate-700">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user._id}>
                <td className="p-2 text-center">{user.name}</td>
                <td className="p-2 text-center">{user.username}</td>
                <td className="p-2 text-center">{user.password}</td>
                <td className="p-2 text-center">
                  <Link
                    to={"/update/" + user._id}
                    className="mr-5 py-1 px-3 bg-emerald-500 rounded-md text-sm text-emerald-900 font-semibold"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="mr-5 py-1 px-3 bg-red-300 rounded-md text-sm text-red-900 font-semibold cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
