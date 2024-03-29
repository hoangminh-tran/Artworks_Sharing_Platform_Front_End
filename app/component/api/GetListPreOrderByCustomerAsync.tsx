import { AsyncResponse, PreOrderByCustomer } from "../lib/Interface";
import { URL } from "./Url";

export async function GetListPreOrderByCustomerAsync(token: string) {
    try {
        const response = await fetch(`https://${URL}/PreOrderApi/GetListPreOrderByCustomer`, {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        if (!response.ok) {
            throw await response.text();
        }

        if (response.status === 200) {
            const data = await response.json();
            const responseData: AsyncResponse<PreOrderByCustomer[]> = {
                status: "SUCCESS",
                data: data
            };
            return responseData;
        } else {
            const data = await response.text();
            const responseData: AsyncResponse<PreOrderByCustomer[]> = {
                status: "FAIL",
                error: data
            };
            return responseData;
        } 
    } catch (error) {
        const responseData: AsyncResponse<PreOrderByCustomer[]> = {
            status: "FAIL",
            error: "Error"
        };
        return responseData;
    }
}