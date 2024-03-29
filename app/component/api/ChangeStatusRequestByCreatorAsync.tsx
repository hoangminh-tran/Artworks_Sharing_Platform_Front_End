import { ChangeStatusRequestByCreator, AsyncResponse } from "../lib/Interface";
import { URL } from "./Url";

export async function ChangeStatusRequestByCreatorAsync(data: ChangeStatusRequestByCreator, token: string) {
    try {
        const response = await fetch(`https://${URL}/BookingApi/ChangeStatusRequestBookingArtworkByCreator`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(data)
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