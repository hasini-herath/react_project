import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function SignUp() {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    useEffect(() => {
        fetchUsers();
    }, [])
    const fetchUsers = () => {
        axios
            .get('http://localhost:3000/register')
            .then((res) => {
                // console.log(res.data)
            })
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post('http://localhost:3000/register', { email, username, password })
            .then(() => {
                alert('Registration Successful')
                setEmail('')
                setUsername('')
                setPassword('')
                fetchUsers();
                navigate('/login')
            })
            .catch((error) => {
                console.log('Unable to register user')
            })
    }

    return (
        <div className='w-full h-screen flex'>
            <div className='w-[30%] h-[100%] bg-slate-200  flex justify-center items-center'>
                <div>
                    <div>
                        <h2 className='font-mono text-5xl font-extrabold tracking-widest text-sky-800 flex justify-center items-center'>Sign Up</h2>
                    </div>
                    <div className='text-xl'>
                        <h1 className='mt-10'>Already have an account?</h1>
                        <Link className='justify-center items-center flex mt-5 text-blue-800 underline' to='/signup'>sign In</Link>
                    </div>
                </div>
            </div>
            <div className='w-[70%] h-[100%] flex justify-center items-center'>
                <form className='text-center border bg-slate-200 rounded-lg w-[600px] h-[400px] p-9'
                    onSubmit={handleSubmit}>
                    <div className='font-mono text-3xl font-extrabold tracking-widest text-sky-800 flex justify-center items-center'>Enter Your Details !</div>
                    {/* Email Input */}
                    <input className='w-[400px] h-[40px] rounded-xl p-2 mt-6'
                        type='text'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                    {/*Username Input */}
                    <input className='w-[400px] h-[40px] rounded-xl p-2 mt-6'
                        type='text'
                        placeholder='Enter Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}/>
                    {/* Password Input */}
                    <input className='w-[400px] h-[40px] rounded-xl p-2 mt-6'
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                    {/* Button */}
                    <button className='text-xl font-semibold tracking-wide text-white w-[400px] h-[50px] rounded-2xl border bg-gradient-to-r from-cyan-600 to-blue-900 mt-10'
                        type='submit'>Sign Up</button>
                </form>
            </div>
        </div>
    )
}
export default SignUp