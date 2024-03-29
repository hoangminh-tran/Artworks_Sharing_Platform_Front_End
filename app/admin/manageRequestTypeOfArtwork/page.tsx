'use client';
import React, { useState, useEffect } from 'react';
import ModalComponent from './modal';
import { URL } from '@/app/component/api/Url';

interface Type {
    id: number;
    accountid: number;
    typeDescription: string;
    statusName: string;
    type: string;
}

export default function Page() {
    const [types, setTypes] = useState<Type[]>([]);
    const [selectedType, setSelectedType] = useState<Type | null>(null);
    const [filterStatus, setFilterStatus] = useState<string | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://${URL}/typeofartworkapi/GetListPendingTypeOfArtwork`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token') || ''
                    }
                });
            const data = await response.json();
            setTypes(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDetailClick = (type: Type) => {
        setSelectedType(type);
    };

    const handleCloseModal = () => {
        setSelectedType(null);
    };

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterStatus(event.target.value);
    };

    const filteredTypes = filterStatus ? types.filter(type => type.statusName === filterStatus) : types;

    return (
        <div className="container mx-auto p-4">
            <div className="mb-4" style={{ marginLeft: "50%" }}>
                <label htmlFor="statusFilter" className="mr-2">Filter by Status:</label>
                <select id="statusFilter" onChange={handleFilterChange} value={filterStatus || ''}>
                    <option value="PENDING">Pending</option>
                </select>
            </div>
            <table className="w-full border-collapse border border-gray-400">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-400 px-4 py-2">Type</th>
                        <th className="border border-gray-400 px-4 py-2">Account ID</th>
                        <th className="border border-gray-400 px-4 py-2">Type Description</th>
                        <th className="border border-gray-400 px-4 py-2">Status</th>
                        <th className="border border-gray-400 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTypes.map((type) => (
                        <tr key={type.id} className="hover:bg-gray-100">
                            <td className="border border-gray-400 px-4 py-2">{type.type}</td>
                            <td className="border border-gray-400 px-4 py-2">{type.accountid}</td>
                            <td className="border border-gray-400 px-4 py-2">{type.typeDescription}</td>
                            <td className={`border border-gray-400 px-4 py-2 ${type.statusName === "ACTIVE" ? "bg-green-500" : type.statusName === "DEACTIVE" ? "bg-red-500" : "bg-gray-500"}`}>{type.statusName}</td>
                            <td className="border border-gray-400 px-4 py-2">
                                <button className="text-blue-500 hover:text-blue-700" onClick={() => handleDetailClick(type)}>Detail</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ModalComponent selectedType={selectedType} onHide={handleCloseModal} />
        </div>
    );
}
