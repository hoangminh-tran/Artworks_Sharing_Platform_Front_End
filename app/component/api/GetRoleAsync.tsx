import { AsyncResponse } from "../lib/Interface";
import { URL } from "@/app/component/api/Url";

export async function GetRoleAsync( token : string ) {
    try {
        const response = await fetch(`https://${URL}/accountapi/GetRoleAccountLoggedIn`, {
            method: "GET",
            headers: {                
                "Authorization": `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw await response.text();
        }
        if (response.status === 200) {
            const data = await response.text();
            const reponse : AsyncResponse<string> = {
                status : "SUCCESS",
                data : data
            };            
            return reponse;
        } else {
            const data = await response.text();
            const reponse : AsyncResponse<string> = {
                status : "FAIL",
                data : data
            };            
            return reponse;
        }
    } catch (error : any) {
        const reponse : AsyncResponse<string> = {
            status : "FAIL",
            data : error
        };                
        return reponse;
    }
}