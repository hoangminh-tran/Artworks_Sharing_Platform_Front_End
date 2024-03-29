'use client';
import { BookingByCreator } from "@/app/component/lib/Interface";
import { useEffect, useState } from "react";
import Image from "next/image";
import { GetBookingByCreatorAsync } from "@/app/component/api/GetBookingByCreatorAsync";
import { UploadImageToBookingByCreatorAsync } from "@/app/component/api/UploadImageToBookingByCreatorAsync";
import { FormUploadImageToBookingByCreator } from "../FormUploadImageToBookingByCreator/FormUploadImageToBookingByCreator";
import { FormUploadImageToRequestArtworkByCreator } from "../FormUploadImageToRequestArtworkByCreator/FormUploadImageToRequestArtworkByCreator";
import ButtonChangeStatusBookingByCreator from "../ButtonChangeStatusBookingByCreator/ButtonChangeStatusBookingByCreator";
import ButtonChangeStatusRequestByCreator from "../ButtonChangeStatusRequestByCreator/ButtonChangeStatusRequestByCreator";

export default function HistoryBookingArtworkByCreatorDetail({ bookingId }: { bookingId: string }) {
    const [booking, setBooking] = useState<BookingByCreator>();
    const [error, setError] = useState<string>("");
    const [tokenl, setTokenl] = useState<string>("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const fetchListBooking = async () => {
                const response = await GetBookingByCreatorAsync(token, bookingId);
                if (response.status === "SUCCESS") {
                    if (response.data !== undefined) {
                        setBooking(response.data);
                    } else {
                        setError("Data is undefined");
                    }
                } else {
                    setError(response.error ?? "Unknown error");
                }
            }
            fetchListBooking();
            setTokenl(token);
        } else {
            alert("You are not login")
            window.location.href = "/login";
        }
    }, []);

    return (
        <div>
            {error ? (
                <div className="text-red-500">Error: {error}</div>
            ) : (
                booking && (
                    <div>
                        <p className="text-xl font-semibold pt-2">Nội dung đặt tranh</p>
                        <div className="pt-2 pb-5">
                            <div className="font-semibold">Tên user đặt tranh: <span className="font-normal">{booking.userName}</span></div>
                            <div className="font-semibold">Thể loại tranh đặt: <span className="font-normal">{booking.listTypeOfArtwork.map(artwork => artwork.type).join(', ')}</span></div>
                            <div className="font-semibold">Tình trạng đặt: <span className="font-normal">{booking.statusName}</span></div>
                            <div className="font-semibold">Mô tả đặt tranh: <span className="font-normal">{booking.description}</span></div>
                            <div className="font-semibold">Giá: <span className="font-normal">{booking.price}</span></div>
                            <div className="font-semibold">Thời gian đặt tranh: <span className="font-normal">{booking.createDateTime}</span></div>
                            <ButtonChangeStatusBookingByCreator bookingId={bookingId} token={tokenl} />
                            <div className="font-semibold">Tranh:
                                {booking.image ?
                                    (
                                        <Image src={`data:image/jpeg;base64,${booking.image}`} alt="" className="w-1/4 h-1/4" width={100} height={100} />
                                    ) : (
                                        <div>
                                            <FormUploadImageToBookingByCreator bookingId={bookingId} />
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        {booking.requestBooking.map(artwork => (
                            <div key={artwork.requestBookingId}>
                                <p className="text-xl font-semibold">Nội dung yêu cầu thêm</p>
                                <div className="mt-2">
                                    <div className="font-semibold">Thời gian tạo: <span className="font-normal">{artwork.createDateTime}</span></div>
                                    <div className="font-semibold">Mô tả thêm: <span className="font-normal">{artwork.description}</span></div>
                                    <div className="font-semibold">Tình trạng: <span className="font-normal">{artwork.statusName}</span></div>
                                    <ButtonChangeStatusRequestByCreator requestBookingId={artwork.requestBookingId} token={tokenl} />
                                    <div className="font-semibold">Tranh:
                                        {artwork.image ?
                                            (
                                                <Image src={`data:image/jpeg;base64,${artwork.image}`} alt="" className="w-1/4 h-1/4" width={100} height={100} />
                                            ) : (
                                                <div>
                                                    <FormUploadImageToRequestArtworkByCreator requestArtworkId={artwork.requestBookingId} />
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            )}
        </div>
    );
}