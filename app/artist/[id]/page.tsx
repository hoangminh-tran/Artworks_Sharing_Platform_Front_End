import GetArtist from "@/app/ui/GetArtist/GetArtist";
import GetListArtworkByCreatorId from "@/app/ui/GetListArtistByCreatorId/GetListArtistByCreatorId";
import Navbar from "@/app/ui/Navbar/Navbar";

export default function Page({ params }: { params: { id: string } }) {
    return (
        <div className="">
            <Navbar />
            <div className="pt-10">
                <div className="flex flex-col">
                    <GetArtist artistId={params.id} />
                    <GetListArtworkByCreatorId artistId={params.id} />
                </div>
            </div>
        </div>
    )
}