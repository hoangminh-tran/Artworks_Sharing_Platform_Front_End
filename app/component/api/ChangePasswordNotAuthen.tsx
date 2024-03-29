import { ChangePasswordNotAuthentications, AsyncResponse } from "../lib/Interface";
import { URL } from "./Url";

export async function ChangePasswordNotAuthen(data: ChangePasswordNotAuthentications) {
    try {
        const response = await fetch(`https://${URL}/accountapi/changePasswordNotAuthentication`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw await response.text();
        }
        if (response.status === 200) {
            const responseData: AsyncResponse<string> = {
                status: "SUCCESS",
                data: "Change Password successfully"
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