import Login from "../ui/Login/Login";
import Image from "next/image";
import Logo from "../../public/next.svg";
import Link from "next/link";

export default function Page() {
    return (
        <div className="flex flex-row w-full space-x-5 h-screen">
            <div className="w-1/2 space-y-10 pt-32 pl-10 pr-10">
                <Link href="/">
                    <Image src={Logo} alt="logo" width={100} height={75} />
                </Link>
                <div className="">
                    <p className="font-semibold text-3xl text-green-600">Đăng Nhập</p>
                    <div className="flex flex-row space-x-3">
                        <p className="text-gray-600">Không có tài khoản?</p>
                        <Link href="/signup" className="text-blue-700">Hãy đăng ký tại đây!</Link>
                    </div>
                </div>
                <Login />
                <Link href="/forgotPassword" className="text-blue-700">Quên mật khẩu?</Link>
            </div>
            <div className="w-1/2">
                <img src="https://source.unsplash.com/random" alt="random" className="w-full h-screen object-fill" />
            </div>
        </div>
    );
}