import ManageBookingArtWork from "@/app/ui/ManageBookingArtWork/ManageBookingArtWork";


export default function Page() {
    return (
        <div className="bg-white pt-5 mt-5 pl-5 pr-5 space-y-5 rounded-xl shadow-xl pb-5 mb-5">
            <h1 className="text-xl font-semibold">List Booking Art</h1>
            <ManageBookingArtWork />
        </div>
    );
}
