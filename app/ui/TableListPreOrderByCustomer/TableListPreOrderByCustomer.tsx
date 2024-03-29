'use client';
import { GetListPreOrderByCustomerAsync } from "@/app/component/api/GetListPreOrderByCustomerAsync";
import { PreOrderByCustomer } from "@/app/component/lib/Interface";
import { useEffect, useState } from "react";
import Image from "next/image";
import { DeleteArtworkInPreOrderByCustomer } from "@/app/component/api/DeleteArtworkInPreOrderByCustomer";
import { BuyArtworkByCustomer } from "@/app/component/api/BuyArtworkByCustomer";

export default function TableListPreOrderByCustomer() {
    const [listPreOrder, setListPreOrder] = useState<PreOrderByCustomer[]>([]);
    const [error, setError] = useState<string>("");
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', message: '', action: () => { } });
    const [isLoading, setIsLoading] = useState(true);

    const fetchListPreOrder = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            const response = await GetListPreOrderByCustomerAsync(token);
            if (response.status === "SUCCESS" && response.data) {
                setListPreOrder(response.data);
            } else {
                setError(response.error ?? "Unknown error");
                alert(error);
            }
        }
        setIsLoading(false);
    }

    const handleDelete = (preOrderId: string) => {
        setModalContent({
            title: 'Delete Item',
            message: 'Are you sure you want to delete this item?',
            action: async () => {
                const token = localStorage.getItem("token");
                if (token) {
                    const response = await DeleteArtworkInPreOrderByCustomer(preOrderId, token);
                    if (response.status === "SUCCESS") {
                        alert("Item deleted successfully");
                        fetchListPreOrder();
                    } else {
                        setError(response.error ?? "Unknown error");
                        alert(error);
                    }
                }
                setShowModal(false);
            }
        });
        setShowModal(true);
    }

    const handleBuy = (preOrderId: string) => {
        setModalContent({
            title: 'Buy Item',
            message: 'Are you sure you want to buy this item?',
            action: async () => {
                const token = localStorage.getItem("token");
                if (token) {
                    const response = await BuyArtworkByCustomer(preOrderId, token);
                    if (response.status === "SUCCESS") {
                        alert("Item bought successfully");
                        fetchListPreOrder();
                    } else {
                        setError(response.error ?? "Unknown error");
                        alert(error);
                    }
                }                
                setShowModal(false);
            }
        });
        setShowModal(true);
    }

    useEffect(() => {
        fetchListPreOrder();        
    }, []);

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }
    
    if (listPreOrder.length === 0) {
        return (
            <div>Bạn chưa có gì trong giỏ hàng</div>
        )
    }

    return (
        <div>
            {showModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg">
                        <h2 className="text-xl font-bold mb-4">{modalContent.title}</h2>
                        <p className="mb-4">{modalContent.message}</p>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={modalContent.action}>Confirm</button>
                        <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => setShowModal(false)}>Cancel</button>
                    </div>
                </div>
            )}
            <table className="table-auto w-full text-left whitespace-no-wrap">
                <thead>
                    <tr className="text-sm font-medium text-gray-700 bg-gray-100 rounded-md">
                        <th className="px-4 py-2">Image</th>
                        <th className="px-4 py-2">Artwork Name</th>
                        <th className="px-4 py-2">Description</th>
                        <th className="px-4 py-2">Creator Name</th>
                        <th className="px-4 py-2">Status Name</th>
                        <th className="px-4 py-2">Price</th>
                        <th className="px-4 py-2">Create Date Time</th>
                        <th className="px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listPreOrder.map((preOrder) => (
                        <tr key={preOrder.preOrderId} className="text-sm text-gray-600">
                            <td className="px-4 py-2"><Image src={`data:image/jpeg;base64,${preOrder.image}`} alt={preOrder.artworkName} width={100} height={100} /></td>
                            <td className="px-4 py-2">{preOrder.artworkName}</td>
                            <td className="px-4 py-2">{preOrder.description}</td>
                            <td className="px-4 py-2">{preOrder.creatorName}</td>
                            <td className="px-4 py-2">{preOrder.statusName}</td>
                            <td className="px-4 py-2">{preOrder.price}</td>
                            <td className="px-4 py-2">{preOrder.createDateTime}</td>
                            <td className="px-4 py-2">
                                <button className="bg-red-500 text-white px-4 py-2 rounded mr-2" onClick={() => handleDelete(preOrder.preOrderId)}>Delete</button>
                                {preOrder.isSold ? (
                                    <span className="text-red-500">Sold</span>
                                ) : (
                                    <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => handleBuy(preOrder.preOrderId)}>Buy</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}