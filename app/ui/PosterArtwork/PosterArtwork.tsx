'use client';
import { GetListPostArtworkAsync } from "@/app/component/api/GetListPostArtworkAsync";
import { PostetArtwork } from "@/app/component/lib/Interface";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { UnlikePostAsync } from "@/app/component/api/UnlikePostAsync";
import { LikePostAsync } from "@/app/component/api/LikePostAsync";
import SelectListCreator from "../SelectListCreator/SelectListCreator";
import { GetListPostByCreaterIdAsync } from "@/app/component/api/GetListPostByCreaterIdAsync";

interface PosterArtworkProps {
    onCommentButtonClick: (postId: string) => void;
}
export default function PosterArtwork({ onCommentButtonClick }: PosterArtworkProps) {
    const [listPosterArtwork, setListPosterArtwork] = useState<PostetArtwork[]>([]);
    const [token, setToken] = useState<string | null>(null);
    const [creatorId, setCreatorId] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const tokenFromStorage = localStorage.getItem('token');
        if (tokenFromStorage) {
            setToken(tokenFromStorage);
        }
        if (creatorId === '') {
            fetchListPostArtwork();
        } else {
            if (creatorId !== undefined) {
                fetchListPostArtworkByCreator();
            } else
                return;
        }
    }, [creatorId]);

    const fetchListPostArtwork = async () => {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        const response = await GetListPostArtworkAsync(token ?? '');
        if (response.status === "SUCCESS" && response.data !== undefined) {
            setListPosterArtwork(response.data);
        } else {
            console.error(response.error ?? "Unknown error");
        }
        setIsLoading(false);
    }

    const fetchListPostArtworkByCreator = async () => {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        const response = await GetListPostByCreaterIdAsync(token ?? '', creatorId);
        if (response.status === "SUCCESS" && response.data !== undefined) {
            setListPosterArtwork(response.data);
        } else {
            console.error(response.error ?? "Unknown error");
        }
        setIsLoading(false);
    }

    const handleLikeUnlike = async (postId: string, isLiked: boolean) => {
        if (isLiked) {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await UnlikePostAsync(postId, token);
                if (response.status === 'SUCCESS') {
                    if (creatorId === undefined) {
                        fetchListPostArtwork();
                    } else {
                        fetchListPostArtworkByCreator();
                    }
                } else {
                    alert('Something went wrong, please try again');
                }
            } else {
                alert('You must be logged in to like a post');
            }
        } else {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await LikePostAsync(postId, token);
                if (response.status === 'SUCCESS') {
                    if (creatorId === undefined) {
                        fetchListPostArtwork();
                    } else {
                        fetchListPostArtworkByCreator();
                    }
                } else {
                    alert('Something went wrong, please try again');
                }
            } else {
                alert('You must be logged in to like a post');
            }
        }
    };

    return (
        <div className="flex flex-col p-5 m-5 space-y-3 max-w-4xl min-w-96">
            <p>Tìm những bài post do creator đăng: </p>
            <SelectListCreator onSelectionChange={(selected) => setCreatorId(selected.creatorId)} />
            {isLoading ? (
                <div className="flex items-center justify-center h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                listPosterArtwork.map((posterArtwork) => (
                    <div key={posterArtwork.postId} className="bg-white rounded-xl shadow-lg p-5">
                        <div className="flex flex-col ">
                            <Link className="font-semibold text-lg" href={`artist/${posterArtwork.creatorId}`}>{posterArtwork.creatorName}</Link>
                            <p className="font-light text-sm text-gray-700">{posterArtwork.createDateTime}</p>
                        </div>
                        <div className="border-t mt-2 pt-2">
                            <p>{posterArtwork.contentPost}</p>
                        </div>
                        <div className="flex space-x-3 overflow-x-auto overflow-y-auto mb-2 pb-2 border-t mt-2 pt-2">
                            {posterArtwork.listArtwork.map((artwork) => (
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
                        <div className="flex flex-row justify-between mb-2 pb-2 border-b mt-2 pt-2 border-t">
                            <p>Thích: {posterArtwork.likeCount}</p>
                        </div>
                        <div className="flex flex-row">
                            {token && <button
                                onClick={() => handleLikeUnlike(posterArtwork.postId, posterArtwork.isLike)}
                                className={`w-full py-2 rounded-md ${posterArtwork.isLike ? 'text-red-500' : ''}`}
                            >
                                {posterArtwork.isLike ? 'Bỏ thích' : 'Thích'}
                            </button>}
                            <button className="w-full py-2 rounded-md" onClick={() => onCommentButtonClick(posterArtwork.postId)}>Bình luận</button>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}