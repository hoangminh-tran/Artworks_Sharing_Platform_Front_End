'use client';
import { useState } from "react";
import Navbar from "../ui/Navbar/Navbar";
import ArtworkComplaint from "./ArtworkComplaint";
import PostComplaint from "./PostComplaint";

export default function Complaint() {
    const [type, setType] = useState('');

    const renderContent = () => {
        if (type === 'POST') {
            return (
                <div className="bg-gray-100">
                    <Navbar />
                    <div className="">
                        <PostComplaint />
                    </div>
                </div>
            );
        } else if (type === 'ARTWORK') {
            return (
                <div className="bg-gray-100">
                    <Navbar />
                    <div className="">
                        <ArtworkComplaint />
                    </div>
                </div>
            );
        }
        // You can add an additional case or a default case if needed
    }

    return (
        <div>
            {renderContent()}
        </div>
    );
}
