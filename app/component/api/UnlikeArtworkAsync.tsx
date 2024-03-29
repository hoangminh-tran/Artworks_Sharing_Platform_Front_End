import { AsyncResponse } from "../lib/Interface"
import { URL } from "./Url"

export async function UnlikeArtworkAsync(artworkId: string, token: string) {
    try {
        const response = await fetch(`https://${URL}/likebyapi/unlikeartwork?artworkId=${artworkId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        });
        if (!response.ok) {
            throw await response.text();
        }
        if (response.status === 200) {
            const responseData: AsyncResponse<string> = {
                status: "SUCCESS",
                data: "Artwork unliked successfully"
            };
            return responseData;
        } else {
            const data = await response.text();
            const responseData: AsyncResponse<string> = {
                status: "FAIL",
                error: data
            };
            return responseData;
        }
    } catch (error) {
        const responseData: AsyncResponse<string> = {
            status: "FAIL",
            error: "Error"
        };
        return responseData;
    }
}