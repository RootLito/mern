import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Update = () => {
  // get the id first
  const { id } = useParams();

  const [user, setUser] = useState({
    name: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try{
        const res = await axios.get('http://localhost:5050/users/' + id)
        setUser(res.data)
      }catch(err){
        alert('Failed to fetch')
      }
    }
    fetchUser()
  }, [id])


  const onInput = (e) => {
    const {name, value} = e.target
    setUser({
        ...user,
        [name]: value
    })
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try{

      const res = await axios.put(`http://localhost:5050/users/update/${id}`, user) 
      if(!res){
        return alert("Failed")
      }

      alert("Successfully updated")

    }catch(err){
      alert('Failed to update')
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
          Update Account
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
          onClick={onSubmit}
        >
          Update
        </button>
      </form>
    </>
  );
};

export default Update;
