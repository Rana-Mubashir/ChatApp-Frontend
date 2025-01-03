import React, { useState } from 'react';
import Env from '../Env/Env';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

const EmailConfirmation = () => {
  const [code, setCode] = useState(new Array(6).fill(''));
  const { userId } = useParams()
  const navigate = useNavigate()

  const handleChange = (value, index) => {
    if (/^[A-Za-z0-9]*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 5) {
        document.getElementById(`code-input-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      document.getElementById(`code-input-${index - 1}`).focus();
    }
  };

  async function confirmVerificationCode() {
    const codeString = code.join('');
    const codeNumber = parseInt(codeString, 10);
    try {
      const data = {
        userId: userId,
        code: codeNumber
      }
      const res = await axios.put("/api/user/verifyemail", data)
      if (res) {
        console.log("response for email verification", res)
        toast.success(res?.data?.message, {
          theme: "colored",
        })
        navigate('/home')
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        theme: "colored",
      });
      console.log("error in confirming email", error)
    }
  }

  async function handleResendCode() {
    try {
      const res = await axios.get(`/api/user/sendemailverification/${userId}`)
      if (res) {
        toast.success(res?.data?.message, {
          theme: "colored",
        })
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        theme: "colored",
      });
      console.log("error in resending code", error)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Email Confirmation</h1>
        <p className="text-sm text-gray-600 text-center mb-8">
          Enter the 6-character code we sent to your email.
        </p>
        <div className="flex justify-center gap-2 mb-6">
          {code.map((char, index) => (
            <input
              key={index}
              id={`code-input-${index}`}
              type="text"
              maxLength="1"
              value={char}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center text-lg font-semibold text-gray-800 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          ))}
        </div>
        <button
          onClick={() => confirmVerificationCode()}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Confirm
        </button>
        <p className="text-center text-sm text-gray-500 mt-4">
          Didn’t receive the code?{' '}
          <button
            type="button"
            className="text-blue-500 hover:underline"
            onClick={() => handleResendCode()}
          >
            Resend Code
          </button>
        </p>
      </div>
    </div>
  );
};

export default EmailConfirmation;
