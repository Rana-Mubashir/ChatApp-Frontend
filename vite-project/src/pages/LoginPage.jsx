import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { Link } from 'react-router-dom';
import Modal from "react-modal";
import { AiOutlineClose } from 'react-icons/ai'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";

Modal.setAppElement("#root");

function LoginPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();
  const {
    register: registerForgot,
    handleSubmit: handleSubmitForgot,
    formState: { errors: errorsForgot },
    setValue: setValueForgot
  } = useForm();
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: errorsLogin },
    setValue: setValueLogin
  } = useForm();

  const [emailLoader, setEmailLoader] = useState(false)
  const navigate = useNavigate()

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setValue('email', '')
  };

  const openModal2 = () => {
    setIsOpen2(true);
  };

  const closeModal2 = () => {
    setIsOpen2(false);
    setValueForgot('email', '')
  };

  async function handleSignIn(data) {
    try {
      console.log("data in signup", data)
      const res = await axios.post('/api/user/signin', data)
      if (res) {
        console.log("response ", res)
        toast.success(res?.data?.message, {
          theme: "colored",
        })
        localStorage.setItem('userData', JSON.stringify(res?.data?.user))
        navigate('/home')
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        theme: "colored",
      });
      console.log("error in sign up", error)
    }
  }

  async function handleEmailVerification(data) {
    setEmailLoader(true)
    try {
      const res = await axios.get(`/api/user/verificationbyemail/${data.email}`)
      if (res) {
        console.log("response ", res)
        toast.success(res?.data?.message, {
          theme: "colored",
        })
        setEmailLoader(false)
        navigate(`/emailConfirm/${res?.data?.id}`)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        theme: "colored",
      });
      console.log("error in sending email verification", error)
      setEmailLoader(false)
    }
  }

  async function sendResetPasswordRequest(data) {
    try {
      const res = await axios.get(`/api/user/sendresetlink/${data.email}`)
      if (res) {
        toast.success(res?.data?.message, {
          theme: "colored",
        })
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        theme: "colored",
      });
      console.log("error in sending reset password link", error)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };


  return (
    <>
      <div className='h-[100vh] flex'>
        <div className="h-full w-full lg:w-1/2 flex justify-center items-center">
          <div className="flex flex-col gap-4 w-9/12">
            <h1 className='text-4xl font-mono font-bold'>Welcome back</h1>
            <p className='font-extralight'>Please enter your details</p>
            <div className="">
              <label htmlFor="" className='font-semibold'>Email address</label>
              <input
                type="text"
                name=""
                id=""
                placeholder="example@example.com"
                {...registerLogin("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
                className='w-full border border-slate-300 p-1 rounded-sm'
              />
              {errorsLogin.email && (
                <p className="text-red-500 text-sm mt-1">{errorsLogin.email.message}</p>
              )}
            </div>
            <div className="">
              <label htmlFor="" className='font-semibold'>Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name=""
                  id=""
                  className='w-full border border-slate-300 p-1 rounded-sm'
                  placeholder="••••••••••••••"
                  {...registerLogin("password", {
                    required: "Password is required",

                  })}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errorsLogin.password && (
                <p className="text-red-500 text-sm mt-1">{errorsLogin.password.message}</p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <input type="checkbox" name="" id="" />
                <p>Remember me</p>
              </div>
              <p className='underline text-[#00FF7F] cursor-pointer'
                onClick={openModal2}
              >Forgot password</p>
            </div>
            <button className='w-full bg-[#00FF7F] text-white p-2 rounded'
              onClick={handleSubmitLogin(handleSignIn)}
            >Sign in </button>
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
              <Link to='/signup' >
                <span className='underline cursor-pointer text-[#00FF7F] '>Sign up</span>
              </Link>
            </p>
          </div>
        </div>
        <div className="h-full w-1/2 hidden lg:block">
          <img className='w-full h-full' src="https://media.istockphoto.com/id/1227400166/photo/data-protection-and-secure-online-payments-cyber-internet-security-technologies-and-data.jpg?s=612x612&w=0&k=20&c=dKxu6Z-92r9IA3lZRbNFWmH4VAsvGAJNIMM5TFfDRwI=" alt="" />
        </div>
      </div>


      {/* confirm email modal */}
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
            disabled={emailLoader}
            className={`py-2 px-6 rounded-md transition duration-200 ${emailLoader
              ? " bg-[#00FF7F] text-white cursor-not-allowed"
              : "bg-[#00FF7F] text-white hover:bg-[#00CC66]"
              }`}
          >
            Confirm
          </button>
        </div>
      </Modal>

      {/* forgot password modal */}
      <Modal
        isOpen={isOpen2}
        onRequestClose={closeModal2}
        contentLabel="Forgot Password Modal"
        className="bg-white border-none p-6 rounded-lg shadow-lg max-w-lg w-full mx-auto mt-24 relative"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <button
          onClick={closeModal2}
          className="absolute top-4 right-4 text-xl text-gray-700 hover:text-gray-900"
        >
          <AiOutlineClose />
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Forgot Your Password?</h2>
        <p className="text-gray-600 mb-4">
          Enter your registered email address below. We will send you a password reset link.
        </p>

        <div className="mb-4">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            {...registerForgot("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            })}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00FF7F]"
            placeholder="Enter your email"
          />
          {errorsForgot.email && (
            <p className="text-red-500 text-sm mt-1">{errorsForgot.email.message}</p>
          )}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSubmitForgot(sendResetPasswordRequest)}
            disabled={emailLoader}
            className={`py-2 px-6 rounded-md transition duration-200 ${emailLoader
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-[#00FF7F] text-white hover:bg-[#00CC66]"
              }`}
          >
            {emailLoader ? "Sending..." : "Send Reset Link"}
          </button>
        </div>
      </Modal>

    </>
  );
}

export default LoginPage;
