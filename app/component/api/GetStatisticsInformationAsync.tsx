import { URL } from "@/app/component/api/Url";
import { AsyncResponse, TotalStatisticalDashboard } from "../lib/Interface";

export async function GetStatisticsInformationAsync(token: string) {
    try {
        const response = await fetch(`https://${URL}/api/Statistics/TotalStatistics`, {
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
            const reponse: AsyncResponse<TotalStatisticalDashboard> = {
                status: "SUCCESS",
                data: data
            };
            return reponse;
        } else {
            const data = await response.text();
            const reponse: AsyncResponse<TotalStatisticalDashboard> = {
                status: "FAIL",
                error: data
            };
            return reponse;
        }
    } catch (error: any) {
        const reponse: AsyncResponse<TotalStatisticalDashboard> = {
            status: "FAIL",
            error: error
        };
        return reponse;
    }

}