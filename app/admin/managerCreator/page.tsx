'use client'
import { GetListAccountCreatorByRoleAdminAsync } from "@/app/component/api/GetListAccountCreatorByRoleAdminAsync";
import { AccountResponseDto } from "@/app/component/lib/Interface";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CreateAccountDto } from "@/app/component/lib/Interface";
import { CreateCreatorAccountByAdminAsync } from "@/app/component/api/CreateCreatorAccountByAdminAsync";
import { UpdateAccountDto } from "@/app/component/lib/Interface";
import { UpdateCreatorAccountByAdminAsync } from "@/app/component/api/UpdateCreatorAccountByAdminAsync";
import ResolvingViewport from 'next/dist/lib/metadata/types/metadata-interface.js';
import { ChangeStatusCreatorAccountByAdminAsync } from "@/app/component/api/ChangeStatusCreatorAccountByAdminAsync";
import { ChangeStatusRequestDto } from '../../component/lib/Interface';


export default function Page() {
    // Get All Member
    const [listMemberAccount, setListMemberAccount] = useState<AccountResponseDto[] | undefined>(undefined);
    const [error, setError] = useState<string>("");
    const router = useRouter();

    // Create New Member 
    const [showModal, setShowModal] = useState<boolean>(false);
    const [createFirstName, setCreateFirstName] = useState<string>("");
    const [createLastName, setCreateLastName] = useState<string>("");
    const [createEmail, setCreateEmail] = useState<string>("");
    const [createPhoneNumber, setCreatePhoneNumber] = useState<string>("");
    const [createPassword, setCreatePassword] = useState<string>("");

    // Update Member 
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [updateFirstName, setUpdateFirstName] = useState<string>("");
    const [updateLastName, setUpdateLastName] = useState<string>("");
    const [updatePhoneNumber, setUpdatePhoneNumber] = useState<string>("");
    const [memberAccountID, setMemberAccountID] = useState<string>("");

    // Search Creator
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filterCreatorAccount, setFilterCreatorAccount] = useState<AccountResponseDto[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const fetchListMemberAccount = async () => {
                const response = await GetListAccountCreatorByRoleAdminAsync(token);
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

    function isValidEmail(email: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidNumber(phoneNumber: string) {
        const numberRegex = /^[0-9]+$/;
        return numberRegex.test(phoneNumber);
    }

    function isValidLetter(name: string) {
        const letterRegex = /^[a-zA-Z]+$/;
        return letterRegex.test(name);
    }

    const handleCreateMemberAccount = () => {
        setShowModal(true);
    }

    const handleSave = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                if (!createFirstName || createFirstName.length < 1 || !createLastName || createLastName.length < 1 || createFirstName.length > 50 || createLastName.length > 50) {
                    alert("First Name and Last Name have to be between 1 -50 characters")
                    return;
                }
                if (!isValidLetter(createFirstName) || !isValidLetter(createLastName)) {
                    alert("First Name and Last Name only contain letter from a-z or A-Z")
                    return;
                }
                if (!createEmail || !isValidEmail(createEmail)) {
                    alert("Email can not be null or invalid format")
                    return;
                }
                if (!createPhoneNumber || createPhoneNumber.length < 10 || createPhoneNumber.length > 11) {
                    alert("Phone Number have to be between 10 - 11 number")
                    return;
                }
                if (!isValidNumber(createPhoneNumber)) {
                    alert("Phone Number have number between 0 - 9")
                    return;
                }
                if (!createPassword || createPassword.length < 8 || createPassword.length > 50) {
                    alert("Password have to be between 8 - 50 number")
                    return;
                }

                const createAcccountDto: CreateAccountDto = {
                    firstName: createFirstName,
                    lastName: createLastName,
                    email: createEmail,
                    phoneNumber: createPhoneNumber,
                    password: createPassword
                }

                const response = await CreateCreatorAccountByAdminAsync(createAcccountDto, token);
                if (response.status === "SUCCESS") {
                    if (response.data !== undefined) {
                        console.log("Created Member Account by Admin successfully");
                        setTimeout(() => {
                            window.location.reload()
                        }, 500);

                    } else {
                        setError("Data is undefined");
                    }
                } else {
                    setError(response.error ?? "Unknown error");
                }
                setShowModal(false);
                setCreateEmail("");
                setCreateLastName("");
                setCreateEmail("");
                setCreatePhoneNumber("");
                setCreatePassword("");
            } catch (error) {
                console.error("An error occurred:", error);
            }
        }
        else {
            alert("You are not logged in");
            router.push("/login");
        }
    }

    const handleUpdateCustomerAccount = (customerAccountId: string) => {
        setMemberAccountID(customerAccountId);
        setShowEditModal(true);
    }
    const handleUpdate = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                if (!updateFirstName || updateFirstName.length < 1 || !updateLastName || updateLastName.length < 1 || updateFirstName.length > 50 || updateLastName.length > 50) {
                    alert("First Name and Last Name have to be between 1 -50 characters")
                    return;
                }
                if (!isValidLetter(updateFirstName) || !isValidLetter(updateLastName)) {
                    alert("First Name and Last Name only contain letter from a-z or A-Z")
                    return;
                }
                if (!updatePhoneNumber || updatePhoneNumber.length < 10 || updatePhoneNumber.length > 11) {
                    alert("Phone Number have to be between 10 - 11 number")
                    return;
                }
                if (!isValidNumber(updatePhoneNumber)) {
                    alert("Phone Number have number between 0 - 9")
                    return;
                }

                const updateAccountDto: UpdateAccountDto = {
                    id: memberAccountID,
                    firstName: updateFirstName,
                    lastName: updateLastName,
                    phoneNumber: updatePhoneNumber,
                }

                const response = await UpdateCreatorAccountByAdminAsync(updateAccountDto, token);
                if (response.status === "SUCCESS") {
                    if (response.data !== undefined) {
                        console.log("Update Member Account by Admin successfully");
                        setTimeout(() => {
                            window.location.reload()
                        }, 500);

                    } else {
                        setError("Data is undefined");
                    }
                } else {
                    setError(response.error ?? "Unknown error");
                }
                setShowEditModal(false);
                setUpdateFirstName("");
                setUpdateLastName("");
                setUpdatePhoneNumber("");
            } catch (error) {
                console.error("An error occurred:", error);
            }
        }
        else {
            alert("You are not logged in");
            router.push("/login");
        }
    }

    const handleDeleteMemberAccount = async (memberAccountId: string, memberAccountStatus: string) => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const statusName = (memberAccountStatus === "ACTIVE") ? "DEACTIVE" : "ACTIVE";
                const changeStatusRequestDto: ChangeStatusRequestDto = {
                    id: memberAccountId,
                    statusName: statusName
                }
                const response = await ChangeStatusCreatorAccountByAdminAsync(changeStatusRequestDto, token);

                if (response.status === "SUCCESS") {
                    if (response.data !== undefined) {
                        console.log("Delete Member Account successfully");
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
            <p className="text-xl font-semibold">List Creator</p>
            {error ? (
                <div className="text-red-500">Error: {error}</div>
            ) : (
                <div className="flex flex-col">
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl mb-4 mx-auto"
                        onClick={handleCreateMemberAccount}
                    >
                        Create New Creator
                    </button>

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
                    {showModal && (
                        <div className="fixed inset-0 flex items-center justify-center z-10">
                            <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
                            <div className="bg-white p-8 rounded-lg z-20">
                                <h2 className="text-2xl font-bold mb-4">Create New Creator</h2>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                                        First Name
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="type"
                                        type="text"
                                        placeholder="Type"
                                        value={createFirstName}
                                        onChange={(e) => setCreateFirstName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                                        Last Name
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="type"
                                        type="text"
                                        placeholder="Type"
                                        value={createLastName}
                                        onChange={(e) => setCreateLastName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                                        Email
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="type"
                                        type="text"
                                        placeholder="Type"
                                        value={createEmail}
                                        onChange={(e) => setCreateEmail(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                                        Phone Number
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="type"
                                        type="text"
                                        placeholder="Type"
                                        value={createPhoneNumber}
                                        onChange={(e) => setCreatePhoneNumber(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                                        Password
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="type"
                                        type="text"
                                        placeholder="Type"
                                        value={createPassword}
                                        onChange={(e) => setCreatePassword(e.target.value)}
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                        onClick={handleSave}>
                                        Save
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => {
                                            setShowModal(false);
                                            setCreateFirstName("");
                                            setCreateLastName("");
                                            setCreateEmail("");
                                            setCreatePhoneNumber("");
                                            setCreatePassword("");
                                        }}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {showEditModal && (
                        <div className="fixed inset-0 flex items-center justify-center z-10">
                            <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
                            <div className="bg-white p-8 rounded-lg z-20">
                                <h2 className="text-2xl font-bold mb-4">Update Creator Account </h2>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                                        First Name
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="type"
                                        type="text"
                                        placeholder="Type"
                                        value={updateFirstName}
                                        onChange={(e) => setUpdateFirstName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                                        Last Name
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="type"
                                        type="text"
                                        placeholder="Type"
                                        value={updateLastName}
                                        onChange={(e) => setUpdateLastName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                                        Phone Number
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="type"
                                        type="text"
                                        placeholder="Type"
                                        value={updatePhoneNumber}
                                        onChange={(e) => setUpdatePhoneNumber(e.target.value)}
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                        onClick={handleUpdate}>
                                        Update
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => {
                                            setShowEditModal(false);
                                            setUpdateFirstName("");
                                            setUpdateLastName("");
                                            setUpdatePhoneNumber("");
                                        }}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

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
                                                onClick={() => handleUpdateCustomerAccount(memberAccount.id)}>
                                                Edit
                                            </button>
                                        </td>
                                        <td className="border border-gray-300 p-3">
                                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl"
                                                onClick={() => {
                                                    const confirmed = window.confirm("Are you sure you want to Change Status Creator Account?");
                                                    if (confirmed) {
                                                        handleDeleteMemberAccount(memberAccount.id, memberAccount.statusName);
                                                    }
                                                }}>
                                                {memberAccount.statusName === "ACTIVE" ? "DELETE" : "REVERSE"}
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