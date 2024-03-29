import HistoryBookingArtworkByCreatorDetail from "@/app/ui/HistoryBookingArt/HistoryBookingArtworkByCreatorDetail";

export default function Page({ params } : { params : { id : string }}) {
    return (
        <div>
            <h1>History Booking Art</h1>
            <HistoryBookingArtworkByCreatorDetail bookingId={params.id}/>
        </div>
    );
}