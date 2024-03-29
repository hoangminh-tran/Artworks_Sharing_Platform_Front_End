import { AsyncResponse } from "../lib/Interface";
import { URL } from "./Url";

export async function CreateOTPAccountAsync(email: string) {
    try {
        const response = await fetch(`https://${URL}/accountapi/${email}/forgot_password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
            // ,
            // body: JSON.stringify(email) "Send OTP successfully"
        });
        if (!response.ok) {
            throw await response.text();
        }
        if (response.status === 200) {
            const responseData: AsyncResponse<string> = {
                status: "SUCCESS",
                data: await response.text()
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