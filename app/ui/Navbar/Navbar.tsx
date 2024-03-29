'use client';
import Image from 'next/image'
import { useState, useEffect } from 'react';
import Logo from '@/public/next.svg'
import Link from 'next/link'
import NavbarCreator from './NavbarCreator';
import NavbarAdmin from './NavbarAdmin';
import NavbarCustomer from './NavbarCustomer';


export default function Navbar() {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem('token'));
    setRole(localStorage.getItem('role'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    if (typeof window !== 'undefined') {
      window.location.reload();
    }  
  };

  return (
    <nav className="flex items-center w-full justify-between h-20 shadow-lg pl-20 pr-20 bg-white">
      <div>
        <Link href="/">
          <Image src={Logo} alt="logo" width={80} height={75} />
        </Link>
      </div>

      <div className="flex flex-row space-x-5 pr-20 justify-items-center ">     
      {role === 'CREATOR' ? (
        <NavbarCreator />
      ) : role === 'ADMIN' ? (
        <NavbarAdmin /> 
      ) : role === 'MEMBER' ? (
        <NavbarCustomer />
      ) : null}                   
      </div>

      <div className='flex flex-row space-x-5'>
        {token ? (
          <button onClick={handleLogout} className="p-3">Đăng xuất</button>
        ) : (
          <Link href="/login" className="p-3 shadow-xl bg-green-500 text-white rounded-md">Đăng nhập</Link>
        )}        
      </div>
    </nav>
  )
}