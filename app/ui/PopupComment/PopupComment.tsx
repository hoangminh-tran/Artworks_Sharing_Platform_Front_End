'use client';
import Image from 'next/image'
import Close from '@/public/close-square-svgrepo-com.svg';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CreatePostComment, GetComment, PostetArtwork } from '@/app/component/lib/Interface';
import { GetPostByIdAsync } from '@/app/component/api/GetPostByIdAsync';
import { CreatePostCommentAsync } from '@/app/component/api/CreatePostCommentAsync';
import { GetListPostCommentAsync } from '@/app/component/api/GetListPostCommentAsync';
import { DeleteCommentAsync } from '@/app/component/api/DeleteCommentAsync';

export default function PopupComment({ setShowCommentPopup, postId }: { setShowCommentPopup: (show: boolean) => void, postId: string | undefined }) {
    const [post, setPost] = useState<PostetArtwork>();
    const [token, setToken] = useState<string | null>(null);
    const [newComment, setNewComment] = useState<string>("");
    const [listComment, setListComment] = useState<GetComment[]>([]);

    useEffect(() => {
        if (postId === undefined) {
            setShowCommentPopup(false);
        } else {
            const fetchPost = async () => {
                const response = await GetPostByIdAsync(postId);
                if (response.status === "SUCCESS") {
                    setPost(response.data);
                } else {
                    console.error(response.error ?? "Unknown error");
                }
            }
            fetchPost();
            fetchComment();
            const tokenFromStorage = localStorage.getItem('token');
            if (tokenFromStorage) {
                setToken(tokenFromStorage);
            }
        }
    }, [postId, setShowCommentPopup]);

    const fetchComment = async () => {
        if (!post) {
            return;
        }
        const response = await GetListPostCommentAsync(post.postId, localStorage.getItem('token') ?? "");
        if (response.status === "SUCCESS" && response.data !== undefined) {
            setListComment(response.data);
        } else {
            console.error(response.error ?? "Unknown error");
        }
    }

    const handleSubitComment = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!post) {
            return;
        }
        if (!token) {
            alert("You must be logged in to comment");
            return;
        }
        const newCommentResDto: CreatePostComment = {
            postId: post.postId,
            comment: newComment
        };
        const response = await CreatePostCommentAsync(newCommentResDto, token);
        if (response.status === "SUCCESS") {
            fetchComment();
            setNewComment("");
        } else {
            alert(response.error ?? "Unknown error");
        }
    }

    const handleDeleteComment = async (commentId: string) => {
        if (!token) {
            alert("You must be logged in to delete comment");
            return;
        }
        const response = await DeleteCommentAsync(commentId, token);
        if (response.status === "SUCCESS") {
            fetchComment();
            alert("Delete comment successfully");
        } else {
            alert(response.error ?? "Unknown error");
        }
    }

    if (post === undefined) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white rounded ml-32 mr-32 max-w-3xl min-w-96 overflow-x-auto overflow-y-auto min-h-32 max-h-screen h-[80vh] space-y-3 flex items-center justify-center">
                    Loading...
                </div>
            </div>
        );
    }
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded ml-32 mr-32 max-w-3xl min-w-96 overflow-x-auto overflow-y-auto min-h-32 max-h-screen h-[80vh] space-y-3">
                <div className='p-4'>
                    <div className='flex flex-row justify-between items-center mb-2 pb-2 border-b'>
                        <div></div>
                        <p className='font-semibold text-xl'>Bài viết của {post.creatorName}</p>
                        <button onClick={() => setShowCommentPopup(false)}>
                            <Image src={Close} alt='close' width={40} height={40} />
                        </button>
                    </div>
                    <div className="flex flex-col mb-2 pb-2 border-b">
                        <p className="font-semibold text-lg">{post.creatorName}</p>
                        <p className="font-light text-sm text-gray-700">{post.createDateTime}</p>
                    </div>
                    <div>
                        <p>{post.contentPost}</p>
                    </div>
                    <div className="flex space-x-3 overflow-x-auto overflow-y-auto">
                        {post.listArtwork.map((artwork) => (
                            <Link key={artwork.artworkId} href={`/artwork/${artwork.artworkId}`}>
                                <div style={{ position: 'relative', width: '400px', height: '200px' }}>
                                    <Image
                                        src={`data:image/jpeg;base64,${artwork.image}`}
                                        alt='poster'
                                        layout='fill'
                                        objectFit='cover'
                                        objectPosition='center'
                                    />
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="flex flex-row pb-2 border-b">
                    </div>
                    <div className='flex flex-col mt-2'>
                        {listComment.map((comment) => (
                            <div key={comment.commentId} className='flex flex-row justify-between items-start border-b pb-2'>
                                <div className='flex flex-col space-y-1'>
                                    <p className='font-medium text-sm'>{comment.accountName}</p>
                                    <p className='text-xs font-light'>{comment.createDateTime}</p>
                                    <p className="bg-gray-100 p-2 rounded-lg">{comment.content}</p>
                                </div>
                                {comment.isCommentByAccount && (
                                    <button onClick={() => handleDeleteComment(comment.commentId)} className='text-red-500'>Delete</button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                {token && (
                    <form className="sticky bottom-0 bg-white pt-3 pl-3 pr-3" onSubmit={handleSubitComment}>
                        <input
                            type="text"
                            placeholder="Viết bình luận"
                            className="w-full p-2 rounded-md shadow-lg bg-slate-100"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button className="w-full py-2 rounded-md" type='submit'>Gửi</button>
                    </form>
                )}
            </div>
        </div>
    )
}