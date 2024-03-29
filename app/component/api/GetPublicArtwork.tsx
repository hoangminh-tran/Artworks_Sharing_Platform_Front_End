import { GetPublicArtworkResDto, AsyncResponse } from "../lib/Interface";
import { URL } from "./Url";

export async function GetPublicArtwork() {
    try {
        const response = await fetch(`https://${URL}/artworkapi/GetPublicArtwork`, {
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
            const reponse: AsyncResponse<GetPublicArtworkResDto[]> = {
                status: "SUCCESS",
                data: data
            };
            return reponse;
        } else {
            const data = await response.text();
            const reponse: AsyncResponse<GetPublicArtworkResDto[]> = {
                status: "FAIL",
                error: data
            };
            return reponse;
        }
    } catch (error: any) {
        const reponse: AsyncResponse<GetPublicArtworkResDto[]> = {
            status: "FAIL",
            error: error
        };
        return reponse;
    }
}
