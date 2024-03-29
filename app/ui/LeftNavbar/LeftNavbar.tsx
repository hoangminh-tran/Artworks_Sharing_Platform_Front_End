'use client';
import { User } from "@/app/component/lib/Interface";
import Link from "next/link";
import { useState } from "react";

export default function LeftNavbar() {
    const [token, setToken] = useState<string>();
    const [user, setUser] = useState<User>();
    const [isDropdownCustomerVisible, setDropdownCustomerVisible] = useState(false);
    const [isDropdownArtistVisible, setDropdownArtistVisible] = useState(false);

    const toggleDropdownCustomer = () => {
        setDropdownCustomerVisible(!isDropdownCustomerVisible);
    };

    const toggleDropdownArtist = () => {
        setDropdownArtistVisible(!isDropdownArtistVisible);
    };
    // if (!user) {
    //     return <div>Loading...</div>;
    // }
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
                                    <div>
                                        <p className="text-sm">Số điện thoại: {user?.phoneNumber}</p>
                                    </div>
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
                                            <Link href='/customer/profile' className='flex items-center hover:bg-green-300 p-2 rounded'>
                                                <span>Thông tin cá nhân</span>
                                            </Link>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <Link href='/customer/cart' className='flex items-center hover:bg-green-300 p-2 rounded'>
                                                <span>Giỏ hàng</span>
                                            </Link>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <Link href='/customer/listArt' className='flex items-center hover:bg-green-300 p-2 rounded'>
                                                <span>Danh sách ảnh</span>
                                            </Link>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <Link href='/customer/historyBookingArt' className='flex items-center hover:bg-green-300 p-2 rounded'>
                                                <span>Danh sách đặt tranh</span>
                                            </Link>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <Link href='/customer/createBookingArt' className='flex items-center hover:bg-green-300 p-2 rounded'>
                                                <span>Tạo yêu cầu đặt tranh</span>
                                            </Link>
                                        </div>
                                    </li>                                    
                                    <li>
                                        <div>
                                            <Link href='/customer/topup' className='flex items-center hover:bg-green-300 p-2 rounded'>
                                                <span>Nạp tiền</span>
                                            </Link>
                                        </div>
                                    </li>
                                </ul>
                            )}

                        </li>
                        <li>
                            <div>
                                <button
                                    onClick={toggleDropdownArtist}
                                    className='flex items-center hover:bg-green-300 p-2 rounded w-full'
                                >
                                    <span>Quản lí họa sĩ</span>
                                </button>
                                {
                                    isDropdownArtistVisible && (
                                        <ul className="ml-3">
                                            <li>
                                                <div>
                                                    <Link href='/customer/listArtForArtist' className='flex items-center hover:bg-green-300 p-2 rounded'>
                                                        <span>Danh sách ảnh</span>
                                                    </Link>
                                                </div>
                                            </li>
                                            <li>
                                                <div>
                                                    <Link href='/customer/listBookingArt' className='flex items-center hover:bg-green-300 p-2 rounded'>
                                                        <span>Danh sách yêu cầu tranh</span>
                                                    </Link>
                                                </div>
                                            </li>                                            
                                        </ul>
                                    )
                                }
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}
