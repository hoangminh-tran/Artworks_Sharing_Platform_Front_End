import { useState } from "react";
import Image from "next/image";
import { UploadImageToRequestArtworkByCreatorAsync } from "@/app/component/api/UploadImageToRequestArtworkByCreatorAsync";

interface ImageUploadFormProps {
    requestArtworkId: string;
}

export const FormUploadImageToRequestArtworkByCreator : React.FC<ImageUploadFormProps> = ({ requestArtworkId }) => {
    const [image, setImage] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const [errorNameImage, setErrorNameImage] = useState<string>();
    const [errorDescriptionImage, setErrorDescriptionImage] = useState<string>();
    const [errorImage, setErrorImage] = useState<string>();

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    };

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let isValid = true;
        if (!name) {
            setErrorNameImage("Name is required.");
            isValid = false;
        }
        if (!description) {
            setErrorDescriptionImage("Description is required.");
            isValid = false;
        }
        if (!image) {
            setErrorImage("Image is required.");
            isValid = false;
        }
        if (!isValid) {
            return;
        } else {
            setErrorNameImage("");
            setErrorDescriptionImage("");
            setErrorImage("");
            let data = new FormData();
            if (!image) {
                alert("Image is required");
                return;
            }
            if (!name) {
                alert("Name is required");
                return;
            }
            if (!description) {
                alert("Description is required");
                return;
            }
            data.append('Data', image);
            data.append('RequestArtworkId', requestArtworkId);
            data.append('Title', name);
            data.append('Description', description);

            const token = localStorage.getItem("token");
            if (token) {
                const reponse = await UploadImageToRequestArtworkByCreatorAsync(data, token);
                if (reponse.status === "SUCCESS") {
                    alert("Upload image success");
                    window.location.reload();
                } else {
                    alert("Upload image fail");
                }
            }
            else {
                alert("You are not login")
                window.location.href = "/login";
            }
        }
    };

    return (
        <form className="mt-2 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleFormSubmit}>
            <p className="font-semibold text-xl mb-4">Upload tranh</p>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Tên bức tranh</label>
                <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={e => setName(e.target.value)} />
                {errorNameImage && <p className="text-red-500 text-xs italic">{errorNameImage}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Mô tả bức tranh</label>
                <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-20" onChange={e => setDescription(e.target.value)} />
                {errorDescriptionImage && <p className="text-red-500 text-xs italic">{errorDescriptionImage}</p>}
            </div>
            <div className="mb-4">
                <label className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded inline-block">
                    Upload Image
                    <input type="file" className="hidden" onChange={handleImageUpload} />
                </label>
                {errorImage && <p className="text-red-500 text-xs italic">{errorImage}</p>}
            </div>
            {image && (
                <div className="mt-4 border-2 border-blue-500 rounded overflow-hidden mb-4">
                    <Image src={image} alt="Uploaded" width={200} height={200} objectFit="cover" />
                </div>
            )}
            <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Submit
            </button>
        </form>
    );
};