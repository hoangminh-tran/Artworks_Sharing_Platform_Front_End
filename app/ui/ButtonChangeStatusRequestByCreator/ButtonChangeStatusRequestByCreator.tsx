import { useState } from 'react';
import { ChangeStatusRequestByCreator } from "@/app/component/lib/Interface";
import { ChangeStatusRequestByCreatorAsync } from '@/app/component/api/ChangeStatusRequestByCreatorAsync';

interface ButtonChangeStatusRequestByCreatorProps {
    requestBookingId: string;
    token: string;
}
export default function ButtonChangeStatusRequestByCreator({ requestBookingId, token }: ButtonChangeStatusRequestByCreatorProps) {    
    const [showModal, setShowModal] = useState(false);
    const [action, setAction] = useState('');

    const handleAccept = () => {
        setAction('accept');
        setShowModal(true);
    };

    const handleReject = () => {
        setAction('reject');
        setShowModal(true);
    };

    const handleConfirm = async () => {
        if (action === 'accept') {
            const data : ChangeStatusRequestByCreator = {
                requestBookingId : requestBookingId,
                isAccept : true                
            };
            const response = await ChangeStatusRequestByCreatorAsync(data, token);
            if (response.status === "SUCCESS") {
                alert("Accept success");
                window.location.reload();
            } else {
                alert("Accept fail");
            }
        } else if (action === 'reject') {
            const data : ChangeStatusRequestByCreator = {
                requestBookingId : requestBookingId,
                isAccept : false
            };
            const response = await ChangeStatusRequestByCreatorAsync(data, token);
            if (response.status === "SUCCESS") {
                alert("Reject success");
                window.location.reload();
            } else {
                alert("Reject fail");
            }
        }
        setShowModal(false);
    };

    return (
        <div>
            <button onClick={handleAccept} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Accept
            </button>
            <button onClick={handleReject} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4">
                Reject
            </button>

            {showModal && (
                <div className="fixed w-full h-full top-0 left-0 flex items-center justify-center z-50">
                    <div className="modal bg-white p-4 rounded shadow-lg relative z-50">
                        <p className="mb-4">Are you sure you want to {action}?</p>
                        <button onClick={handleConfirm} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                            Yes
                        </button>
                        <button onClick={() => setShowModal(false)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                            No
                        </button>
                    </div>
                    <div className="absolute w-full h-full bg-gray-900 opacity-50"></div>
                </div>
            )}
        </div>
    );
}