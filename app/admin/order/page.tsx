'use client'
import { GetListOrderAsync } from "@/app/component/api/GetListOrderAsync";
import { AccountResponseDto, OrderListDto } from "@/app/component/lib/Interface";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    // Get All Member
    const [error, setError] = useState<string>("");
    const [detail, setDetail] = useState<boolean>(false);
    const [detailShow, setDetailShow] = useState<OrderListDto>();
    const router = useRouter();

    const [order, setOrder] = useState<OrderListDto[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const fetchListMemberAccount = async () => {
                const response = await GetListOrderAsync(token);
                console.log(response);

                if (response.status === "SUCCESS") {
                    if (response.data !== undefined) {
                        setOrder(response?.data);
                    }
                    else {
                        setError("Data is undefined");
                    }
                }
                else {
                    setError(response.error ?? "Unknown error");
                }
            }
            fetchListMemberAccount();
        }
        else {
            alert("You are not login")
            router.push("/login");
        }
    }, []);


    // useEffect(() => {
    //     if (listMemberAccount) {
    //         const filterCreator = listMemberAccount.filter(creator =>
    //             creator.email.toLowerCase().includes(searchQuery.toLowerCase())
    //         );
    //         setFilterCreatorAccount(filterCreator);
    //     }
    // }, [searchQuery, listMemberAccount])


    return (
        <div className="bg-white pt-5 mt-5 pl-5 pr-5 space-y-5 rounded-xl shadow-xl pb-5 mb-5">
            <p className="text-xl font-semibold">List Order</p>
            {error ? (
                <div className="text-red-500">Error: {error}</div>
            ) : (
                <div className="flex flex-col">

                    {/* {searchQuery && (
                        <button className="top-0 right-0 mt-2 mr-3 text-gray-500" onClick={ClearDataSearch} style={{ marginTop: "5px", marginBottom: "5px" }}>Clear</button>
                    )
                    } */}

                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 p-3">ID</th>
                                <th className="border border-gray-300 p-3">Name User </th>
                                <th className="border border-gray-300 p-3">Email</th>
                                <th className="border border-gray-300 p-3">Payment</th>
                                {/* <th className="border border-gray-300 p-3">Name Artwork</th> */}
                                {/* <th className="border border-gray-300 p-3">Date</th> */}
                                <th className="border border-gray-300 p-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                order.map(GetListOrderAsync => (
                                    <tr key={GetListOrderAsync.accountId} className="border border-gray-300">
                                        <td className="border border-gray-300 p-3">{GetListOrderAsync.orderId}</td>
                                        <td className="border border-gray-300 p-3">{GetListOrderAsync.userName}</td>
                                        <td className="border border-gray-300 p-3">{GetListOrderAsync.userEmail}</td>
                                        <td className="border border-gray-300 p-3">{GetListOrderAsync.payment}</td>
                                        {/* <td className="border border-gray-300 p-3">{GetListOrderAsync.accountId}</td> */}
                                        {/* <td className="border border-gray-300 p-3">{GetListOrderAsync.accountId}</td> */}
                                        <td className="border border-gray-300 p-3">PAID</td>
                                        <td className="border border-gray-300 p-3">
                                            <button onClick={() => {
                                                setDetail(true);
                                                setDetailShow(GetListOrderAsync)
                                            }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                            >
                                                Details
                                            </button>
                                        </td>

                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            )}

            {detail && (
                <div className="fixed inset-0 flex items-center justify-center z-10 8">
                    <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
                    <div className="bg-white p-16 rounded-lg z-20">
                        <h2 className="text-2xl font-bold mb-4">Order detail </h2>
                        <div className="mb-4 ">
                            <p className="text-slate-900 font-semibold ">Name: {detailShow?.userName}</p>
                            <p className="text-slate-900 font-semibold ">Email: {detailShow?.userEmail}</p>
                            <p className="text-slate-900 font-semibold ">Artworks: </p>
                            <div className="overflow-y-scroll h-96">
                                <p>=================================</p>
                                {detailShow?.artworks.map(artworks => (
                                    <>
                                        <img src={`data:image/jpeg;base64,${artworks.image}`} alt="artwork" className="w-21 h-20" />
                                        <p>ArtworkName: {artworks.artworkName}</p>
                                        <p>StatusName: {artworks.statusName}</p>
                                        <p>Price: {artworks.price}</p>
                                        <p>Description: {artworks.description}</p>
                                        <p>=================================</p>

                                    </>
                                ))}

                            </div>
                            <button onClick={() => setDetail(false)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"> Close</button>
                        </div>
                    </div>
                </div>
            )

            }
        </div>
    );
}