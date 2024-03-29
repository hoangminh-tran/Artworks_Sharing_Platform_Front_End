import { RegisterMember, AsyncResponse } from "../lib/Interface";
import { URL } from "./Url";

export async function RegisterCreatorAsync( user : RegisterMember){
    try {
        const response = await fetch(`https://${URL}/accountapi/registercreator`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
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
                error : data
            };            
            return reponse;
        }
    } catch (error : any) {
        const reponse : AsyncResponse<string> = {
            status : "FAIL",
            error : error
        };                
        return reponse;
    }
}