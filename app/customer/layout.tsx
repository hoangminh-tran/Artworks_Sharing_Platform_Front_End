'use client';
import useCheckToken from "../component/helper/useCheckToken";
import LeftNavbarCustomer from "../ui/LeftNavbar/LeftNavbarCustomer";
import Navbar from "../ui/Navbar/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    // const isLoading = useCheckToken();

    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }
    return (
        <div>
            <Navbar />
            <div className="flex flex-row">
                <div className="w-2/12">
                    <LeftNavbarCustomer />
                </div>
                <div className="bg-gray-100 w-10/12 flex items-center justify-center">
                    {children}
                </div>
            </div>
        </div>
    )
}