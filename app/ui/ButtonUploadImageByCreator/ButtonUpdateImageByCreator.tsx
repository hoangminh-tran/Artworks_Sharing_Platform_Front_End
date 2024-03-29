import { useState } from "react";
import { UploadArtworkByCreator, TypeOfArtwork, UploadImage } from "@/app/component/lib/Interface";
import SelectListTypeOfArtwork from "../SelectListTypeOfArtwork/SelectListTypeOfArtwork";
import Image from "next/image";
import { UploadArtworkByCreatorAsync } from "@/app/component/api/UploadArtworkByCreatorAsync";

export default function ButtonUpdateImageByCreator() {
    const [showPopup, setShowPopup] = useState(false);
    const [image, setImage] = useState<string | null>(null);
    const [isConfirming, setIsConfirming] = useState(false);
    const [artwork, setArtwork] = useState<UploadArtworkByCreator>({
        artworkName: "",
        artworkDescription: "",
        typeOfArtwork: [],
        isPublic: false,
        artworkPrice: 0,
    });
    const [errors, setErrors] = useState({
        artworkName: "",
        artworkDescription: "",
        typeOfArtwork: "",
        artworkPrice: "",
        image: ""
    });

    const handleButtonClick = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setArtwork({ ...artwork, [event.target.name]: event.target.value });
        setErrors({ ...errors, [event.target.name]: "" });
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setArtwork({ ...artwork, isPublic: event.target.checked });
    };

    const handleSelectionChange = (selected: TypeOfArtwork[]) => {
        setArtwork({ ...artwork, typeOfArtwork: selected.map((type) => type.id) });
        setErrors({ ...errors, typeOfArtwork: "" });
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!isConfirming) {
            setIsConfirming(true);
            return;
        }
        let newErrors = {
            artworkName: artwork.artworkName ? "" : "Artwork name is required.",
            artworkDescription: artwork.artworkDescription ? "" : "Artwork description is required.",
            typeOfArtwork: artwork.typeOfArtwork.length > 0 ? "" : "Type of artwork is required.",
            artworkPrice: artwork.artworkPrice > 0 ? "" : "Artwork can't not be minus and is required.",
            image: image ? "" : "Image is required."
        };
        setErrors(newErrors);

        if (Object.values(newErrors).every(x => x === "")) {
            let data = new FormData();
            if (image) {
                let binary = atob(image.split(',')[1]);
                let array = [];
                for (let i = 0; i < binary.length; i++) {
                    array.push(binary.charCodeAt(i));
                }
                let blob = new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
                data.append('Data', blob, "image.jpg");
            }
            data.append("artworkName", artwork.artworkName);
            data.append("artworkDescription", artwork.artworkDescription);
            data.append("isPublic", artwork.isPublic.toString());
            data.append("artworkPrice", artwork.artworkPrice.toString());
            artwork.typeOfArtwork.forEach((type) => {
                data.append("typeOfArtwork", type);
            });
            const token = localStorage.getItem("token");
            if (token) {
                const response = await UploadArtworkByCreatorAsync(data, token);
                if (response.status === "SUCCESS") {
                    setShowPopup(false);
                    setArtwork({
                        artworkName: "",
                        artworkDescription: "",
                        typeOfArtwork: [],
                        isPublic: false,
                        artworkPrice: 0,
                    });
                    setTimeout(() => {
                        window.location.reload()
                    }, 1000);
                    setImage(null);
                    alert("Artwork uploaded successfully");
                } else {
                    alert(response.error ?? "Unknown error");
                }
            } else {
                alert("You must be logged in to upload artwork");
                window.location.href = "/login";
            }
        }
        setIsConfirming(false);
    };


    return (
        <div>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl" onClick={handleButtonClick}>Upload Image</button>
            {showPopup && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-10">
                    <div className="bg-white p-4 rounded shadow-lg">
                        <h2 className="text-2xl mb-4">Upload Artwork</h2>
                        <form onSubmit={handleFormSubmit}>
                            {isConfirming ? (
                                <>
                                    <p>Are you sure you want to upload this artwork?</p>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" type="submit">Yes</button>
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={() => setIsConfirming(false)}>No</button>
                                </>
                            ) : (
                                <>
                                    <label className="block">
                                        <span className="text-gray-700">Name:</span>
                                        <input className="form-input mt-1 block w-full p-2 border" type="text" name="artworkName" value={artwork.artworkName} onChange={handleInputChange} required />
                                        {errors.artworkName && <p className="text-red-500">{errors.artworkName}</p>}
                                    </label>
                                    <label className="block mt-4">
                                        <span className="text-gray-700">Description:</span>
                                        <textarea className="form-textarea mt-1 block w-full p-2 border" name="artworkDescription" value={artwork.artworkDescription} onChange={handleInputChange} required />
                                        {errors.artworkDescription && <p className="text-red-500">{errors.artworkDescription}</p>}
                                    </label>
                                    <label className="block mt-4">
                                        <span className="text-gray-700">Type:</span>
                                        <SelectListTypeOfArtwork onSelectionChange={handleSelectionChange} />
                                        {errors.typeOfArtwork && <p className="text-red-500">{errors.typeOfArtwork}</p>}
                                    </label>
                                    <label className="block mt-4">
                                        <span className="text-gray-700">Price:</span>
                                        <input className="form-input mt-1 block w-full p-2 border" type="number" name="artworkPrice" value={artwork.artworkPrice} onChange={handleInputChange} required />
                                        {errors.artworkPrice && <p className="text-red-500">{errors.artworkPrice}</p>}
                                    </label>
                                    <label className="block mt-4">
                                        <span className="text-gray-700">Public:</span>
                                        <input className="form-checkbox mt-1 block p-2 border" type="checkbox" name="isPublic" checked={artwork.isPublic} onChange={handleCheckboxChange} />
                                    </label>
                                    <label className="block mt-4">
                                        <span className="text-gray-700">Image:</span>
                                        <input type="file" onChange={handleImageUpload} />
                                        {image && <Image src={image} alt="Uploaded artwork" width={75} height={75} />}
                                        {errors.image && <p className="text-red-500">{errors.image}</p>}
                                    </label>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" type="submit">Upload</button>
                                </>
                            )}
                        </form>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={handleClosePopup}>Close Popup</button>
                    </div>
                </div>
            )}
        </div>
    );
}