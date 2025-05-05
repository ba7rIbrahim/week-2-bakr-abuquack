import { motion } from "motion/react";
import { X } from "lucide-react";
import { Button } from "@components/ui";
import { Link } from "react-router-dom";

import { CardButtons, Logo, SearchInput } from "@components/shared";
import { navigationLinks } from "src/config/navigation";

const menuVariants = {
  open: { x: 0 },
  closed: { x: "-100%" },
};

export const FlyoutMenu = ({ onClose }: { onClose: () => void }) => {
  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/60" onClick={onClose}></div>

      <motion.div
        variants={menuVariants}
        initial="closed"
        animate="open"
        exit="closed"
        className="fixed top-0 left-0 bg-white h-screen min-w-5/6 z-50 p-4 shadow-xl"
      >
        <div className="flex flex-col justify-between h-full">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <Logo />
              <button
                className="cursor-pointer p-2 hover:bg-gray-100 rounded-full"
                onClick={onClose}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <SearchInput />

            <nav className="space-y-2 mt-8">
              {navigationLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block p-2 hover:bg-gray-50 text-lg border-b rounded-md border-border"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <div className="space-y-2">
              <CardButtons />
            </div>
            <Button className="w-full mt-4">
              <Link to="/auth/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </>
  );
};
