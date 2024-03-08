import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import "./Register.css"
function Register() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, SetErr] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  
    const onSubmit = (data) => {
        
          axios.post("/signup",data)
           .then((res)=>{
            if(res.status===201){
            navigate('/login');
            }
           else
             SetErr(res.data)
           })
           .catch(error=>{
            SetErr(error)
           })
       

     
    };
 
  

  return (
    <div className='register col-11 col-sm-8 col-md-8 mx-auto mt-5 p-2'>
      <div className="row">
        <div className="">
          <form onSubmit={handleSubmit(onSubmit)} className=" form ms-auto shadow p-5 rounded">
            <h1 className="mb-3 text-success opacity-75 fw-bold fs-1 display-5 mb-5 ">REGISTER</h1>
            {error && <p className='text-danger'>{error}</p>}
            {successMessage && <p className='text-success'>{successMessage}</p>}
            <input type="text" className="form-control mb-3 p-3 inp" placeholder="Username"
              {...register("username", { required: true, minLength: 4 })} />
            {errors.username && errors.username.type === "required" && <p className="text-danger">*Username is required</p>}
            {errors.username && errors.username.type === "minLength" && <p className="text-danger">*Minimum 4 characters are required</p>}
            <input type="password" className="form-control mb-3 p-3 inp" placeholder="Password"
              {...register("password", { required: true, minLength: 6 })} />
            {errors.password && errors.password.type === "required" && <p className="text-danger">*Password is required</p>}
            {errors.password && errors.password.type === "minLength" && <p className="text-danger">*Minimum 6 characters are required</p>}
            <input type="password" className="form-control mb-3 p-3 inp" placeholder="Confirm Password"
              {...register("password_confirmation", { required: true, minLength: 6 })} />
            {errors.password_confirmation && errors.password_confirmation.type === "required" && <p className="text-danger">*Confirm password is required</p>}
            {errors.password_confirmation && errors.password_confirmation.type === "minLength" && <p className="text-danger">*Minimum 6 characters are required</p>}
            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="termsCheck" {...register("terms", { required: true })} />
              <label className="form-check-label" htmlFor="termsCheck">I agree to the terms and conditions</label>
              {errors.terms && <p className="text-danger">*Please accept the terms and conditions</p>}
            </div>
           
            <button type="submit" className="btn btn-success mt-3 mb-5">Register</button>
            <div className=''>
        <p className='text-success'>  Please login if you already have an account</p>
        <Link className="reg"  to="/login">Login</Link>
        </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
