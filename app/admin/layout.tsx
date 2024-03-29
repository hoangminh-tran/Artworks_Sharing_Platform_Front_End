'use client';
import { useEffect, useState } from "react";
import useCheckToken from "../component/helper/useCheckToken";
import LeftNavbarAdmin from "../ui/LeftNavbar/LeftNavbarAdmin";
import Navbar from "../ui/Navbar/Navbar";
import checkIsAdmin from "../component/helper/checkIsAdmin";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [isAdmin, setIsAdmin] = useState(false);
    useCheckToken();
    useEffect(() => {
        setIsAdmin(checkIsAdmin());
    }, []);

    if (!isAdmin) {
        return (
            <div className="flex items-center justify-center h-screen text-2xl text-red-500">
                You are not authorized
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className="flex flex-row">
                <div className="w-2/12">
                    <LeftNavbarAdmin />
                </div>
                <div className="bg-gray-100 w-10/12 flex items-center justify-center">
                    {children}                    
                </div>
            </div>
        </div>
    )
}