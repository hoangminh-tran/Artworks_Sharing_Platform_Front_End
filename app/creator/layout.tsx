'use client';
import useCheckToken from "../component/helper/useCheckToken";
import LeftNavbarCreator from "../ui/LeftNavbar/LeftNavbarCreator";
import Navbar from "../ui/Navbar/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [isTokenLoading, isRightRole] = useCheckToken();

    if (isTokenLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!isRightRole) {
        return (
            <div className="flex items-center justify-center h-screen text-2xl text-red-500">
                You are not authority to show this page.
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className="flex flex-row">
                <div className="w-2/12">
                    <LeftNavbarCreator />
                </div>
                <div className="bg-gray-100 w-10/12 flex items-center justify-center">
                    {children}                    
                </div>
            </div>
        </div>
    )
}