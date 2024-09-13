
import { Navigate, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Login from './pages/Login';
import Singup from './pages/Singup';
import Home from './pages/Home';
import Error from './pages/Error'
import RefreshHandler from './RefreshHandler'


function App() {

  const [isAuthenticated,setIsAuthenticated]=useState(false)
  const PrivateRoute=({element})=>{
    

    return isAuthenticated ? element : <Navigate to='/login'/>
  }
  return (
    <div className='App'>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
    <Routes>
      <Route path='/' element={<Navigate to='/login'/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/home' element={<PrivateRoute element={<Home/>}/>}/>
      <Route path='/signup' element={<Singup/>}/>
      <Route path='/authentication_error' element={<Error/>}/>
    </Routes>
    </div>
  );
}

export default App;
