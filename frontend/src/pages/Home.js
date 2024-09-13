import React, { useEffect, useState } from 'react'
import { handleError } from '../utils'
import { ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import '../index.css'

function Home() {
  const [loggedUser,setLoggedUser]=useState('')
  const [products,setProducts]=useState()
  const navigate=useNavigate()
  useEffect(()=>{
    setLoggedUser(localStorage.getItem('loggedIn'))
  },[])

  const fetchData=async ()=>{
    const url="https://auth-mern-app-henna.vercel.app/products"
    const headers={
      headers:{
        'Authorization':localStorage.getItem('token')
      }
    }
    try{
     const response=await fetch(url,headers)
     
     const result=await response.json()
     const {message,error}=result
   
     if(error){
       handleError(message)
       localStorage.removeItem('loggedIn')
       localStorage.removeItem('token')
       navigate('/authentication_error')
     }
  
     setProducts(result)
    }catch(err){
       return handleError(err)
    }
  }
 const handleLogOut=()=>{
    localStorage.removeItem('loggedIn')
    localStorage.removeItem('token')
    navigate('/login')
 }

  useEffect(()=>{
      fetchData()
  },[])

  return (
    <div className='container'>
        <h1>{loggedUser}</h1>
        <div>
          <ul>
          {products&&products.map((item,ind)=>(<li key={ind}>
           {item.name}:{item.price}
          </li>))}
          </ul>
        </div>
        <button onClick={handleLogOut} className='logoutBtn'>LogOut</button>
        
        <ToastContainer/>
        <span className="author">Author: Deepak Kumar</span>
    </div>
  )
}

export default Home
