import { AsyncResponse, Artwork } from "../lib/Interface";
import { URL } from "@/app/component/api/Url";

export async function GetListArtworkByNameAsync(name: string) {
    try {
        const response = await fetch(`https://${URL}/artworkapi/GetListArtworkByArtworkNameAsync?artworkName=${name}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (!response.ok) {
            throw await response.text();
        }
        if (response.status === 200) {
            const data = await response.json();
            const reponse: AsyncResponse<Artwork[]> = {
                status: "SUCCESS",
                data: data
            };
            return reponse;
        } else {
            const data = await response.text();
            const reponse: AsyncResponse<Artwork[]> = {
                status: "FAIL",
                error: data
            };
            return reponse;
        }
    } catch (error: any) {
        const reponse: AsyncResponse<Artwork[]> = {
            status: "FAIL",
            error: error
        };
        return reponse;
    }
}