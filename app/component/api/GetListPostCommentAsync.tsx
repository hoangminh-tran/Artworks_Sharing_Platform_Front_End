import { GetComment, AsyncResponse } from "../lib/Interface";
import { URL } from "./Url";

export async function GetListPostCommentAsync(postId: string, token: string) {
    try {
        const response = await fetch(`https://${URL}/CommentApi/GetListCommentByPosts?postId=${postId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw await response.text();
        }

        if (response.status === 200) {
            const data = await response.json();
            const listComment: GetComment[] = data;
            return {
                status: "SUCCESS",
                data: listComment
            } as AsyncResponse<GetComment[]>;            
        } else {
            const data = await response.json();
            return {
                status: "FAILED",
                error: data.error
            } as AsyncResponse<GetComment[]>;            
        }
    } catch (error) {
        return {
            status: "FAILED",
            error: error
        } as AsyncResponse<GetComment[]>;
    }
}