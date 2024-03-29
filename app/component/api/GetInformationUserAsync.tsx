import { AsyncResponse, User } from "../lib/Interface";
import { URL } from "@/app/component/api/Url";

export async function GetInformationUserAsync(token: string) {
    try {
        const response = await fetch(`https://${URL}/accountapi/GetLoggedAccount`, {
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
            const reponse: AsyncResponse<User> = {
                status: "SUCCESS",
                data: data
            };
            return reponse;
        } else {
            const data = await response.text();
            const reponse: AsyncResponse<User> = {
                status: "FAIL",
                error: data
            };
            return reponse;
        }
    } catch (error: any) {
        const reponse: AsyncResponse<User> = {
            status: "FAIL",
            error: error
        };
        return reponse;
    }

}
