import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
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
                console.log(res.data)
            })
    }
    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios
                .post('http://localhost:3000/login', { username, password })
            const token = response.data.token
            alert('Login successful')
            setUsername('')
            setPassword('')
            fetchUsers();
            navigate('/account')
            window.location.reload();
            localStorage.setItem('token', token)
        } catch (error) {
            console.log('Login Error', error)
        }
    }

    return (
        <div className='w-full h-screen flex'>
            <div className='w-[30%] h-[100%] bg-slate-200 flex justify-center items-center'>
                <div >
                    <div>
                        <h2 className='font-mono text-5xl font-extrabold tracking-widest text-sky-800 flex justify-center items-center'>Sign In</h2>
                    </div>
                    <div className='text-xl'>
                        <h1 className='mt-10'>Don’t have an account?</h1>
                        <Link className='justify-center items-center flex mt-5 text-blue-800 underline' to='/signup'>sign Up</Link>
                    </div>
                </div>
            </div>
            <div className='w-[70%] h-[100%] flex justify-center items-center'>
                <form className='text-center border bg-slate-200 rounded-lg w-[600px] h-[400px] p-9'
                    onSubmit={handleLogin}
                >
                    <div className='font-mono text-3xl font-extrabold tracking-widest text-sky-800 flex justify-center items-center'>Enter Your Credentials !</div>
                    {/*Username Input */}
                    <input className='w-[400px] h-[40px] rounded-xl p-2 mt-14'
                        type='text'
                        placeholder='Enter Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}/>

                    {/* Password Input */}
                    <input className='w-[400px] h-[40px] rounded-xl p-2 mt-5'
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>

                    {/* Button */}
                    <button className='text-xl font-semibold tracking-wide text-white w-[400px] h-[50px] rounded-2xl border bg-gradient-to-r from-cyan-600 to-blue-900 mt-10'
                        type='submit'>Sign In</button>
                </form>
            </div>
        </div>
    )
}
export default Login