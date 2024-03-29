import HistoryBookingArtworkDetail from "@/app/ui/HistoryBookingArt/HistoryBookingArtworkDetail";

export default function Page({ params } : { params : { id : string }}) {    
    return (
        <div className="rounded-xl bg-white shadow-2xl mt-5 p-4 max-w-5xl min-w-96 w-full">
            <h1 className="text-center text-2xl font-semibold">History Booking Art</h1>            
            <HistoryBookingArtworkDetail bookingId={params.id} />
        </div>
    );
}