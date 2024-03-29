import { AsyncResponse, BookingByAdmin } from "../lib/Interface";
import { URL } from "@/app/component/api/Url";

export async function GetListBookingByAdminAsync(token: string){
    try {
        const response = await fetch(`https://${URL}/BookingApi/GetListBookingByAdmin`, {
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
            const reponse : AsyncResponse<BookingByAdmin[]> = {
                status : "SUCCESS",
                data : data
            };            
            return reponse;
        } else {
            const data = await response.text();
            const reponse : AsyncResponse<BookingByAdmin[]> = {
                status : "FAIL",
                error : data
            };            
            return reponse;
        }
    } catch (error : any) {
        const reponse : AsyncResponse<BookingByAdmin[]> = {
            status : "FAIL",
            error : error
        };                
        return reponse;
    }
}
