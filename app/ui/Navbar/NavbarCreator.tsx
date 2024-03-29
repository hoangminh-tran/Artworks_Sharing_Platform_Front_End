import Link from "next/link";
import Image from "next/image";
import CreatePost from "@/public/create-note-svgrepo-com.svg";

export default function NavbarCreator() {
    return (
        <div>            
            <Link href="/creator">
                Nhiều chức năng khác
            </Link>
        </div>
    )
}