import { useCallback, useState } from "react";
import {
  FlyoutCard,
  FlyoutMenu,
  HeaderLogo,
  NavItems,
  UserAction,
} from "@components/features/header";

export const Header = () => {
  const [isFlyoutMenuOpen, setIsFlyoutMenuOpen] = useState(false);
  const [isFlyoutCardOpen, setIsFlyoutCardOpen] = useState(false);

  const toggleFlyoutMenu = useCallback(() => {
    setIsFlyoutMenuOpen((prev) => !prev);
  }, []);

  const toggleFlyoutCard = useCallback(() => {
    setIsFlyoutCardOpen((prev) => !prev);
  }, []);

  return (
    <header className="container flex items-center justify-between px-10 py-4">
      <HeaderLogo onClose={toggleFlyoutMenu} />
      <nav className="hidden md:flex items-center gap-6">
        <NavItems />
      </nav>
      <UserAction closeFlyoutCard={toggleFlyoutCard} />

      {isFlyoutMenuOpen && <FlyoutMenu onClose={toggleFlyoutMenu} />}
      {isFlyoutCardOpen && <FlyoutCard onClose={toggleFlyoutCard} />}
    </header>
  );
};
