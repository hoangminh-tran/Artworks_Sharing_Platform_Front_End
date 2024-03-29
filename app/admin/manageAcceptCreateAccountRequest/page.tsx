'use client'
import { GetListCreatorRequestByRoleAdminAsync } from "@/app/component/api/GetListCreatorRequestByRoleAdminAsync";
import { AccountResponseDto } from "@/app/component/lib/Interface";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChangeStatusCreatorAccountByAdminAsync } from "@/app/component/api/ChangeStatusCreatorAccountByAdminAsync";
import { ChangeStatusRequestDto } from '../../component/lib/Interface';
import { DeleteCreatorRequestAccountByRoleAdminAsync } from "@/app/component/api/DeleteCreatorRequestAccountByRoleAdminAsync";


export default function Page() {
    // Get All Member
    const [listMemberAccount, setListMemberAccount] = useState<AccountResponseDto[] | undefined>(undefined);
    const [error, setError] = useState<string>("");
    const router = useRouter();

    // Search Creator
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filterCreatorAccount, setFilterCreatorAccount] = useState<AccountResponseDto[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const fetchListMemberAccount = async () => {
                const response = await GetListCreatorRequestByRoleAdminAsync(token);
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
        }
        else {
            alert("You are not login")
            router.push("/login");
        }
    }, []);

    const handleAcceptMemberAccount = async (memberAccountId: string) => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const statusName = "ACTIVE";
                const changeStatusRequestDto: ChangeStatusRequestDto = {
                    id: memberAccountId,
                    statusName: statusName
                }
                const response = await ChangeStatusCreatorAccountByAdminAsync(changeStatusRequestDto, token);

                if (response.status === "SUCCESS") {
                    if (response.data !== undefined) {
                        console.log("Accept Creator Account successfully");
                         setTimeout(() => {
                            window.location.reload()
                        }, 500);

                    } else {
                        setError("Data is undefined");
                    }
                } else {
                    setError(response.error ?? "Unknown error");
                }
            }
            catch (error) {
                console.error("An error occurred:", error);
            }
        }
        else {
            alert("You are not logged in");
            router.push("/login");
        }
    }

    const handleRejectMemberAccount = async (memberAccountId: string) => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const response = await DeleteCreatorRequestAccountByRoleAdminAsync(memberAccountId, token);

                if (response.status === "SUCCESS") {
                    if (response.data !== undefined) {
                        console.log("Reject Creator Account successfully");
                         setTimeout(() => {
                            window.location.reload()
                        }, 500);

                    } else {
                        setError("Data is undefined");
                    }
                } else {
                    setError(response.error ?? "Unknown error");
                }
            }
            catch (error) {
                console.error("An error occurred:", error);
            }
        }
        else {
            alert("You are not logged in");
            router.push("/login");
        }
    }

    useEffect(() => {
        if(listMemberAccount){
            const filterCreator = listMemberAccount.filter(creator => 
                creator.email.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilterCreatorAccount(filterCreator);
        }
    },[searchQuery, listMemberAccount])

    const ClearDataSearch = () => {
        setSearchQuery("");    
    }

    return (
        <div className="bg-white pt-5 mt-5 pl-5 pr-5 space-y-5 rounded-xl shadow-xl pb-5 mb-5">
            <p className="text-xl font-semibold">List Request Creator</p>
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
                                <th className="border border-gray-300 p-3">Status Name</th>
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
                                        <td className="border border-gray-300 p-3">{memberAccount.statusName}</td>
                                        <td className="border border-gray-300 p-3">
                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl mr-2"
                                                onClick={() => {
                                                    const confirmed = window.confirm("Are you sure you want to Accept Creator Account?");
                                                    if (confirmed) {
                                                        handleAcceptMemberAccount(memberAccount.id);
                                                    }
                                                }}>
                                                Accept
                                            </button>
                                        </td>
                                        <td className="border border-gray-300 p-3">
                                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl"
                                                onClick={() => {
                                                    const confirmed = window.confirm("Are you sure you want to Reject Creator Account?");
                                                    if (confirmed) {
                                                        handleRejectMemberAccount(memberAccount.id);
                                                    }
                                                }}>
                                                Reject
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