import { AsyncResponse, TypeOfArtwork } from "../lib/Interface";
import { URL } from "@/app/component/api/Url";

export async function GetListTypeOfArtwork() {
    try {
        const response = await fetch(`https://${URL}/typeofartworkapi/GetListTypeOfArtwork`, {
            method: "GET",
            headers: {                
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            throw await response.text();
        }
        if (response.status === 200) {
            const data = await response.json();
            const reponse : AsyncResponse<TypeOfArtwork[]> = {
                status : "SUCCESS",
                data : data
            };            
            return reponse;
        } else {
            const data = await response.text();
            const reponse : AsyncResponse<TypeOfArtwork[]> = {
                status : "FAIL",
                error : data
            };            
            return reponse;
        }
    } catch (error : any) {
        const reponse : AsyncResponse<TypeOfArtwork[]> = {
            status : "FAIL",
            error : error
        };                
        return reponse;
    }
}