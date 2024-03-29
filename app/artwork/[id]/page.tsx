'use client';
import Navbar from "@/app/ui/Navbar/Navbar";
import { GetArtworkByGuest, GetComment, CreateArtworkComment } from "@/app/component/lib/Interface";
import { useEffect, useState } from "react";
import { GetArtworkByGuestAsync } from "@/app/component/api/GetArtworkByGuestAsync";
import Image from "next/image";
import { UnlikeArtworkAsync } from "@/app/component/api/UnlikeArtworkAsync";
import { LikeArtworkAsync } from "@/app/component/api/LikeArtworkAsync";
import { CreatePreOrderByCustomerAsync } from "@/app/component/api/CreatePreOrderByCustomerAsync";
import { GetListArtworkCommentAsync } from "@/app/component/api/GetListArtworkCommentAsync";
import { CreateArtworkCommentAsync } from "@/app/component/api/CreateArtworkCommentAsync";
import { DeleteCommentAsync } from "@/app/component/api/DeleteCommentAsync";
import Link from "next/link";

export default function Page({ params }: { params: { id: string } }) {
    const [artwork, setArtwork] = useState<GetArtworkByGuest>();
    const [error, setError] = useState<string>("");
    const [listComment, setListComment] = useState<GetComment[]>([]);
    const [newComment, setNewComment] = useState<string>();
    const [isLoadingArtwork, setIsLoadingArtwork] = useState<boolean>(true);
    const [isLoadingComment, setIsLoadingComment] = useState<boolean>(true);

    useEffect(() => {
        fetchArtwork();
        fetchComment();
    }, []);

    const fetchArtwork = async () => {
        const response = await GetArtworkByGuestAsync(params.id, localStorage.getItem("token") ?? "");
        if (response.status === "SUCCESS") {
            setArtwork(response.data);
        } else {
            setError(response.error ?? "Unknown error");
        }
        setIsLoadingArtwork(false);
    };

    const handleSubitComment = async (event: React.FormEvent) => {
        event.preventDefault();

        const token = localStorage.getItem("token");
        if (!newComment) {
            alert("Comment cannot be empty");
            return;
        }
        const newCommentResDto: CreateArtworkComment = {
            artworkId: params.id,
            comment: newComment
        };
        if (token) {
            const response = await CreateArtworkCommentAsync(newCommentResDto, token);
            console.log(response);
            if (response.status === "SUCCESS") {
                fetchComment();
                setNewComment("");
            } else {
                alert(response.error ?? "Unknown error");
            }
        } else {
            alert("You must be logged in to comment");
        }
    }

    const fetchComment = async () => {
        const response = await GetListArtworkCommentAsync(params.id, localStorage.getItem("token") ?? "");
        if (response.status === "SUCCESS" && response.data) {
            setListComment(response.data);
        } else {
            setError(response.error ?? "Unknown error");
        }
        setIsLoadingComment(false);
    };

    if (isLoadingArtwork || isLoadingComment) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!artwork) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p>Có j đó sai sai ở đây!!! Xin hãy thử lại sau!!!</p>
            </div>
        );
    }

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('URL copied to clipboard');
    };

    const handleLike = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("You must be logged in to like an artwork");
            return;
        }
        if (artwork) {
            // Determine the API endpoint and method based on whether the post is already liked
            const apiFunction = artwork.isLike ? UnlikeArtworkAsync : LikeArtworkAsync;

            // Send a request to the server
            const response = await apiFunction(params.id, token);

            if (response.status === "SUCCESS") {
                fetchArtwork();
            } else {
                alert(response.error ?? "Unknown error");
            }
        }
    };

    const handleDeleteComment = async (commentId: string) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("You must be logged in to delete a comment");
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

    const handlePreOrder = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("You must be logged in to pre-order an artwork");
            return;
        }
        if (artwork) {
            const response = await CreatePreOrderByCustomerAsync(params.id, token);
            if (response.status === "SUCCESS") {
                alert("Pre-order created successfully");
            } else {
                alert(response.error ?? "Unknown error");
            }
        }
    }

    return (
        <div className="bg-gray-100 h-screen flex flex-col">
            <Navbar />
            <div className="w-full flex flex-row" style={{ height: 'calc(100vh - 5rem)' }}>
                <div className="w-3/4 bg-black overflow-hidden relative">
                    <div className="relative h-full w-full">
                        <Image src={`data:image/jpeg;base64,${artwork.image}`} alt={artwork.artworkName} className="h-full w-full object-contain" width={200} height={100} />
                        <div className="absolute bottom-0 left-0 bg-black opacity-50 p-2">
                            <p className="text-white text-lg">© Copyright by {artwork.creatorName}</p>
                        </div>
                    </div>
                </div>
                <div className="w-1/4 overflow-auto">
                    <div className="p-3">
                        <div>
                            <Link className="font-semibold text-lg" href={`http://localhost:3000/artist/${artwork.creatorId}`}>{artwork.creatorName}</Link>
                            <p className="font-light text-sm text-gray-700">{artwork.createDateTime}</p>
                        </div>
                        <div className="border-b-2 pb-2">
                            <p>Tên bức ảnh: </p>
                            <p className="bg-gray-200 p-2 rounded-lg">{artwork.artworkName}</p>
                        </div>
                        <div className="flex flex-col pb-2 border-b">
                            <p>Thể loại: </p>
                            <div className="flex flex-row space-x-1">
                                {artwork.artworkTypeList.map((type) => (
                                    <p key={type.id} className="bg-gray-200 p-2 rounded-lg">{type.type}</p>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-row justify-between mb-2 pb-2 mt-2 border-b">
                            <p>Thích: {artwork.likeCount}</p>
                            <p>Giá: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(artwork.price)} VNĐ</p>
                        </div>
                        <div className="flex flex-row border-b-2">
                            {localStorage.getItem('token') && (
                                <button onClick={handleLike} className={`w-full py-2 rounded-md ${artwork.isLike ? 'text-red-500' : ''}`}>Thích</button>
                            )}
                            <button onClick={handleShare} className="w-full py-2 rounded-md">Chia sẻ</button>
                            {artwork.isSold ? <p className="w-full py-2 rounded-md bg-red-500 text-center text-white">Đã bán</p> : <button onClick={handlePreOrder} className="w-full py-2 rounded-md">Thêm vào giỏ hàng</button>}
                        </div>
                        <div className="flex flex-col pt-3">
                            {listComment.map((comment) => (
                                <div key={comment.commentId} className='flex justify-between items-start'>
                                    <div>
                                        <p className="font-semibold text-base">{comment.accountName}</p>
                                        <p className="font-light text-xs text-gray-700">{comment.createDateTime}</p>
                                        <p className="bg-gray-200 p-2 rounded-lg">{comment.content}</p>
                                    </div>
                                    {comment.isCommentByAccount && (
                                        <button onClick={() => handleDeleteComment(comment.commentId)} className='text-red-500'>Delete</button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    {localStorage.getItem("token") && (
                        <form className="sticky bottom-0 bg-white pt-3 pr-3 pl-3" onSubmit={handleSubitComment}>
                            <input type="text" placeholder="Viết bình luận" className="w-full p-2 rounded-md shadow-lg bg-slate-200" onChange={(e) => setNewComment(e.target.value)} />
                            <button className="w-full py-2 rounded-md" type="submit">Gửi</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}