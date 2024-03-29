'use client';
import { CreateBooking, TypeOfArtwork, User } from "@/app/component/lib/Interface";
import { useEffect, useRef, useState } from "react";
import SelectListTypeOfArtwork from "../SelectListTypeOfArtwork/SelectListTypeOfArtwork";
import { CreateBookingAsync } from "@/app/component/api/CreateBookingAsync";
import { GetInformationUserAsync } from "@/app/component/api/GetInformationUserAsync";

export default function BookingArtwork({ creatorId }: { creatorId: string }) {
    const [selectedListTypeOfArtwork, setSelectedListTypeOfArtwork] = useState<TypeOfArtwork[]>();
    const [artworkDescription, setArtworkDescription] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [errorSelectListTypeOfArtwork, setErrorSelectListTypeOfArtwork] = useState<string | undefined>();
    const [showBookingStatus, setShowBookingStatus] = useState(false);
    const priceInputRef = useRef<HTMLInputElement>(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [bookingStatus, setBookingStatus] = useState<string | null>(null);
    const [errorPrice, setErrorPrice] = useState<string | undefined>();
    const [errorArtworkDescription, setErrorArtworkDescription] = useState<string | undefined>();
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            return;
        }
        const fetchUser = async () => {
            const reponse = await GetInformationUserAsync(token);
            if (reponse.status === "SUCCESS") {
                setUser(reponse.data);
            } else {
                setUser(undefined);
            }
        };
        fetchUser();
    }, []);

    const handlePriceInput = (e: React.FormEvent<HTMLInputElement>) => {
        // Remove all non-digit characters and parse as integer
        const value = parseInt(e.currentTarget.value.replace(/\D/g, ''));
        // Handle NaN case if the input field is cleared
        const price = isNaN(value) ? 0 : value;

        if (user && price > user.balance) {
            setErrorPrice("The price cannot be greater than your balance");
        } else {
            setErrorPrice(undefined);
        }

        setPrice(price);
    };
    const formattedPrice = new Intl.NumberFormat('vi-VN').format(price);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let errorArtwork;
        let errorDescription;
        if (!selectedListTypeOfArtwork || selectedListTypeOfArtwork.length === 0) {
            errorArtwork = "Please select type of artwork";
            setErrorSelectListTypeOfArtwork(errorArtwork);
        }
        if (!artworkDescription) {
            errorDescription = "Please provide a description for the artwork";
            setErrorArtworkDescription(errorDescription);
        }
        if (!price || price <= 0) {
            let errorPrice = "Please provide a valid price for the artwork";
            setErrorPrice(errorPrice);
        }

        // If either errorCreator, errorArtwork or errorPrice is truthy, return early
        if (errorArtwork || errorPrice) return;

        if (!selectedListTypeOfArtwork) {
            return;
        }
        setShowConfirm(true);
    }

    const handleConfirm = async () => {
        if (!selectedListTypeOfArtwork) {
            setBookingStatus("Please select creator and type of artwork");
            return;
        }
        const token = localStorage.getItem("token");
        if (!token) {
            setBookingStatus("Please login to create booking");
            return;
        }
        const booking: CreateBooking = {
            creatorId: creatorId,
            contentBooking: artworkDescription,
            listTypeOfArtwork: selectedListTypeOfArtwork.map(type => type.id),
            price: price
        }
        const reponse = await CreateBookingAsync(booking, token);
        if (reponse.status === "SUCCESS") {
            setBookingStatus("Booking success");
        } else {
            setBookingStatus("Booking fail");
        }
        setShowBookingStatus(true);
    }

    const handleCancel = () => {
        // Reset isBookingConfirmed when the user cancels the booking        
        setShowConfirm(false);
    }

    const handleContinue = () => {
        // Only reset the form and hide the confirmation dialog if the booking was successful
        if (bookingStatus === "Booking success") {
            window.location.reload();
        }
        // Hide the confirmation dialog here
        setShowConfirm(false);
        setShowBookingStatus(false);
    }

    if (!creatorId) {
        return <p>Something went wrong. No creator ID provided.</p>;
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
            <p>Chọn những thể loại tranh bạn muốn</p>
            <SelectListTypeOfArtwork onSelectionChange={setSelectedListTypeOfArtwork} />
            {errorSelectListTypeOfArtwork && <div>{errorSelectListTypeOfArtwork}</div>}
            <p>Mô tả thêm</p>
            <textarea className="rounded-lg border p-2" value={artworkDescription} onChange={e => setArtworkDescription(e.target.value)} />
            {errorArtworkDescription && <div>{errorArtworkDescription}</div>}
            <p>Giá bạn muốn trả</p>
            <div className="flex items-center">
                <input
                    type="text"
                    className="rounded-lg border p-2"
                    value={formattedPrice}
                    onInput={handlePriceInput}
                    ref={priceInputRef}
                />
                <p className="ml-2">VNĐ</p>
            </div>
            {errorPrice && <div>{errorPrice}</div>}
            <button type="submit" className="border w-fit p-2 shadow-lg bg-green-500 rounded-md text-white ">Submit</button>
            {showConfirm && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-md space-y-4">
                        {showBookingStatus ? (
                            <>
                                <p className="text-lg font-semibold">Status Booking</p>
                                <p>{bookingStatus}</p>
                                <button
                                    onClick={handleContinue}
                                    className="px-4 py-2 rounded-md text-white bg-green-500 hover:bg-green-600"
                                >
                                    Continue
                                </button>
                            </>
                        ) : (
                            <>
                                <p className="text-lg font-semibold">Confirm Booking</p>
                                <p>Are you sure you want to create this booking?</p>
                                <div className="flex justify-end space-x-2">
                                    <button
                                        onClick={handleCancel}
                                        className="px-4 py-2 rounded-md text-white bg-red-500 hover:bg-red-600"
                                    >
                                        No
                                    </button>
                                    <button
                                        onClick={handleConfirm}
                                        className="px-4 py-2 rounded-md text-white bg-green-500 hover:bg-green-600"
                                    >
                                        Yes
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </form>
    )
}