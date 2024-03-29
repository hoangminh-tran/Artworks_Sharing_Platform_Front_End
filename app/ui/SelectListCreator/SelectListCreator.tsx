import { GetListCreatorAsync } from "@/app/component/api/GetListCreatorAsync";
import { GetCreator } from "@/app/component/lib/Interface";
import { useEffect, useState } from "react";
import Select from "react-select";

export default function SelectListCreator({ selectedCreator, onSelectionChange }: { selectedCreator?: GetCreator, onSelectionChange: (selected: GetCreator) => void }) {
    const [listCreator, setListCreator] = useState<GetCreator[]>([]);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [selected, setSelected] = useState<GetCreator>(selectedCreator ?? {} as GetCreator);    
    useEffect(() => {
        const fetchListCreator = async () => {
            setLoading(true);
            const response = await GetListCreatorAsync();
            setLoading(false);
            if (response.status === "SUCCESS") {
                if (response.data !== undefined) {
                    setListCreator(response.data);
                } else {
                    setError("Data is undefined");
                }
            } else {
                setError(response.error ?? "Unknown error");
            }
        };
        fetchListCreator();
    }, []);

    useEffect(() => {
        onSelectionChange(selected);
    }, [selected]);

    const options = listCreator.map(creator => ({ value: creator.creatorId, label: creator.creatorLastName }));

    const handleChange = (selectedOption: any) => {
        const selectedCreator = listCreator.find(creator => creator.creatorId === selectedOption.value);

        if (selectedCreator !== undefined) {            
            setSelected(selectedCreator);
        } else {
            setSelected({} as GetCreator);
        }
    };
    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error}</div>
            ) : (
                <div>
                    <Select
                        options={options}
                        onChange={handleChange}
                        value={{ value: selected.creatorId, label: selected.creatorLastName }}
                    />                    
                </div>
            )}
        </div>
    )
}