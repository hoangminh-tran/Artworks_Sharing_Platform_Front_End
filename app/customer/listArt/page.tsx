import ListArtworkOwnByCustomer from "@/app/ui/ListArtworkOwnByCustomer/ListArtworkOwnByCustomer";

export default function Page() {
    return (
        <div className="bg-white pt-5 mt-5 pl-5 pr-5 space-y-5 rounded-xl shadow-xl pb-5 mb-5">
            <p className="text-xl font-semibold">Danh sách ảnh bạn sở hữu</p>
            <ListArtworkOwnByCustomer />
        </div>
    );
}