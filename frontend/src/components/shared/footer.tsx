import { NavItems } from "@components/features/header";
import { Facebook, Instagram, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="text-center bg-primary py-10 text-white">
      <div className="container flex flex-col items-center gap-12">
        <div className="flex flex-col md:flex-row md:justify-between items-center gap-8 md:gap-0 w-full">
          <div className="flex flex-col md:flex-row items-center gap-4 divide-y md:divide-y-0 md:divide-x divide-gray ">
            <div className="text-xl font-semibold w-fit mx-auto pb-2 md:pb-0 md:pr-8">
              3elgant.
            </div>
            <h3 className="text-xl text-[#E8ECEF] min-w-3xs">
              Gift & Decoration Store
            </h3>
          </div>
          <div className="flex flex-col md:flex-row justify-end items-center gap-6 w-full">
            <NavItems />
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 w-full border-t border-gray pt-8">
          <div>
            <p className="text-sm text-[#E8ECEF]">
              Made With Abu Quack 🦆 & Abu Saleh 🫒
            </p>
          </div>
          <div className="flex gap-4">
            <Facebook />
            <Instagram />
            <Linkedin />
          </div>
        </div>
      </div>
    </footer>
  );
};
