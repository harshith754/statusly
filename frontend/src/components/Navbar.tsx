import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();
  return (
    <header className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-950">
      <div className="font-bold text-xl text-zinc-100">Statusly</div>
      <nav className="flex gap-4">
        <SignedIn>
          <Link
            to={`/settings`}
            className={`px-3 py-1 rounded transition-colors ${
              location.pathname.startsWith("/settings")
                ? "bg-zinc-800 text-white"
                : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
            }`}
          >
            Settings
          </Link>
        </SignedIn>
      </nav>
      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
};

export default Navbar;
