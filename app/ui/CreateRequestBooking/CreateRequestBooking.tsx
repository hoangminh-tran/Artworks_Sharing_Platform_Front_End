import { CreateRequestBooking } from "@/app/component/lib/Interface";
import { useState } from "react";
import { CreateRequestBookingArtworkByBookingId } from "@/app/component/api/CreateRequestBookingArtworkByBookingId";

export default function CreateRequestBookingAsync({ bookingId }: { bookingId: string }) {
    const [description, setDescription] = useState<string>("");
    const [errorDescription, setErrorDescription] = useState<string | undefined>();
    const [showConfirm, setShowConfirm] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let errorDescription;
        if (!description) {
            errorDescription = "Please provide a description for the request";
            setErrorDescription(errorDescription);
        }
        if (errorDescription) return;
        setShowConfirm(true);
    }

    const handleConfirm = async () => {
        const formData: CreateRequestBooking = {
            bookingId: bookingId,
            contentRequest: description
        }
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Token not found');
            return;
        }
        const reponse = await CreateRequestBookingArtworkByBookingId(token, formData);
        if (reponse.status === "SUCCESS") {
            alert('Request success');
            window.location.reload();
        } else {
            alert('Request fail');
        }
        setShowConfirm(false);
    }

    return (
        <div>
            {showConfirm ? (
                <div className="text-center">
                    <h2 className="text-lg font-bold mb-4">Are you sure to create?</h2>
                    <button onClick={handleConfirm} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">Yes</button>
                    <button onClick={() => setShowConfirm(false)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">No</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <label className="font-semibold text-lg">Ghi mô tả</label>
                    <textarea onChange={(e) => setDescription(e.target.value)} className="rounded-lg bg-slate-200 border p-2"></textarea>
                    {errorDescription && <p className="text-red-500">{errorDescription}</p>}
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Gửi
                    </button>
                </form>
            )}
        </div>
    );
}