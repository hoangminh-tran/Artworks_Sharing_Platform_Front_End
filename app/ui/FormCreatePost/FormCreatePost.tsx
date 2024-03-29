'use client';
import { useState } from "react";
import SeleteListArtworkByCreator from "../SeleteListArtworkByCreator/SeleteListArtworkByCreator";
import { CreatePostByCreator } from "@/app/component/lib/Interface";
import { CreatePostByCreatorAsync } from "@/app/component/api/CreatePostByCreatorAsync";

export default function FormCreatePost() {
    const [selectedArtworkIds, setSelectedArtworkIds] = useState<string[]>([]);
    const [description, setDescription] = useState<string>("");
    const [showModal, setShowModal] = useState(false);
    const [errorDescription, setErrorDescription] = useState<string>("");
    const [errorArtwork, setErrorArtwork] = useState<string>("");

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (description.trim() === "") {
            setErrorDescription("Description cannot be empty");
            return;
        }
        if (selectedArtworkIds.length === 0) {
            setErrorArtwork("At least one artwork must be selected");
            return;
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const confirmSubmit = async () => {
        const token = localStorage.getItem("token");
        if (token){
            const data : CreatePostByCreator = {
                contentPost: description,
                listArtwork: selectedArtworkIds
            };
            const response = await CreatePostByCreatorAsync(token, data);
            if (response.status === "SUCCESS") {
                alert("Post created successfully");
                window.location.href = "/creator";
            } else {
                alert("Error creating post");
            }
        }
        closeModal();
    };

    return (
        <div className="relative flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded shadow-md">           
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-bold mb-2">Description</label>
                    <textarea id="description" name="description" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={e => setDescription(e.target.value)} />
                    {errorDescription && <p className="text-red-500 text-xs italic">{errorDescription}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="artwork" className="block text-sm font-bold mb-2">Artwork</label>
                    <SeleteListArtworkByCreator onSelectionChange={setSelectedArtworkIds} />
                    {errorArtwork && <p className="text-red-500 text-xs italic">{errorArtwork}</p>}
                </div>
                <div>
                    <button type="submit" className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline">Create</button>
                </div>            
            </form>

            {showModal && (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 rounded shadow-lg">
                        <h2 className="mb-4">Confirm Submission</h2>
                        <button onClick={confirmSubmit} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">Confirm</button>
                        <button onClick={closeModal} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}