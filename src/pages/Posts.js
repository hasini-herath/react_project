import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Posts() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [updatedPost, setUpdatedPost] = useState({
    id: "",
    title: "",
    description: "",
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    axios
      .get("http://localhost:3000/posts")
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const deletePost = (id) => {
    console.log(id);
    axios
      .delete(`http://localhost:3000/delete/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    window.location.reload();
  };
  const updatePost = (id, title, description) => {
    setUpdatedPost((prev) => {
      return {
        ...prev,
        id: id,
        title: title,
        description: description,
      };
    });
    handleShow();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const saveUpdatedPost = () => {
    console.log(updatedPost);
    axios
      .put(`http://localhost:3000/update/${updatedPost.id}`, updatedPost)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    handleClose();
    window.location.reload();
  };

  return (
    <div className='w-full h-screen flex'>
      <div className='w-[50%] h-[100%] justify-center items-center ml-20 mt-20'>
        <div className="font-mono text-4xl font-extrabold tracking-widest text-sky-800 justify-center items-center flex">
          <h1>Update a post</h1>
        </div>
        <div className="border-neutral-300	bg-slate-200 text-center border rounded-lg w-[600px] h-[350px] p-14 mt-20">
          <input className='w-[400px] h-[40px] rounded-xl p-2 mt-5'
            placeholder="Update Title"
            name="title"
            value={updatedPost.title ? updatedPost.title : ""}
            onChange={handleChange}
          />
          <input className='w-[400px] h-[40px] rounded-xl p-2 mt-5'
            placeholder="Update Description"
            name="description"
            onChange={handleChange}
            value={updatedPost.description ? updatedPost.description : ""}
          />
          <button className='text-white text-xl font-semibold tracking-wide w-[200px] h-[50px] rounded-2xl border bg-gradient-to-r from-yellow-400 to-red-600 ml-10 mt-10'
            onClick={() => navigate(-1)}
          >
            Back
          </button>
          <button className='text-white text-xl font-semibold tracking-wide w-[200px] h-[50px] rounded-2xl border bg-gradient-to-r from-cyan-600 to-blue-900 ml-10 mt-5' onClick={saveUpdatedPost}>
            Save Changes
          </button>
        </div>
      </div>
      <div className='w-[50%] h-[100%] justify-center items-center'></div>
      <div>
        <div className="font-mono text-4xl font-extrabold tracking-widest text-sky-800 justify-center items-center flex mt-20">
          <h1>All Post</h1>
        </div>
        {posts ? (
          <>
            {posts.map((post) => {
              return (
                <div className='border-neutral-300 bg-slate-200	text-center border rounded-lg w-[600px] h-[250px] mt-20 mr-20' key={post._id}
                >
                  <div className="mt-10 ">
                    <h4 className="font-bold text-xl">{post.title}</h4>
                    <p>{post.description}</p>
                  </div>
                  <div>
                    <button className='w-[200px] h-[50px] border text-white text-l font-semibold tracking-wide w-[200px] h-[40px] rounded-2xl	border bg-gradient-to-r from-cyan-600 to-blue-900 mt-10'
                      variant="outline-info"
                      onClick={() =>
                        updatePost(post._id, post.title, post.description)
                      }
                    >
                      UPDATE
                    </button>
                    <button className='w-[200px] h-[50px] border text-white text-l font-semibold tracking-wide w-[200px] h-[40px] rounded-2xl	border bg-gradient-to-r from-yellow-400 to-red-600 ml-10 mt-10'
                      onClick={() => deletePost(post._id)}
                      variant="outline-danger"
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
export default Posts;