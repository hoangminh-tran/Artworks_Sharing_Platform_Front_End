'use client';
import { GetArtistByCustomerAsync } from "@/app/component/api/GetArtistByCustomerAsync"
import { GetArtistByCustomer } from "@/app/component/lib/Interface";
import { useEffect, useState } from "react";
import BookingArtwork from "../BookingArtwork/BookingArtwork";

export default function GetArtist({ artistId }: { artistId: string }) {
    const [artist, setArtist] = useState<GetArtistByCustomer>();
    const [token, setToken] = useState<string>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const fetchArtist = async () => {
        const response = await GetArtistByCustomerAsync(artistId);
        if (response.status === "SUCCESS" && response.data != undefined) {
            setArtist(response.data);
        } else {
            alert(response.error);
        }
    }

    useEffect(() => {
        const tokenLocalStorge = localStorage.getItem('token');
        if (tokenLocalStorge) {
            setToken(tokenLocalStorge);
        }
        fetchArtist();

    }, []);

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-row space-x-2">
                <p className="text-gray-900 font-bold">First Name:</p>
                <p>{artist?.artistFirstName}</p>
            </div>
            <div className="flex flex-row space-x-2">
                <p className="text-gray-900 font-bold">Artist Last Name:</p>
                <p>{artist?.artistLastName}</p>
            </div>
            <div className="flex flex-row space-x-2">
                <p className="text-gray-900 font-bold">Artist Email:</p>
                <p>{artist?.artistEmail}</p>
            </div>

            {
                token &&
                <div className="flex flex-row space-x-2" style={{ marginTop: '10px' }}>
                    <button onClick={openModal} className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full" style={{ borderRadius: '20px' }}>
                        Tạo yêu cầu đặt tranh
                    </button>
                </div>
            }



            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={closeModal}>
                    <div className="bg-white rounded p-5 outline-none relative" onClick={(e) => e.stopPropagation()}>
                        <button onClick={closeModal} className="absolute top-0 right-0 m-2">Close</button>
                        <BookingArtwork creatorId={artistId} />
                    </div>
                </div>
            )}
        </div>
    )
}