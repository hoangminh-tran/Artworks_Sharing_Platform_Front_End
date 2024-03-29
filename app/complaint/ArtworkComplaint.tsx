'use client';
import { useEffect, useState } from "react";
// import "./ArtworkComplaint.css";
import { URL } from "@/app/component/api/Url";

export default function ArtworkComplaint() {
    const [complaintText, setComplaintText] = useState('');
    const [artworkId, setArtworkId] = useState('');

    const handleTextChange = (event: any) => {
        setComplaintText(event.target.value);
    }

    // useEffect(() => {
    //     var artworkID = localStorage.getItem('artworkId');
    //     if (artworkID) {
    //         setArtworkId(JSON.parse(artworkID));
    //     }
    // }, [])

    const handleSubmit = () => {
        const complaintData = {
            'ComplainType': 'ARTWORK',
            'ArtworkId': artworkId,
            'ComplaintDescription': complaintText,
        };

        fetch(`${URL}/complantapi/createArtworkComplainAsync`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify(complaintData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Handle the successful response from the server
                console.log('Success:', data);
            })
            .catch(error => {
                // Handle errors during the fetch
                console.error('Error:', error);
            });
    }

    return (
        <div className="bg-gray-100">
            <div className="container mx-auto p-4">
                {/* Complaint Text Input */}
                <div className="mb-4">
                    <label>Complaint Text:</label>
                    <textarea value={complaintText} onChange={handleTextChange} />
                </div>
                {/* Submit Button */}
                <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded">Submit Complaint</button>
            </div>
        </div>
    );
}
