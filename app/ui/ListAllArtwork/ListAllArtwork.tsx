'use client';
import { useEffect, useState } from "react";
import { GetCreator, GetPublicArtworkResDto, TypeOfArtwork } from "@/app/component/lib/Interface"; import { GetPublicArtwork } from "@/app/component/api/GetPublicArtwork";
import Image from "next/image";
import Link from "next/link";
import SelectListTypeOfArtwork from "../SelectListTypeOfArtwork/SelectListTypeOfArtwork";
import SelectListCreator from "../SelectListCreator/SelectListCreator";
import { FilterArtworkByTypeAndCreatorAsync } from "@/app/component/api/FilterArtworkByTypeAndCreatorAsync";
import { GetListArtworkByNameAsync } from "@/app/component/api/GetListArtworkByNameAsync";

export default function ListAllArtwork() {
    const [error, setError] = useState<string>("");
    const [listArtwork, setListArtwork] = useState<GetPublicArtworkResDto[] | undefined>(undefined);
    const [filterTypeOfArtwork, setFilterTypeOfArtwork] = useState<TypeOfArtwork[]>();
    const [filterCreator, setFilterCreator] = useState<GetCreator>();
    const [activeTab, setActiveTab] = useState('type');
    const [artworkName, setArtworkName] = useState<string>("");

    useEffect(() => {
        const fetchListArtwork = async () => {
            const response = await FilterArtworkByTypeAndCreatorAsync();
            if (response.status === "SUCCESS") {
                setListArtwork(response.data);
            } else {
                setError(response.error ?? "Unknown error");
            }
        };
        fetchListArtwork();
    }, []);

    const handleSearch = async () => {
        if (activeTab === 'type') {
            const response = await FilterArtworkByTypeAndCreatorAsync(filterTypeOfArtwork?.map((type) => type.id), filterCreator?.creatorId);
            if (response.status === "SUCCESS") {
                setListArtwork(response.data);
            } else {
                setError(response.error ?? "Unknown error");
            }
        } else {
            const response = await GetListArtworkByNameAsync(artworkName);
            if (response.status === "SUCCESS") {
                setListArtwork(response.data);
            } else {
                setError(response.error ?? "Unknown error");
            }
        }
    }

    return (
        <div className="container mx-auto">
        <div className="flex flex-row justify-between">
            <button onClick={() => setActiveTab('type')} className={`px-4 py-2 ${activeTab === 'type' ? 'bg-purple-900 text-white' : 'bg-white text-purple-900'} rounded-xl`} style={{ borderRadius: '15px' }}>Search by Type and Artist</button>
            <button onClick={() => setActiveTab('name')} className={`px-4 py-2 ${activeTab === 'name' ? 'bg-purple-900 text-white' : 'bg-white text-purple-900'} rounded-xl`} style={{ borderRadius: '15px' }}>Search by Name</button>
        </div>

            {activeTab === 'type' ? (
                <div className="space-y-4">
                    <div>
                        <p>Chọn loại tranh bạn muốn</p>
                        <SelectListTypeOfArtwork onSelectionChange={setFilterTypeOfArtwork} />
                    </div>
                    <div>
                        <p>Chọn artist</p>
                        <SelectListCreator onSelectionChange={setFilterCreator} />
                    </div>
                    <div className="mt-4">
                        <button className="px-4 py-2 bg-red-400 text-white xl" onClick={handleSearch}>Search</button>
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    <p>Tìm kiếm tranh bằng tên</p>
                    <div className="flex flex-row justify-between">
                        <input type="text" placeholder="Nhập tên tranh" className="px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" onChange={(e) => setArtworkName(e.target.value)} />
                        <button className="px-4 py-2 bg-red-400 text-white rounded-xl" onClick={handleSearch}>Search</button>
                    </div>
                </div>
            )}


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-auto py-8 px-10">
                {listArtwork?.map((artwork) => (
                    <div key={artwork.artworkId} className="relative bg-white rounded-lg shadow-md overflow-hidden">
                        <Link href={`/artwork/${artwork.artworkId}`} className="block h-56 w-56">
                            <Image src={`data:image/jpeg;base64,${artwork.image}`} alt={artwork.artworkId} className="w-full h-full object-cover" width={100} height={100} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}