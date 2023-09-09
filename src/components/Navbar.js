import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
    const isUserSignedIn = !!localStorage.getItem('token')
    const navigate = useNavigate();
    const handleSignOut = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <nav className='flex text-xl font-semibold tracking-wide justify-around p-5 border-none border-zinc-800 items-center bg-gradient-to-r from-cyan-600 to-blue-900 text-zinc-300'>
            <Link to='/'><h1 className='font-mono text-4xl font-extrabold tracking-widest'>ABC Company</h1></Link>
            <ul className='flex gap-6'>
                {isUserSignedIn ? (
                    <>
                        <Link to='/account'><li>Account</li></Link>
                        <Link to='/create'><li>Create Post</li></Link>
                        <Link to='/posts'><li>Post</li></Link>
                        <li><button onClick={handleSignOut}>Sign Out</button></li>
                    </>
                ) : (
                    <>
                        <Link to='/login'><li>Login</li></Link>
                        <Link to='/signup'><li>Signup</li></Link>
                    </>
                )}
            </ul>
        </nav>
    )
}
export default Navbar