'use client';
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { ChangePasswordNotAuthentications } from '@/app/component/lib/Interface';
import { useRouter, usePathname } from "next/navigation";
import { ChangePasswordNotAuthen } from '@/app/component/api/ChangePasswordNotAuthen';

export default function FogotPassword() {
    const [Otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');
    const pathname = usePathname();
    const emailFromPath = pathname.split("/").pop();
    const email = typeof emailFromPath === 'string' ? emailFromPath : '';
    const router = useRouter()

    const handleSubmit = async () => {
        setError('')
        if (!Otp) {
            setError('OTP cannot be empty');
            return
        }
        if (!password) {
            setError('Password cannot be empty');
            return
        }
        if (!passwordConfirm) {
            setError('Password Confirm cannot be empty');
            return
        }
        if (password != passwordConfirm) {
            setError('Password and confirmation password are different');
            return
        } else {
            const dataChangePassword: ChangePasswordNotAuthentications = {
                email: email,
                otpCode: Otp,
                newPassword: password
            }
            const response = await ChangePasswordNotAuthen(dataChangePassword);
            if (response.status === "SUCCESS") {
                router.push(`/login`);
            } else {
                setError(response.error?.toString() || 'Change Password Fail');
            }
        }

    };
    return (
        <div className="max-w-md mx-auto p-8 bg-gray-700 rounded-md shadow-md form-container mt-10">
            <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
                alt=""
                className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
            />
            <h2 className="text-2xl font-semibold text-white mb-6">Change Password</h2>

            <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2">OPT </label>
                <input value={Otp} maxLength={4} onChange={(e) => setOtp(e.target.value)} placeholder="0000" required
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-700 text-white" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2">New Password </label>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="*****" required
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-700 text-white" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2">Confirm Password </label>
                <input type='password' value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} placeholder="*****" required
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-700 text-white" />
            </div>
            <p className='text-red-500'>{error}</p>
            <button onClick={() => handleSubmit()}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
                Change Password
            </button>
            <p className="mt-5 text-gray-300">If you remember your password, please go to the Login page <Link
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                href="/login">Login</Link></p>

        </div>
    );
}