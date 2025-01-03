import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';

function SignupPage() {

  const { register, handleSubmit, formState: { errors } } = useForm();

  async function handleSignup(data) {
    try {
      const res = await axios.post('/api/user/signup', data)
      if (res) {
        console.log("response for sign up", res)
        toast.success(res?.data?.message,{
          theme: "colored",
        })
      }
    } catch (error) {
      console.log("error in getting signup", error)
      toast.error(error?.response?.data?.message, {
        theme: "colored",
      });
    }
  }

  return (
    <div className='h-[100vh] flex'>
      <div className="h-full w-1/2 flex justify-center items-center">
        <div className="flex flex-col gap-4 w-9/12">
          <h1 className='text-4xl font-mono font-bold'>Sign up now</h1>
          <p className='font-extralight'>Create a free account</p>

          <form onSubmit={handleSubmit(handleSignup)} className="flex flex-col gap-4">

            <div className="flex justify-between items-center gap-3">
              <div className="w-1/2">
                <label htmlFor="firstName" className="font-semibold">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="John"
                  className="w-full border border-slate-300 p-1 rounded-sm"
                  {...register("firstName", {
                    required: "First Name is required",
                    pattern: {
                      value: /^[a-zA-Z\s'-]+$/,
                      message: "First Name can only contain letters",
                    },
                  })}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                )}
              </div>
              <div className="w-1/2">
                <label htmlFor="lastName" className="font-semibold">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Doe"
                  className="w-full border border-slate-300 p-1 rounded-sm"
                  {...register("lastName", {
                    required: "Last Name is required",
                    pattern: {
                      value: /^[a-zA-Z\s'-]+$/,
                      message: "Last Name can only contain letters",
                    },
                  })}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center gap-3">
              <div className="w-1/2">
                <label htmlFor="email" className='font-semibold'>Email address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="example@example.com"
                  className="w-full border border-slate-300 p-1 rounded-sm"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
              <div className="w-1/2">
                <label htmlFor="gender" className="block font-semibold">
                  Select Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  className="w-full border border-gray-300 p-1 rounded-sm"
                  {...register("gender", {
                    required: "Gender is required",
                  })}
                >
                  <option value="" disabled>Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center gap-3">
              <div className="w-1/2">
                <label htmlFor="dateOfBirth" className="font-semibold">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  className="w-full border border-slate-300 p-1 rounded-sm"
                  {...register("dateOfBirth", {
                    required: "Date of Birth is required",
                    validate: value => {
                      const today = new Date();
                      const dob = new Date(value);
                      return dob < today || "Date of Birth must be in the past";
                    },
                  })}
                />
                {errors.dateOfBirth && (
                  <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth.message}</p>
                )}
              </div>
              <div className="w-1/2">
                <label htmlFor="password" className="font-semibold">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="........."
                  className="w-full border border-slate-300 p-1 rounded-sm"
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "Password must contain at least 8 characters, one uppercase, one lowercase, one digit, and one special character",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Remember me</label>
            </div>

            <button className='w-full bg-[#00FF7F] text-white p-2 rounded' type='submit'>
              Sign up
            </button>
          </form>

          <div className="w-full flex items-center gap-2 justify-center p-2 border-2">
            <FcGoogle />
            <p>Sign up with Google</p>
          </div>

          <p className=''>
            Already have an account?{" "}
            <Link to='/'>
              <span className='underline cursor-pointer text-[#00FF7F]'>Sign in</span>
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side Image */}
      <div className="h-full w-1/2">
        <img className='w-full h-full object-cover' src="https://media.istockphoto.com/id/1227400166/photo/data-protection-and-secure-online-payments-cyber-internet-security-technologies-and-data.jpg?s=612x612&w=0&k=20&c=dKxu6Z-92r9IA3lZRbNFWmH4VAsvGAJNIMM5TFfDRwI=" alt="Secure Data" />
      </div>
    </div>
  )
}

export default SignupPage
