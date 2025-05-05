import { CardButton } from "@assets/svg";

export const CardButtons = () => {
  return (
    <>
      <div className="flex justify-between items-center border-b border-border text-gray p-2 hover:bg-gray-100 cursor-pointer rounded-md">
        <span className="text-gray-600">Cart</span>
        <CardButton />
      </div>
      <div className="flex justify-between items-center border-b border-border text-gray p-2 hover:bg-gray-100 cursor-pointer rounded-md">
        <span className="text-gray-600">Wishlist</span>
        <CardButton />
      </div>
    </>
  );
};
