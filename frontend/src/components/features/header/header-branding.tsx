import { MenuIcon } from "lucide-react";

export const HeaderLogo = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="flex gap-2 items-center">
      <button onClick={onClose} className="cursor-pointer">
        <MenuIcon className="md:hidden" strokeWidth={1} />
      </button>
      <span className="text-primary font-semibold text-xl">3elgant.</span>
    </div>
  );
};
