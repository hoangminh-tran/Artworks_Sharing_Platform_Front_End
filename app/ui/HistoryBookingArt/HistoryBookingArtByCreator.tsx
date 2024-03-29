'use client';
import { GetListBookingByCreatorIdAsync } from "@/app/component/api/GetListBookingByCreatorIdAsync";
import { BookingByCreator } from "@/app/component/lib/Interface";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HistoryBookingArtByCreator(){
    const [listBookingArt, setListBookingArt] = useState<BookingByCreator[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const fetchListBookingArt = async () => {
                const response = await GetListBookingByCreatorIdAsync(token);
                if (response.status === "SUCCESS") {
                    if (response.data !== undefined) {
                        setListBookingArt(response.data);
                    } else {
                        setIsError(true);
                    }
                } else {
                    setIsError(true);
                }
                setIsLoading(false);
            }
            fetchListBookingArt();
        }
    }, []);

    return (
        <div className="container mx-auto px-4">
            {isError ? (
                <div className="text-red-500">Error: {isError}</div>
            ) : (
                <div className="flex flex-col">
                    {listBookingArt.map(booking => (
                        <Link key={booking.bookingId} className="rounded-lg p-4 mb-4 shadow-xl bg-white" href={`/creator/bookingArtwork/${booking.bookingId}`}>
                            <div className="font-bold">User Name: <span className="font-normal">{booking.userName}</span></div>
                            <div className="font-bold">Description: <span className="font-normal">{booking.description}</span></div>
                            <div className="font-bold">Booking Status: <span className="font-normal">{booking.statusName}</span></div>
                            <div className="font-bold">Booking Date: <span className="font-normal">{booking.createDateTime}</span></div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}