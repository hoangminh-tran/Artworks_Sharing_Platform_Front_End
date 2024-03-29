'use client'
import { GetListCreatorWithActiveStatusAsync } from "@/app/component/api/GetListCreatorWithActiveStatusAsync";
import { AccountResponseDto } from "@/app/component/lib/Interface";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from 'next/image';

export default function CreatorPage() {
    // Get All Member
    const [listMemberAccount, setListMemberAccount] = useState<AccountResponseDto[] | undefined>(undefined);
    const [error, setError] = useState<string>("");
    const router = useRouter();

    // Search Creator
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filterCreatorAccount, setFilterCreatorAccount] = useState<AccountResponseDto[]>([])

    useEffect(() => {
        const fetchListMemberAccount = async () => {
            const response = await GetListCreatorWithActiveStatusAsync();
            if (response.status === "SUCCESS") {
                if (response.data !== undefined) {
                    setListMemberAccount(response.data);
                }
                else {
                    setError("Data is undefined");
                }
            }
            else {
                setError(response.error ?? "Unknown error");
            }
        }
        fetchListMemberAccount();
    }, []);

    useEffect(() => {
        if(listMemberAccount){
            const filterCreator = listMemberAccount.filter((creator : AccountResponseDto) => {
                const findByFirstName = creator.firstName.toLowerCase().includes(searchQuery.toLowerCase());
                const findByEmail = creator.email.toLowerCase().includes(searchQuery.toLowerCase());
                return findByEmail || findByFirstName;
            });
            setFilterCreatorAccount(filterCreator);
        }
    }, [searchQuery, listMemberAccount]);

    const ClearDataSearch = () => {
        setSearchQuery("");
    }
    const moveToViewAllArtworkPage = (memberAccountID:string) =>{
        window.location.href = `/creator/viewAllCreator/listAllArtworkByCreator/${memberAccountID}`
    }

    return (
        <div className="bg-white pt-5 mt-5 pl-5 pr-5 space-y-5 rounded-xl shadow-xl pb-5 mb-5">
            <p className="text-xl font-semibold">List Creator</p>
            {error ? (
                <div className="text-red-500">Error: {error}</div>
            ) : (
                <div className="flex flex-col">
                    <input
                        type="text"
                        placeholder="Search by email"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border border-gray-300 rounded px-4 py-2 mt-4 w-full"
                    />
                    {searchQuery &&(
                            <button className="top-0 right-0 mt-2 mr-3 text-gray-500" onClick={ClearDataSearch} style={{marginTop:"5px", marginBottom:"5px"}}>Clear</button>
                        )
                    }
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 p-3">First Name</th>
                                <th className="border border-gray-300 p-3">Last Name</th>
                                <th className="border border-gray-300 p-3">Email</th>
                                <th className="border border-gray-300 p-3">Phone Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filterCreatorAccount.map(memberAccount => (
                                    <tr key={memberAccount.id} className="border border-gray-300">
                                        <td className="border border-gray-300 p-3">{memberAccount.firstName}</td>
                                        <td className="border border-gray-300 p-3">{memberAccount.lastName}</td>
                                        <td className="border border-gray-300 p-3">{memberAccount.email}</td>
                                        <td className="border border-gray-300 p-3">{memberAccount.phoneNumber}</td>
                                        <td className="border border-gray-300 p-3">
                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                                onClick={() => moveToViewAllArtworkPage(memberAccount.id)}
                                            >
                                                View All Artwork
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}