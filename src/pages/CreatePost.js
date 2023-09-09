import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function SignUp() {
  const [post, setPost] = useState({
    title: "",
    description: "",
  });
  const navigate = useNavigate();
    const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const createPost = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/create", post)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    navigate("/posts");
  };

  return (
    <div className='w-full h-screen flex'>
      <div className='w-[100%] h-[100%] flex justify-center items-center bg-white text-black'>
        <form >
          <h1 className='text-center text-black text-5xl font-semibold tracking-wider leading-loose'>Create Post</h1>
          <div className='border-neutral-300	bg-slate-200 text-center border rounded-lg w-[600px] h-[300px] p-14'>
            <input className='w-[400px] h-[40px] rounded-xl p-2'
              name="title"
              value={post.title}
              onChange={handleChange}
              style={{ marginBottom: "1rem" }}
              placeholder="Enter Title"
            />
            <input className='w-[400px] h-[40px] rounded-xl p-2'
              onChange={handleChange}
              name="description"
              value={post.description}
              style={{ marginBottom: "1rem" }}
              placeholder="Enter Description"
            />
            <button className='text-white text-xl font-semibold tracking-wide w-[400px] h-[50px] rounded-2xl	border  bg-gradient-to-r from-cyan-600 to-blue-900'
              onClick={createPost}
              variant="outline-success"
            >
              CREATE POST
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default SignUp