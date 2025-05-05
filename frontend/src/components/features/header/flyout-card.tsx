import { motion } from "motion/react";
import { Button } from "@components/ui";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const menuVariants = {
  open: { x: 0 },
  closed: { x: "100%" },
};

export const FlyoutCard = ({ onClose }: { onClose: () => void }) => {
  return (
    <>
      <div
        className="bg-black/60 w-full h-full z-50 fixed left-0 top-0"
        onClick={onClose}
      ></div>
      <motion.div
        variants={menuVariants}
        initial="closed"
        animate="open"
        exit="closed"
        className="fixed bg-white top-0 right-0 w-0 h-screen min-w-5/6 md:min-w-2/5 z-50 p-4 shadow-xl"
      >
        <div className="flex flex-col justify-between h-full">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="text-xl font-semibold">Card</div>
              <button
                className="p-2 hover:bg-gray-100 rounded-full"
                onClick={onClose}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="w-full space-y-2 divide-y divide-border">
              <div className="flex justify-between pb-2">
                <span>Subtotal</span>
                <span>$99.00</span>
              </div>
              <div className=" flex justify-between pb-2">
                <span className="text-xl font-medium">Total</span>
                <span className="text-xl font-medium">$234.99</span>
              </div>
            </div>
            <Button className="w-full">
              <Link to="/checkout">Checkout</Link>
            </Button>
            <Link
              to="/carts"
              className="text-primary font-semibold border-b text-center"
            >
              View Cart
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
};
