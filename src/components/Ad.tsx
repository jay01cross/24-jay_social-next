import Image from "next/image";
import Link from "next/link";

const Ad = ({ size }: { size: "sm" | "md" | "lg" }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm">
      {/* TOP */}
      <div className="flex items-center justify-between text-gray-500 font-medium">
        <span>Sponsored Ads</span>
        <Image src="/more.png" alt="more" width={16} height={16} />
      </div>

      {/* BOTTOM */}
      <div
        className={`flex flex-col mt-4 ${size === "sm" ? "gap-2" : "gap-4"}`}
      >
        <div
          className={`relative w-full ${
            size === "sm" ? "h-24" : size === "md" ? "h-36" : "h-48"
          }`}
        >
          <Image
            src="https://images.pexels.com/photos/18322084/pexels-photo-18322084/free-photo-of-flowers-on-a-notebook.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <div className="flex items-center gap-4">
          <Image
            src="https://images.pexels.com/photos/27739835/pexels-photo-27739835/free-photo-of-let-me-hear-you.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            width={24}
            height={24}
            className="rounded-lg w-6 h-6 object-cover"
          />
          <span className="text-blue-500 font-medium">BigChef Lounge</span>
        </div>
        <p className={size === "sm" ? "text-xs" : "text-sm"}>
          {size === "sm"
            ? "Enim velit exercitation laborum exercitation incididunt labore Lorem non deserunt ex eiusmod ad id aute."
            : size === "md"
            ? "Enim velit exercitation laborum exercitation incididunt labore Lorem non deserunt ex eiusmod ad id aute. Sint elit enim culpa reprehenderitoccaecat. Irure et pariatur Lorem sunt aute non deserunt sit."
            : "Enim velit exercitation laborum exercitation incididunt labore Lorem non deserunt ex eiusmod ad id aute. Sint elit enim culpa reprehenderit occaecat. Irure et pariatur Lorem sunt aute non deserunt sit. Proident est Lorem commodo proident sunt voluptate ea exercitation adipisicing ullamco officia sint dolor aliqua."}
        </p>
        <button className="bg-gray-200 text-gray-500 p-2 text-xs rounded-lg">
          Learn more
        </button>
      </div>
    </div>
  );
};

export default Ad;
