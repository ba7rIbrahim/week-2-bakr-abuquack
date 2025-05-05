import { CardButton, Search } from "@assets/svg";
import { UserAccount } from "./user-account";

export const UserAction = ({
  closeFlyoutCard,
}: {
  closeFlyoutCard: () => void;
}) => {
  console.log(closeFlyoutCard());

  return (
    <div className="flex gap-2">
      <UserAccount />
      <Search className="hidden md:block" />
      <button onClick={closeFlyoutCard}>
        <CardButton />
      </button>
    </div>
  );
};
