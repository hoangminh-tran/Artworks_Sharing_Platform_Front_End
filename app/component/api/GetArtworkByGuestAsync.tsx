import { GetArtworkByGuest, AsyncResponse } from "../lib/Interface";
import { URL } from "./Url";

export async function GetArtworkByGuestAsync(artworkId: string, token: string) {
    try {
        const response = await fetch(`https://${URL}/artworkapi/GetArtworkById?artworkId=${artworkId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        });
        if (!response.ok) {
            throw await response.text();
        }
        if (response.status === 200) {
            const data = await response.json();
            const responseData: AsyncResponse<GetArtworkByGuest> = {
                status: "SUCCESS",
                data: data
            };
            return responseData;
        } else {
            const data = await response.text();
            const responseData: AsyncResponse<GetArtworkByGuest> = {
                status: "FAIL",
                error: data
            };
            return responseData;
        }
    } catch (error) {
        const responseData: AsyncResponse<GetArtworkByGuest> = {
            status: "FAIL",
            error: "Error"
        };
        return responseData;
    }
}