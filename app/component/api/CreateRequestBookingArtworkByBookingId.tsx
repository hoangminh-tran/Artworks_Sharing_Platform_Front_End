import { CreateRequestBooking, AsyncResponse } from '@/app/component/lib/Interface'
import { URL } from '@/app/component/api/Url'

export async function CreateRequestBookingArtworkByBookingId (token : string, requestBooking : CreateRequestBooking) {
    try { 
        const response = await fetch(`https://${URL}/BookingApi/CreateRequestBookingArtworkByBookingId`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                bookingId: requestBooking.bookingId,
                contentRequest: requestBooking.contentRequest
            })
        })
        if (!response.ok) {
            throw await response.text()
        }
        if (response.status === 200) {
            const data = await response.text()
            const reponse: AsyncResponse<string> = {
                status: 'SUCCESS',
                data: data
            }
            return reponse
        } else {
            const data = await response.text()
            const reponse: AsyncResponse<string> = {
                status: 'FAIL',
                error: data
            }
            return reponse
        }
    } catch (error: any) {
        const reponse: AsyncResponse<string> = {
            status: 'FAIL',
            error: error
        }
        return reponse
    }
}