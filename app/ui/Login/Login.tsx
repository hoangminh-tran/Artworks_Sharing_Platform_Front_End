'use client';
import React, { useState, useRef } from 'react';
import { Login as LoginProps } from "@/app/component/lib/Interface";
import { z } from "zod";
import { LoginAsync } from '@/app/component/api/LoginAsync';
import { LoginAsyncReponse } from '@/app/component/lib/Interface';
import { GetRoleAsync } from '@/app/component/api/GetRoleAsync';

export default function Login() {
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginError, setLoginError] = useState('');
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const schema = z.object({
        email: z
            .string()
            .email()
            .min(1, "Email không được để trống"),
        password: z
            .string()
            .min(8, "Mật khẩu ít nhất có 8 ký tự")
            .min(1, "Mật khẩu không được để trống")
    });
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const result = schema.safeParse({ email, password });
        if (result.success) {
            const user: LoginProps = result.data;
            setEmailError('');
            setPasswordError('');
            const reponse: LoginAsyncReponse = await LoginAsync(user);
            if (reponse.status == "SUCCESS") {
                const token = reponse.data;
                localStorage.setItem('token', token);
                const roleResponse = await GetRoleAsync(token);
                if (roleResponse.status !== "SUCCESS") {
                    alert('Server error');
                }
                if (roleResponse.data === undefined) {
                    alert('Server error');
                    return;
                } else {
                    localStorage.setItem('role', roleResponse.data);
                }                
                switch (roleResponse.data) {
                    case "ADMIN":
                        window.location.href = '/admin';
                        break;
                    case "CREATOR":
                        window.location.href = '/creator';
                        break;
                    default:
                        window.location.href = '/';
                        break;
                }
            } else {
                setEmailError('');
                setPasswordError('');
                setLoginError(reponse.data);
            }
        } else {
            for (const error of result.error.errors) {
                if (error.path[0] === 'email') {
                    setEmailError(error.message);
                } else if (error.path[0] === 'password') {
                    setPasswordError(error.message);
                }
            }
        }
    };
    return (
        <form onSubmit={handleSubmit} className='flex flex-col space-y-3'>
            <input
                ref={emailRef}
                type="text"
                name="email"
                placeholder="Email"
                className='p-2 border-2 rounded-md hover:border-green-500 focus:border-green-500'
            />
            {emailError && <p className='text-red-500'>{emailError}</p>}

            <input
                ref={passwordRef}
                type="password"
                name="password"
                placeholder="Password"
                className='p-2 border-2 rounded-md hover:border-green-500 focus:border-green-500'
            />
            {passwordError && <p className='text-red-500'>{passwordError}</p>}
            {loginError && <p className='text-red-500'>{loginError}</p>}
            <button type="submit" className='p-2 bg-green-500 text-white text-lg rounded-md shadow-lg'>Login</button>
        </form>
    );
}