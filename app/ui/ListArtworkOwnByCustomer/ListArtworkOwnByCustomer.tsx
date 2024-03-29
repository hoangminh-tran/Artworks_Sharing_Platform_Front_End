'use client';
import { GetListArtworkOwnByCustomerAsync } from "@/app/component/api/GetListArtworkOwnByCustomerAsync";
import { ArtworkOwnByCustomer } from "@/app/component/lib/Interface";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ListArtworkOwnByCustomer() {
    const [listArtwork, setListArtwork] = useState<ArtworkOwnByCustomer[]>([]);
    const [error, setError] = useState<string>("");

    const fetchListArtwork = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            const response = await GetListArtworkOwnByCustomerAsync(token);
            if (response.status === "SUCCESS" && response.data) {
                setListArtwork(response.data);
            } else {
                setError(response.error ?? "Unknown error");
            }
        }
    }

    useEffect(() => {
        fetchListArtwork();
    }, []);

    if (listArtwork.length === 0) {
        return (
            <div className="flex justify-center items-center">
                <p className="text-gray-500">Bạn chưa sở hữu artwork nào</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {listArtwork.map((artwork) => (
                <Link key={artwork.artworkId} className="relative w-64 h-64" href={`/artwork/${artwork.artworkId}`}>
                    <Image src={`data:image/jpeg;base64,${artwork.image}`} alt={artwork.artworkName} className="absolute top-0 left-0 w-full h-full object-cover" width={256} height={256}/>
                </Link>
            ))}
        </div>
    );
}