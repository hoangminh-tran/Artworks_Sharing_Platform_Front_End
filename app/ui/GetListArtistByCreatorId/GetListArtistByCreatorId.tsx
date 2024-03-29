'use client';
import { GetListArtworkByCreatorIdAsync } from "@/app/component/api/GetListArtworkByCreatorIdAsync";
import { Artwork } from "@/app/component/lib/Interface";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function GetListArtworkByCreatorId({ artistId }: { artistId: string }) {
    const [artwork, setArtwork] = useState<Artwork[]>();

    const fetchArtwork = async () => {
        const response = await GetListArtworkByCreatorIdAsync(artistId);
        if (response.status === "SUCCESS" && response.data != undefined) {
            setArtwork(response.data);
        } else {
            alert(response.error);
        }
    }

    useEffect(() => {
        fetchArtwork();
    }, []);

    return(
        <div className="grid grid-cols-4 gap-5 pt-5 self-center">            
            {artwork?.map((artwork, index) => {
                return (
                    <Link key={index} href={`/artwork/${artwork.artworkId}`} className="block relative">
                        <div className="h-64 w-64">
                            <Image src={`data:image/jpeg;base64,${artwork.image}`} alt="artwork" layout="fill" objectFit="cover"/>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}