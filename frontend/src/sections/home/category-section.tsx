import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const CategorySection = () => {
  return (
    <div className="my-10 grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-6">
      <div className="bg-gray-100 p-10 row-span-2 ">
        <div className="md:space-y-2 lg:space-y-1 pb-10">
          <h2 className="text-h3">Living Room</h2>
          <Link
            to="/products"
            className="w-fit underline flex items-center gap-1 text-[20px] cursor-pointer"
          >
            <span>Show Now</span>
            <ArrowRight />
          </Link>
        </div>
        <img src="/images/chair.png" className="mx-auto md:max-w-[80%]" />
      </div>
      <div className="bg-gray-100 p-10 flex justify-end relative">
        <img
          src="/images/drawer.png"
          className="w-[60%] md:w-[50%] lg:w-[60%]"
        />
        <div className="absolute bottom-0 left-5 md:space-y-2 lg:space-y-1 pb-10 md:left-8 lg:left-10">
          <h2 className="text-h3">Bedroom</h2>
          <Link
            to="/products"
            className="w-fit underline flex items-center gap-1 text-[20px] cursor-pointer"
          >
            <span>Show Now</span>
            <ArrowRight />
          </Link>
        </div>
      </div>
      <div className="bg-gray-100 p-10 flex justify-start relative">
        <div className="absolute right-5 bottom-0 md:space-y-2 lg:space-y-1 pb-10 md:right-8 lg:right-10">
          <h2 className="text-h3">Kitchen</h2>
          <Link
            to="/products"
            className="w-fit underline flex items-center gap-1 text-[20px] cursor-pointer"
          >
            <span>Show Now</span>
            <ArrowRight />
          </Link>
        </div>
        <img
          src="/images/toaster.png"
          className="w-[60%] md:w-[50%] lg:w-[60%]"
        />
      </div>
    </div>
  );
};
