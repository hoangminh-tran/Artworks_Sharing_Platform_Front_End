import { TypeOfArtwork } from "@/app/component/lib/Interface"
import { useRef, useState } from "react";
import { z } from "zod"


export default function CreateTypeOfArtwork(){
    const [typeError, setTypeError] = useState('');
    const [typeDescriptionError, setTypeDescriptionError] = useState('');
    const typeRef = useRef<HTMLInputElement>(null);
    const typeDescriptionRef = useRef<HTMLInputElement>(null);

    const schema = z.object({
        type: z
            .string()
            .min(1, "Type không được để trống"),
        typeDescription: z
            .string()
            .min(1, "Type Description không được để trống")
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const type = typeRef.current?.value;
        const typeDescription = typeDescriptionRef.current?.value;
        const result = schema.safeParse({ type, typeDescription });
        if (result.success) {            
            setTypeError('');
            setTypeDescriptionError('');    
            
        } else {
            for (const error of result.error.errors) {
                if (error.path[0] === 'type') {
                    setTypeError(error.message);
                } else if (error.path[0] === 'typeDescription') {
                    setTypeDescriptionError(error.message);
                }
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
            <input
                ref={typeRef}
                type="text"
                name="type"
                placeholder="Type"
                className="p-2 border-2 rounded-md hover:border-green-500 focus:border-green-500"
            />
            <p className="text-red-500">{typeError}</p>
            <input
                ref={typeDescriptionRef}
                type="text"
                name="typeDescription"
                placeholder="Type Description"
                className="p-2 border-2 rounded-md hover:border-green-500 focus:border-green-500"
            />
            <p className="text-red-500">{typeDescriptionError}</p>
            <button
                type="submit"
                className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
                Create
            </button>
        </form>
    )
}