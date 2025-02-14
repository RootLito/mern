import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <div className="mb-5 bg-slate-400 w-[360px] p-3 rounded-md flex justify-center gap-5 font-bold text-white">
        <a href="/">Home</a>
        <a href="/add">Add</a>
    </div>
  )
}

export default Nav