import TableListPreOrderByCustomer from "@/app/ui/TableListPreOrderByCustomer/TableListPreOrderByCustomer";

export default function Page() {
    return (
        <div className="bg-white pt-5 mt-5 pl-5 pr-5 space-y-5 rounded-xl shadow-xl pb-5 mb-5">
            <h1 className="text-xl font-semibold">Giỏ hàng</h1>
            <TableListPreOrderByCustomer />
        </div>
    );
}