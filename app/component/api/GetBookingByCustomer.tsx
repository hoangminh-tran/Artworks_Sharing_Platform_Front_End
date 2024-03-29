import { AsyncResponse, BookingByCustomer } from "../lib/Interface";
import { URL } from "@/app/component/api/Url";

export async function GetBookingByCustomerAsync(token: string, bookingId : string){
    try {
        const response = await fetch(`https://${URL}/BookingApi/GetBookingByBookingIdByCustomer?bookingId=${bookingId}`, {
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
            const reponse : AsyncResponse<BookingByCustomer> = {
                status : "SUCCESS",
                data : data
            };
            return reponse;
        } else {
            const data = await response.text();
            const reponse : AsyncResponse<BookingByCustomer> = {
                status : "FAIL",
                error : data
            };
            return reponse;
        }
    } catch (error : any) {
        const reponse : AsyncResponse<BookingByCustomer> = {
            status : "FAIL",
            error : error
        };                
        return reponse;
    }

}
