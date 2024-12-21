import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { Link } from 'react-router-dom';

function SignupPage() {
  return (
    <div className=' h-[100vh] flex '>
      <div className="h-full w-1/2 flex justify-center items-center ">
        <div className="flex flex-col gap-3 w-9/12">
          <h1 className='text-4xl font-mono font-bold'>Sign up now</h1>
          <p className='font-extralight'>Create a free account</p>
          <div className="">
            <label htmlFor="" className='font-semibold'>First name</label>
            <input
              type="text"
              name=""
              id=""
              className='w-full border border-slate-300 p-1 rounded-sm'
            />
          </div>
          <div className="">
            <label htmlFor="" className='font-semibold'>Last name</label>
            <input
              type="text"
              name=""
              id=""
              className='w-full border border-slate-300 p-1 rounded-sm'
            />
          </div>
          <div className="">
            <label htmlFor="" className='font-semibold'>Email address</label>
            <input
              type="text"
              name=""
              id=""
              className='w-full border border-slate-300 p-1 rounded-sm'
            />
          </div>
          <div className="">
            <label htmlFor="" className='font-semibold'>Password</label>
            <input
              type="text"
              name=""
              id=""
              className='w-full border border-slate-300 p-1 rounded-sm'
            />
          </div>
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-1">
              <input type="checkbox" name="" id="" />
              <p>Remember me</p>
            </div>
          </div>
          <button className='w-full bg-[#00FF7F] text-white p-2 rounded'>Sign up </button>
          <div className="w-full flex items-center gap-2 justify-center p-2 border-2">
            <FcGoogle />
            <p>Sign up with Google</p>
          </div>
          <p className=''>Already have an account?
            <Link to='/'>
              <span className='underline cursor-pointer text-[#00FF7F] '>Sign in</span>
            </Link>
          </p>
        </div>
      </div>
      <div className="h-full w-1/2 ">
        <img className='w-full h-full' src="https://media.istockphoto.com/id/1227400166/photo/data-protection-and-secure-online-payments-cyber-internet-security-technologies-and-data.jpg?s=612x612&w=0&k=20&c=dKxu6Z-92r9IA3lZRbNFWmH4VAsvGAJNIMM5TFfDRwI=" alt="" />
      </div>
    </div>
  )
}

export default SignupPage
