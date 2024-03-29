'use client';
import { LoggedInAccount } from "@/app/component/lib/Interface";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GetLoggedAccountAsync } from "@/app/component/api/GetLoggedAccountAsync";

export default function LeftNavbarCreator() {
    const router = useRouter();
    const [user, setUser] = useState<LoggedInAccount>();
    const [isDropdownCustomerVisible, setDropdownCustomerVisible] = useState(false);

    const toggleDropdownCustomer = () => {
        setDropdownCustomerVisible(!isDropdownCustomerVisible);
    };

    useEffect(() => {
        const fetchUser = async () => {
            const tokenFromStorage = localStorage.getItem('token');
            if (tokenFromStorage) {
                const loggedInUser = await GetLoggedAccountAsync(tokenFromStorage);
                if (loggedInUser.status === "SUCCESS" && loggedInUser.data !== undefined) {
                    setUser(loggedInUser.data);
                } else {
                    router.push('/login');
                }
            } else {
                router.push('/login');
            }
        };

        fetchUser();
    }, []);

    return (
        <div className="h-screen shadow-lg w-2/12 fixed left-0 top-auto overflow-auto">
            <div className="p-6">
                <nav>
                    <ul>
                        <li>
                            <div className="flexrounded flex-col space-y-5">
                                <div>
                                    <p>Hi, {user?.firstName} {user?.lastName}</p>
                                </div>
                                <div className="bg-gray-300 shadow-md rounded-md p-2">
                                    <p>Thông tin tài khoản</p>
                                    <div>
                                        <p className="text-sm">Email: {user?.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm">Số dư: {user?.balance} vnđ</p>
                                    </div>
                                    {
                                        user?.phoneNumber === undefined && (
                                            <div>
                                                <p className="text-sm">Số điện thoại: {user?.phoneNumber}</p>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </li>
                        <li className="mb-2">
                            <button
                                onClick={toggleDropdownCustomer}
                                className='flex items-center hover:bg-green-300 p-2 rounded w-full'
                            >
                                <span>Quản lý khách hàng</span>
                            </button>
                            {isDropdownCustomerVisible && (
                                <ul className="ml-3">
                                    <li>
                                        <div>
                                            <Link href='/creator/profile' className='flex items-center hover:bg-green-300 p-2 rounded'>
                                                <span>Thông tin cá nhân</span>
                                            </Link>
                                        </div>
                                    </li>                                    
                                    <li>
                                        <div>
                                            <Link href='/creator/listArt' className='flex items-center hover:bg-green-300 p-2 rounded'>
                                                <span>Danh sách ảnh</span>
                                            </Link>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <Link href='/creator/bookingArtwork' className='flex items-center hover:bg-green-300 p-2 rounded'>
                                                <span>Danh sách đặt tranh</span>
                                            </Link>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <Link href='/creator/createPost' className='flex items-center hover:bg-green-300 p-2 rounded'>
                                                <span>Tạo bài viết</span>
                                            </Link>
                                        </div>
                                    </li>                              
                                    <li>
                                        <div>
                                            <Link href='/creator/wallet' className='flex items-center hover:bg-green-300 p-2 rounded'>
                                                <span>Ví</span>
                                            </Link>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <Link href='/creator/createTypeOfArtWork' className='flex items-center hover:bg-green-300 p-2 rounded'>
                                                <span>Gửi Yêu Cầu Tạo Loại Tranh</span>
                                            </Link>
                                        </div>
                                    </li>
                                </ul>
                            )}
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}
