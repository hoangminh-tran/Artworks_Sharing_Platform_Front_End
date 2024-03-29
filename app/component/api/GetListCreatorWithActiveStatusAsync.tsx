import { AccountResponseDto, AsyncResponse } from "@/app/component/lib/Interface";
import { URL } from "@/app/component/api/Url";

export async function GetListCreatorWithActiveStatusAsync(){
    try {
        const response = await fetch(`https://${URL}/accountapi/GetListCreatorWithActiveStatusAsync`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            throw await response.text();
        }
        if (response.status === 200) {
            const data = await response.json();
            const reponse : AsyncResponse<AccountResponseDto[]> = {
                status : "SUCCESS",
                data : data
            };            
            return reponse;
        } else {
            const data = await response.text();
            const reponse : AsyncResponse<AccountResponseDto[]> = {
                status : "FAIL",
                error : data
            };            
            return reponse;
        }
    } catch (error : any) {
        const reponse : AsyncResponse<AccountResponseDto[]> = {
            status : "FAIL",
            error : error
        };                
        return reponse;
    }
}