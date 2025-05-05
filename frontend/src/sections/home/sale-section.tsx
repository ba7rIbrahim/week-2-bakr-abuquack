import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const SaleSection = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap w-full ">
      <div className="flex-1/2 max-h-full">
        <img
          src="/images/saleImage.png"
          alt="sale image"
          className="w-full h-full"
        />
      </div>
      <div className="max-h-full bg-gray-100 p-8 flex flex-col justify-center flex-wrap flex-1/2">
        <span className="text-blue-500 font-medium mb-2">
          SALE UP TO 35% OFF
        </span>
        <div className="flex flex-col gap-4 md:gap-6">
          <h1 className="text-h1 text-3xl md:text-5xl">
            HUNDREDS of New lower prices!
          </h1>
          <p className="text-p">
            It's more affordable than ever to give every room in your home a
            stylish makeover
          </p>
          <Link to="/" className="text-link flex items-center gap-2">
            <span>Shop Now</span>
            <ArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};
