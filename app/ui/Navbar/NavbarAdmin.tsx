import Link from "next/link";
import Image from "next/image";
import CreatePost from "@/public/create-note-svgrepo-com.svg";

export default function NavbarAdmin() {
    return (
        <div>
            <Link href="/admin">
                Nhiều chức năng khác
            </Link>
        </div>
    )
}