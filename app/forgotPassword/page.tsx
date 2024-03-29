'use client';
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CreateOTPAccountAsync } from "@/app/component/api/CreateOTPAccountAsync";

export default function FogotPassword() {
    const router = useRouter()
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    function isValidEmail(email: string) {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    const handleSubmit = async () => {
        setError('')
        if (!email) {
            setError('Email cannot be blank');
        } else {
            if (isValidEmail(email)) {
                const response = await CreateOTPAccountAsync(email);
                //typeof window !== 'undefined'
                const responseData = response.data;
                if (responseData !== undefined) {
                    if (responseData === "Send Temporary Passwrod In Mail") {
                        router.push(`/otp/${email}`);
                    } else {
                        setError('Cant Not Find Email User In Data');
                    }
                }
            } else {
                setError('Email format is incorrect.');
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
            <h2 className="text-2xl font-semibold text-white mb-6">Input Email To Get OTP</h2>

            <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2">Your Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" placeholder="john@example.com" required
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-700 text-white" />
            </div>
            <p className='text-red-500'>{error}</p>
            <button onClick={() => handleSubmit()}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
                Send OTP
            </button>
            <p className="mt-5 text-gray-300">If you remember your password, please go to the Login page <Link
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                href="/login">Login</Link></p>

        </div>
    );
}