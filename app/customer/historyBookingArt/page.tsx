import HistoryBookingArt from "@/app/ui/HistoryBookingArt/HistoryBookingArt";

export default function Page() {
    return (
        <div className="bg-white pt-5 mt-5 pl-5 pr-5 space-y-5 rounded-xl shadow-xl pb-5 mb-5">
            <div>
                <h1 className="text-xl font-semibold">Danh Sách đặt tranh</h1>
                <HistoryBookingArt />
            </div>
        </div>
    );
}