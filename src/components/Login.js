import React,{useState} from 'react'
import {useForm} from 'react-hook-form'
import {useNavigate,Link} from 'react-router-dom'
import axios from 'axios'
import "./Login.css"
function Login() {
  
  let [err,setErr]=useState("");
  let navigate=useNavigate();
  let {register,handleSubmit,formState:{errors}}=useForm();
   let submitForm= async (userObj)=>{
   axios.post("/login",userObj)
   .then(res=>{
    if(res.status===201){
    localStorage.setItem("token",res.data.jwtToken)
    navigate('/postlist')
    }
    else
    setErr(res.data.message)
   })
   .catch((err)=>setErr(err))
   }
 
  return (
    <div className='form col-11 col-sm-8 col-md-8 mx-auto  mt-5 p-2 login' >
      
      <div className="row ">
      {/* <div className="col-11 col-sm-8 col-md-8 mx-auto  mt-5 p-2">
      <div className="container  rounded w-2 bg-white">
        <div className="row"> */}
         
         <div className=" ">
     
   
 
      <form onSubmit={handleSubmit(submitForm)} className="mt-5 fo me-auto shadow p-5 rounded">
      <h1 className="mb-3 text-danger opacity-75 fw-bold fs-1 display-5 mb-5 ">LOGIN </h1>
      { (err.length!=0 )?  <p className='text-danger'>{err}</p> : <p></p>}
      <input type="text" className="form-control mb-3 p-3 inp" placeholder="Username" 
        {...register("username",{required:true,minLength:"4"})}/>

        {errors.username?.type==="required" && <p className="text-danger ">*Username is required</p>}
        {errors.username?.type==="minLength" && <p className="text-danger ">*minimum 4 characters are required</p>}
        {errors.username?.type==="maxLength" && <p className="text-danger ">*maximum 8 characters are required</p>}

        <input type="password" className="form-control mb-3 p-3 inp" placeholder="Password" 
        {...register("password",{required:true,minLength:"4"})}/>
        {errors.password?.type==="required" && <p className="text-danger ">*Password is required</p>}
        {errors.password?.type==="minLength" && <p className="text-danger ">*minimum 4 characters are required</p>}
        {errors.password?.type==="maxLength" && <p className="text-danger ">*maximum 8 characters are required</p>}
        
        <div className=''>
        <button type="submit" className="btn btn-danger mt-3 ">LOGIN</button>
        
        </div>
        </form>

         </div>
        </div>
        
      </div>  
    
  )
}

export default Login