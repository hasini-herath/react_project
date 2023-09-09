import { Routes, Route } from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Account from './pages/Account'
import CreatePost from './pages/CreatePost'
import Posts from './pages/Posts'

function App() {
  const isUserSignedIn = !!localStorage.getItem('token')

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        {isUserSignedIn && <Route path='/account' element={<Account />} />}
        {isUserSignedIn && <Route path='/create' element={<CreatePost />} />}
        {isUserSignedIn && <Route path='/posts' element={<Posts />} />}
      </Routes>
    </div>
  );
}
export default App;