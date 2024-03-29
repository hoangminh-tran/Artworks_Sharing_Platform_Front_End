import { AsyncResponse, Artwork } from "../lib/Interface";
import { URL } from "@/app/component/api/Url";

export async function FilterArtworkByTypeAndCreatorAsync(typeOfArtworks?: string[], creatorId?: string) {
    try {
        let requestBody: any = {};

        if (typeOfArtworks !== null && typeOfArtworks !== undefined && typeOfArtworks.length > 0) {
            requestBody.typeOfArtworkIds = typeOfArtworks;
        }

        if (creatorId !== null) {
            requestBody.artistId = creatorId;
        }
        const response = await fetch(`https://${URL}/artworkapi/GetListArtworkByFilterListTypeOfArtworkAndArtist`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody)
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

