import { AsyncResponse } from "../lib/Interface";
import { URL } from "./Url";

export async function UploadImageToBookingByCreatorAsync(data: FormData, token: string) {
    try {        
        const response = await fetch(`https://${URL}/BookingApi/UploadArtworkByBookingId`, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + token
            },
            body: data
        });
        if (!response.ok) {
            throw await response.text();
        }
        if (response.status === 200) {
            const data = await response.text();
            const reponse: AsyncResponse<string> = {
                status: "SUCCESS",
                data: data
            };
            return reponse;
        } else {
            const data = await response.text();
            const reponse: AsyncResponse<string> = {
                status: "FAIL",
                error: data
            };
            return reponse;
        }
    } catch (error: any) {
        const reponse: AsyncResponse<string> = {
            status: "FAIL",
            error: error
        };
        return reponse;
    }
}