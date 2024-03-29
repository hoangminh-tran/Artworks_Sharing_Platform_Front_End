'use client';
import { useEffect, useState } from "react";
import { PaymentResponse } from "@/app/component/lib/Interface";
import { URL } from "@/app/component/api/Url";

export default function TopUp() {
    const [token, setToken] = useState<string | null>();
    const [amount, setAmount] = useState<number>();
    const [paymentResponse, setPaymentResponse] = useState<PaymentResponse>();

    useEffect(() => {
        const tokenFromStorage = localStorage.getItem('token');
        if (!tokenFromStorage) {
            window.location.href = '/login';
        }
        setToken(tokenFromStorage);
    }, []);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        TopUp();
    }

    async function TopUp() {
        const myHeaders = {
            'Authorization': `Bearer ${token}`
        };

        try {
            const response = await fetch(`https://${URL}/payment?amount=${amount}`, {
                method: 'POST',
                headers: myHeaders
            });

            if (response.ok) {
                const data = await response.json();
                setPaymentResponse(data);
                // redirect to payment gateway
                window.location.href = data.order_url;
            }
        } catch (error) {
            alert('Nạp tiền thất bại');
        }
    }

    return (
        <div className="bg-white pt-5 mt-5 pl-5 pr-5 space-y-5 rounded-xl shadow-xl pb-5 mb-5">
            <h1 className="text-2xl font-bold mb-5">Nạp tiền</h1>

            <form className="w-full max-w-sm" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
                        Nhập số tiền bạn muốn nạp:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="amount"
                        type="number"
                        onChange={(e) => setAmount(Number(e.target.value))}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline" type="submit">
                        Nạp tiền
                    </button>
                </div>
            </form>
        </div>
    )
}