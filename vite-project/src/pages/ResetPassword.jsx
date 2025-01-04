import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


function ResetPassword() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate()

    const { userid } = useParams()

    const newPassword = watch("newPassword");

    async function handleResetPassword(values) {
        const data = {
            userId: userid,
            password: values.newPassword,
            confirmPassword: values.confirmPassword
        }
        try {
            const res = await axios.put('/api/user/resetpassword', data)
            if (res) {
                toast.success(res?.data?.message, {
                    theme: "colored",
                })
                console.log("res for reset password", res)
                setTimeout(() => {
                    navigate('/home')
                }, 2000);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message, {
                theme: "colored",
            });
            console.log("error in reset password", error)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-200">
            <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
                    Reset Your Password
                </h2>
                <p className="text-sm text-gray-600 text-center mb-6">
                    Enter your new password below to reset it.
                </p>
                <form onSubmit={handleSubmit(handleResetPassword)}>
                    {/* New Password Field */}
                    <div className="mb-4 relative">
                        <label
                            htmlFor="newPassword"
                            className="block text-sm font-medium text-gray-700"
                        >
                            New Password
                        </label>
                        <input
                            id="newPassword"
                            type={showNewPassword ? "text" : "password"}
                            placeholder="Enter new password"
                            {...register("newPassword", {
                                required: "New password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters long",
                                },
                                pattern: {
                                    value:
                                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                    message:
                                        "Password must include letters, numbers, and special characters",
                                },
                            })}
                            className={`mt-1 block w-full px-4 py-2 border ${errors.newPassword
                                ? "border-red-500 focus:border-red-500"
                                : "border-gray-300 focus:border-[#00CC66]"
                                } rounded-md shadow-sm focus:ring-[#00CC66] outline-none`}
                        />
                        <button
                            type="button"
                            className="absolute top-[68%] right-4 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        {errors.newPassword && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.newPassword.message}
                            </p>
                        )}
                    </div>

                    {/* Confirm Password Field */}
                    <div className="mb-4 relative">
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm new password"
                            {...register("confirmPassword", {
                                required: "Confirm password is required",
                                validate: (value) =>
                                    value === newPassword || "Passwords do not match",
                            })}
                            className={`mt-1 block w-full px-4 py-2 border ${errors.confirmPassword
                                ? "border-red-500 focus:border-red-500"
                                : "border-gray-300 focus:border-[#00CC66]"
                                } rounded-md shadow-sm focus:ring-[#00CC66] outline-none`}
                        />
                        <button
                            type="button"
                            className="absolute top-[68%] right-4 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#00CC66] hover:bg-[#009955] text-white py-2 px-4 rounded-md shadow-lg transition duration-300"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
