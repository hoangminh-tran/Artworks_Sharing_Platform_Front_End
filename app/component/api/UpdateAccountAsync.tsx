
import { AsyncResponse, UpdateYourAccount } from '../lib/Interface';
import { URL } from "./Url";

export async function UpdateAccountAsync(updateAccount: UpdateYourAccount, token: string) {
    try {
        const response = await fetch(`https://${URL}/accountapi/updateaccount`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(updateAccount)
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
            error: "Some fields are missing or invalid. Please check again!"
        };
        return responseData;
    }
}

