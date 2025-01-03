import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { Link } from 'react-router-dom';
import Modal from "react-modal";
import { AiOutlineClose } from 'react-icons/ai'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement("#root");

function LoginPage() {
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate=useNavigate()

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  async function handleEmailVerification(data) {
    try {
      const res = await axios.get(`/api/user/verificationbyemail/${data.email}`)
      if (res) {
        console.log("response ",res)
        toast.success(res?.data?.message, {
          theme: "colored",
        })
        navigate(`/emailConfirm/${res?.data?.id}`)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        theme: "colored",
      });
      console.log("error in sending email verification", error)
    }
  }

  return (
    <>
      <div className='h-[100vh] flex'>
        <div className="h-full w-1/2 flex justify-center items-center">
          <div className="flex flex-col gap-4 w-9/12">
            <h1 className='text-4xl font-mono font-bold'>Welcome back</h1>
            <p className='font-extralight'>Please enter your details</p>
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
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <input type="checkbox" name="" id="" />
                <p>Remember me</p>
              </div>
              <p className='underline text-[#00FF7F] cursor-pointer'>Forgot password</p>
            </div>
            <button className='w-full bg-[#00FF7F] text-white p-2 rounded'>Sign in </button>
            <div className="w-full flex items-center gap-2 justify-center p-2 border-2">
              <FcGoogle />
              <p>Sign in with Google</p>
            </div>
            <p className=''>Verify your email?
              <span className='underline cursor-pointer text-[#00FF7F]'
                onClick={openModal}
              >
                Verify
              </span>
            </p>
            <p className=''>Don't have an account?
              <Link to='/signup'>
                <span className='underline cursor-pointer text-[#00FF7F] '>Sign up</span>
              </Link>
            </p>
          </div>
        </div>
        <div className="h-full w-1/2">
          <img className='w-full h-full' src="https://media.istockphoto.com/id/1227400166/photo/data-protection-and-secure-online-payments-cyber-internet-security-technologies-and-data.jpg?s=612x612&w=0&k=20&c=dKxu6Z-92r9IA3lZRbNFWmH4VAsvGAJNIMM5TFfDRwI=" alt="" />
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Verify Modal"
        className="bg-white  border-none p-6 rounded-lg shadow-lg max-w-lg w-full mx-auto mt-24 relative"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-xl text-gray-700 hover:text-gray-900"
        >
          <AiOutlineClose />
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Verify Your Email</h2>
        <p className="text-gray-600 mb-4">Please enter your email address below to verify.</p>

        <div className="mb-4">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            })}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00FF7F]"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSubmit(handleEmailVerification)}
            className="bg-[#00FF7F] text-white py-2 px-6 rounded-md hover:bg-[#00CC66] transition duration-200"
          >
            Confirm
          </button>
        </div>
      </Modal>
    </>
  );
}

export default LoginPage;
