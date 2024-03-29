import BodyHomePage from "./ui/BodyHomePage/BodyHomePage";
import Navbar from "./ui/Navbar/Navbar";

export default function Home() {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <div className="">
        <BodyHomePage />
      </div>
    </div>
  );
}