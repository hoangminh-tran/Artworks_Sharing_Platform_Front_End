'use client';
import { GetListArtworkByCreatorId } from "@/app/component/lib/Interface";
import { useRouter } from "next/router"
import { useState, useEffect } from "react";
import Image from 'next/image';
import { GetListArtworkByCreatorIdForAllRoleAsync } from "@/app/component/api/GetListArtworkByCreatorIdForAllRoleAsync";
import Link from 'next/link';
export default function ListAllArtworkByCreator({params} : {params : {creatorId: string}})
{
    const [error, setError] = useState<string>("");
    const [listArtwork, setListArtwork] = useState<GetListArtworkByCreatorId[] | undefined>(undefined);



    useEffect(() => {
        const fetchListArtwork = async () => {
            const response = await GetListArtworkByCreatorIdForAllRoleAsync(params.creatorId);
            if (response.status === "SUCCESS") {
                setListArtwork(response.data);
            } else {
                setError(response.error ?? "Unknown error");
            }
        };
        fetchListArtwork();
    }, []);

    return (
        <div className="container mx-auto">
       
        <div className="grid grid-cols-6 gap-4 mx-auto py-8 px-10">
            {listArtwork?.map((artwork) => (
                <div key={artwork.artworkId} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <Link href={`/artwork/${artwork.artworkId}`} className="block relative h-64">
                        <Image src={`data:image/jpeg;base64,${artwork.image}`} alt={artwork.artworkId} layout="fill" objectFit="cover" />
                    </Link>
                </div>
            ))}
        </div>
    </div>
    )
}