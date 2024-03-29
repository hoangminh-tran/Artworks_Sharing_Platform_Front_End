import { CreatePostComment, AsyncResponse } from "../lib/Interface";
import { URL } from "./Url";

export async function CreatePostCommentAsync(newComment: CreatePostComment, token: string){
    try {
        const response = await fetch(`https://${URL}/CommentApi/CreatePostComment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(newComment),
        });

        if (!response.ok) {
            throw await response.text();
        }

        if (response.status === 200) {
            const data = await response.text();
            const responseData: AsyncResponse<string> = {
                status: "SUCCESS",
                data: data,
            };
            return responseData;
        } else {
            const data = await response.text();
            const responseData: AsyncResponse<string> = {
                status: "FAIL",
                error: data,
            };
            return responseData;
        } 
    } catch (error) {
        const responseData: AsyncResponse<string> = {
            status: "FAIL",
            error: "Error",
        };
        return responseData;
    }
}