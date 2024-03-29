'use client';
import { useState } from 'react';
import PosterArtwork from "../PosterArtwork/PosterArtwork";
import PopupComment from '../PopupComment/PopupComment';
import Login from '../Login/Login';
import ListAllArtwork from '../ListAllArtwork/ListAllArtwork';

export default function BodyHomePage() {
    const [isTabArtwork, setIsTabArtwork] = useState(false);
    const [isTabPost, setIsTabPost] = useState(true);
    const [showCommentPopup, setShowCommentPopup] = useState(false);
    const [postId, setPostId] = useState<string>();
    const handleCommentButtonClick = (postId: string) => {
        setPostId(postId);
        setShowCommentPopup(true);
    };


    return (
        <div className="flex flex-col items-center pl-10 pr-10">
            <div className='w-full flex flex-row'>
                <button className={`px-4 w-1/2 py-2 m-2 rounded-xl text-white ${isTabPost ? 'bg-green-500' : 'bg-blue-500'}`} onClick={() => { setIsTabPost(true); setIsTabArtwork(false); }}>Post</button>
                <button className={`px-4 w-1/2 py-2 m-2 rounded-xl text-white ${isTabArtwork ? 'bg-green-500' : 'bg-blue-500'}`} onClick={() => { setIsTabPost(false); setIsTabArtwork(true); }}>Artwork</button>
            </div>
            {isTabPost && (
                <>
                    <PosterArtwork onCommentButtonClick={handleCommentButtonClick} />
                    {postId && showCommentPopup && (
                        <PopupComment setShowCommentPopup={setShowCommentPopup} postId={postId} />
                    )}
                </>
            )}
            {isTabArtwork && (
                <div>
                    <div className="bg-white pt-5 mt-5 pl-5 pr-5 space-y-5 rounded-xl shadow-xl pb-5 mb-5 flex flex-col">
                        <ListAllArtwork />
                    </div>
                </div>
            )}
        </div>
    )
}
