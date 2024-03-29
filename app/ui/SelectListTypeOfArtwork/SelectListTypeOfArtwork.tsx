import { GetListTypeOfArtwork } from "@/app/component/api/GetListTypeOfArtwork";
import { TypeOfArtwork } from "@/app/component/lib/Interface";
import { useEffect, useState } from "react";
import Select from "react-select";

export default function SelectListTypeOfArtwork({ listSelectedTypeOfArtwork, onSelectionChange } : { listSelectedTypeOfArtwork? : TypeOfArtwork[], onSelectionChange: (selected: TypeOfArtwork[]) => void }) {
    const [listTypeOfArtwork, setListTypeOfArtwork] = useState<TypeOfArtwork[]>([]);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedTypeOfArtwork, setSelectedTypeOfArtwork] = useState<TypeOfArtwork[]>(listSelectedTypeOfArtwork || []);

    useEffect(() => {
        const fetchListTypeOfArtwork = async () => {
            setLoading(true);
            const response = await GetListTypeOfArtwork();
            setLoading(false);
            if (response.status === "SUCCESS") {
                if (response.data !== undefined) {
                    setListTypeOfArtwork(response.data);
                } else {
                    setError("Data is undefined");
                }               
            } else {
                setError(response.error ?? "Unknown error");
            }
        };    
        fetchListTypeOfArtwork();        
    }, []);

    useEffect(() => {
        onSelectionChange(selectedTypeOfArtwork);
    }, [selectedTypeOfArtwork]);

    const options = listTypeOfArtwork.map(artwork => ({ value: artwork.id, label: artwork.type }));

    const handleChange = (selectedOptions: any) => {
        setSelectedTypeOfArtwork(selectedOptions.map((option: any) => listTypeOfArtwork.find(artwork => artwork.id === option.value)));
    };

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
                    value={selectedTypeOfArtwork.map(artwork => ({ value: artwork.id, label: artwork.type }))}
                />
            )}
        </div>
    )
}