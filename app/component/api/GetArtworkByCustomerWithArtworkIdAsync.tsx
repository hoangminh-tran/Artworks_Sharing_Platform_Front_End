import { GetArtworkByCustomer, AsyncResponse } from '../lib/Interface';
import { URL } from './Url';

export async function GetArtworkByCustomerWithArtworkIdAsync(artworkId: string, token: string) {
    try {
        const response = await fetch(`https://${URL}/artworkapi/GetArtworkByCustomerWithArtworkId?artworkId=${artworkId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        if (!response.ok) {
            throw await response.text();
        }
        if (response.status === 200) {
            const data = await response.json();
            const reponse: AsyncResponse<GetArtworkByCustomer> = {
                status: 'SUCCESS',
                data: data
            };
            return reponse;
        } else {
            const data = await response.text();
            const reponse: AsyncResponse<GetArtworkByCustomer> = {
                status: 'FAIL',
                error: data
            };
            return reponse;
        }
    } catch (error: any) {
        const reponse: AsyncResponse<GetArtworkByCustomer> = {
            status: 'FAIL',
            error: error
        };
        return reponse;
    }
}
