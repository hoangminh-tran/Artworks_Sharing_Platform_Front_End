import { GetListArtworkByCreatorId, AsyncResponse } from "../lib/Interface";
import { URL } from "@/app/component/api/Url";

export async function GetListArtworkByCreatorIdForAllRoleAsync(creatorId: string) {
    try {
        const response = await fetch(`https://${URL}/artworkapi/GetListArtworkByCreatorIdAsync?creatorId=${creatorId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"                
            },
        });
        if (!response.ok){
            throw await response.text();
        } 
        if (response.status === 200) {
            const data = await response.json();
            const reponse: AsyncResponse<GetListArtworkByCreatorId[]> = {
                status: "SUCCESS",
                data: data
            };
            return reponse;
        } else {
            const data = await response.text();
            const reponse: AsyncResponse<GetListArtworkByCreatorId[]> = {
                status: "FAIL",
                error: data
            };
            return reponse;
        }
    } catch (error: any) {
        const reponse: AsyncResponse<GetListArtworkByCreatorId[]> = {
            status: "FAIL",
            error: error
        };
        return reponse;
    }
}