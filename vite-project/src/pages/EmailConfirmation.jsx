import React, { useState } from 'react';
import Env from '../Env/Env';

const EmailConfirmation = () => {
  const [code, setCode] = useState(new Array(6).fill(''));

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const confirmationCode = code.join('');
    console.log('Submitted Code:', confirmationCode);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Email Confirmation</h1>
        <p className="text-sm text-gray-600 text-center mb-8">
          Enter the 6-character code we sent to your email.
        </p>
        <form onSubmit={handleSubmit}>
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
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Confirm
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Didn’t receive the code?{' '}
          <button
            type="button"
            className="text-blue-500 hover:underline"
            onClick={() => alert('Resend Code Clicked!')}
          >
            Resend Code
          </button>
        </p>
      </div>
    </div>
  );
};

export default EmailConfirmation;
