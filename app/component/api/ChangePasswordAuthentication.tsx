
import { AsyncResponse, ChangePasswordAuthentications } from '../lib/Interface';
import { URL } from "./Url";

export async function ChangePasswordAuthentication(changePassword: ChangePasswordAuthentications, token: string) {
    try {
        const response = await fetch(`https://${URL}/accountapi/changePasswordAuthentication`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(changePassword)
        });

        if (!response.ok) {
            throw await response.text();
        }

        if (response.status === 200) {
            const data = await response.text();
            const responseData: AsyncResponse<string> = {
                status: "SUCCESS",
                data: data
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
            error: (error as Error).toString()
        };
        return responseData;
    }
}

