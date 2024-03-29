'use client';
import { GetListBookingByAdminAsync } from "@/app/component/api/GetListBookingByAdminAsync";
import { BookingByAdmin } from "@/app/component/lib/Interface";
import { useEffect, useState } from "react";

export default function ManageBookingArtWork() {
    const [listBooking, setListBooking] = useState<BookingByAdmin[]>([]);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const fetchListBooking = async () => {
                const response = await GetListBookingByAdminAsync(token);
                if (response.status === "SUCCESS") {
                    if (response.data !== undefined) {
                        setListBooking(response.data);
                    } else {
                        setError("Data is undefined");
                    }
                } else {
                    setError(response.error ?? "Unknown error");
                }
            }
            fetchListBooking();
        }
    }, []);

    return (
        <div className="container mx-auto px-4">
            {error ? (
                <div className="text-red-500">Error: {error}</div>
            ) : (
                <div className="flex flex-col">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 p-3">Creator Name</th>
                                <th className="border border-gray-300 p-3">Customer Name</th>
                                <th className="border border-gray-300 p-3">Description</th>
                                <th className="border border-gray-300 p-3">Price</th>
                                <th className="border border-gray-300 p-3">Status Name</th>
                                <th className="border border-gray-300 p-3">Create Time</th>
                                {/* <th className="border border-gray-300 p-3">Role Name</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listBooking.map(booking => (
                                    <tr key={booking.bookingId} className="border border-gray-300">
                                        <td className="border border-gray-300 p-3">{booking.creatorName}</td>
                                        <td className="border border-gray-300 p-3">{booking.customerName}</td>
                                        <td className="border border-gray-300 p-3">{booking.description}</td>
                                        <td className="border border-gray-300 p-3">{booking.price}</td>
                                        <td className="border border-gray-300 p-3">{booking.statusName}</td>
                                        <td className="border border-gray-300 p-3">{booking.createDateTime}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}