import { AsyncResponse, BookingByCreator } from "../lib/Interface";
import { URL } from "@/app/component/api/Url";

export async function GetBookingByCreatorAsync(token: string, bookingId : string){
    try {
        const response = await fetch(`https://${URL}/BookingApi/GetBookingByBookingIdByCreator?bookingId=${bookingId}`, {
            method: "GET",
            headers: {                
                "Authorization": "Bearer " + token
            }
        });
        if (!response.ok) {
            throw await response.text();
        }
        if (response.status === 200) {
            const data = await response.json();
            const reponse : AsyncResponse<BookingByCreator> = {
                status : "SUCCESS",
                data : data
            };
            return reponse;
        } else {
            const data = await response.text();
            const reponse : AsyncResponse<BookingByCreator> = {
                status : "FAIL",
                error : data
            };
            return reponse;
        }
    } catch (error : any) {
        const reponse : AsyncResponse<BookingByCreator> = {
            status : "FAIL",
            error : error
        };                
        return reponse;
    }

}
