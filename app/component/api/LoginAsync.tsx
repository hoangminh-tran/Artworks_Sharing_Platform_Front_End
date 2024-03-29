import { Login as LoginProps } from "@/app/component/lib/Interface";
import { URL } from "@/app/component/api/Url"
import { LoginAsyncReponse } from "@/app/component/lib/Interface";

export async function LoginAsync( LoginProps : LoginProps ) {
    try {
        const response = await fetch(`https://${URL}/accountapi/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: LoginProps.email,
                password: LoginProps.password
            })
        });
        if (!response.ok) {
            throw await response.text();
        }
        if (response.status === 200) {
            const data = await response.text();
            const reponse : LoginAsyncReponse = {
                status : "SUCCESS",
                data : data
            };            
            return reponse;
        } else {
            const data = await response.text();
            const reponse : LoginAsyncReponse = {
                status : "FAIL",
                data : data
            };            
            return reponse;
        }
    } catch (error : any) {
        const reponse : LoginAsyncReponse = {
            status : "FAIL",
            data : error
        };                
        return reponse;
    }
}