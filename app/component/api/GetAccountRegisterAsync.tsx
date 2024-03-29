import { AsyncResponse, MonthlyRegistrationStatistics } from "../lib/Interface";
import { URL } from "@/app/component/api/Url";

export async function GetAccountRegisterAsync(token: string) {
    try {
        const response = await fetch(`https://${URL}/api/Statistics/account/year?year=2024`, {
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
            const reponse: AsyncResponse<MonthlyRegistrationStatistics> = {
                status: "SUCCESS",
                data: data
            };
            return reponse;
        } else {
            const data = await response.text();
            const reponse: AsyncResponse<MonthlyRegistrationStatistics> = {
                status: "FAIL",
                error: data
            };
            return reponse;
        }
    } catch (error: any) {
        const reponse: AsyncResponse<MonthlyRegistrationStatistics> = {
            status: "FAIL",
            error: error
        };
        return reponse;
    }

}