import { GetArtworkByCreator } from "@/app/component/lib/Interface";
import { useEffect, useState } from "react";
import Select from "react-select";
import Image from "next/image";
import { GetListArtworkByCreatorAsync } from "@/app/component/api/GetListArtworkByCreatorAsync";

interface OptionProps {
    data?: {
        label: string;
        value: string;
        image: string;
    };
    innerProps: any; // Replace 'any' with the actual type if known
}

const CustomOption: React.FC<OptionProps> = ({ data, innerProps }) => {
    if (!data) {
        return null;
    }
    return (
        <div {...innerProps} className="flex flex-row p-2">
            <Image src={`data:image/jpeg;base64,${data.image}`} alt={data.label} width={50} height={50} />
            {data.label}
        </div>
    );
};

type SeleteListArtworkByCreatorProps = {
    onSelectionChange: (selected: string[]) => void;
};

export default function SeleteListArtworkByCreator({ onSelectionChange }: SeleteListArtworkByCreatorProps) {
    const [listArtwork, setListArtwork] = useState<GetArtworkByCreator[]>([]);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedArtwork, setSelectedArtwork] = useState<string[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const fetchListArtworkByCreator = async () => {
                setLoading(true);
                const response = await GetListArtworkByCreatorAsync(token);
                setLoading(false);
                if (response.status === "SUCCESS") {
                    if (response.data !== undefined) {
                        setListArtwork(response.data);
                    } else {
                        setError("Data is undefined");
                    }
                } else {
                    setError(response.error ?? "Unknown error");
                }
            };
            fetchListArtworkByCreator();
        } else {
            setError("Token is undefined");
        }
    }, []);

    const handleChange = (selectedOptions: any) => {
        const selectedArtworkIds = selectedOptions.map((option: any) => option.value);
        setSelectedArtwork(selectedArtworkIds);
        onSelectionChange(selectedArtworkIds);
    };

    const options = listArtwork.map(artwork => ({ value: artwork.artworkId, label: artwork.title, image: artwork.image }));

    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error}</div>
            ) : (
                <Select
                    isMulti
                    options={options}
                    onChange={handleChange}
                    value={selectedArtwork.map(artworkId => options.find(option => option.value === artworkId))}
                    components={{ Option: CustomOption }}
                />
            )}
        </div>
    );
}