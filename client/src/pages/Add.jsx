import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Add = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        name: "",
        username: "",
        password: ""
    })

  const onInput = (e) => {
    const {name, value} = e.target
    setUser({
        ...user,
        [name]: value
    })
  };

  const onSumbit = async (e) => {
    e.preventDefault();

    if (!user.name || !user.username || !user.password) {
        alert("Please fill in all fields.");
        return;
    }

    if (user.password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
    }

    try{
        const res = await axios.post('http://localhost:5050/users/add', user)
        if (res.status === 200 || res.status === 201) {
            alert("Successfully saved");
            navigate('/');
        } else {
            alert("Failed to save");
        }

        setUser({
            name: "",
            username: "",
            password: ""
        })


        console.log(user)
    }catch(err){
        console.log(err)
        alert("Error")
    }
  };

  return (
    <>
      <form
        action=""
        method="post"
        className="flex flex-col gap-2 w-[360px] bg-white p-5 rounded-md"
      >
        <p className="text-center text-gray-500 mb-3 font-bold text-xl">
          Create Account
        </p>
        <input
          type="text"
          name="name"
          value={user.name}
          className="p-3 border border-slate-400 rounded-md"
          placeholder="Name"
          onChange={onInput}
        />
        <input
          type="text"
          name="username"
          value={user.username}
          className="p-3 border border-slate-400 rounded-md"
          placeholder="Username"
          onChange={onInput}
        />
        <input
          type="text"
          name="password"
          value={user.password}
          className="p-3 border border-slate-400 rounded-md"
          placeholder="Password "
          onChange={onInput}
        />
        <button
          className="p-3 bg-slate-500 text-white rounded-md cursor-pointer"
          onClick={onSumbit}
        >
          Save
        </button>
      </form>
    </>
  );
};

export default Add;
