import { Suspense } from "react";
import AllRooms from "../components/AllRooms";

export default function page() {
  return (
    <div className="bg-white text-black min-h-screen">
      <Suspense fallback={<div className="flex justify-center items-center px-4 md:px-16 lg:px-24 xl:px-32 pt-28 pb-16"><p>Loading Rooms...</p></div>}>
        <AllRooms />
      </Suspense>
    </div>
  );
}
