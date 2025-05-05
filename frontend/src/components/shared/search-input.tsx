import { Search } from "@assets/svg";
import { Input } from "@components/ui";

export const SearchInput = () => {
  return (
    <div className="flex border border-gray rounded-md h-[42px] my-4 px-2">
      <Search className="h-full" />
      <Input
        placeholder="Search"
        className="w-full border-transparent focus:border-transparent"
        containerClassName="flex-1 mb-0!"
      />
    </div>
  );
};
