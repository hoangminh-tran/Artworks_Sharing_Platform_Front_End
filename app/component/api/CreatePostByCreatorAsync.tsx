import { CreatePostByCreator, AsyncResponse } from "../lib/Interface";
import { URL } from "./Url";

export async function CreatePostByCreatorAsync(token: string, data: CreatePostByCreator) {
    try {
        const response = await fetch(`https://${URL}/PostApi/CreatePostByCreator`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw await response.text();
        }
        if (response.status === 200) {
            const responseData: AsyncResponse<string> = {
                status: "SUCCESS",
                data: "Post created successfully"
            };
            return responseData;
        } else {
            const data = await response.text();
            const responseData: AsyncResponse<string> = {
                status: "FAIL",
                error: data
            };
            return responseData;
        }
    } catch (error) {
        const responseData: AsyncResponse<string> = {
            status: "FAIL",
            error: "Error"
        };
        return responseData;
    }   
}