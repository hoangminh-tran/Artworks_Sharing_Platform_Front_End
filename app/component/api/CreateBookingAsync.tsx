import { CreateBooking, AsyncResponse } from "../lib/Interface";
import { URL } from "./Url";

export async function CreateBookingAsync(createBooking: CreateBooking, token: string){
    try {
        const response = await fetch(`https://${URL}/BookingApi/CreateBooking`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(createBooking)
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