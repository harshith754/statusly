import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Settings, BarChart3 } from "lucide-react";

const Navbar: React.FC = () => {
  const location = useLocation();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/50">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-800 group-hover:bg-zinc-700 transition-colors">
            <BarChart3 className="h-4 w-4 text-zinc-300" />
          </div>
          <span className="font-semibold text-xl text-zinc-100 group-hover:text-white transition-colors">
            Statusly
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center space-x-1">
          <SignedIn>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className={`relative text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800/50 ${
                location.pathname.startsWith("/settings")
                  ? "bg-zinc-800 text-zinc-100"
                  : ""
              }`}
            >
              <Link to="/settings" className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Settings</span>
              </Link>
            </Button>
          </SignedIn>
        </nav>

        {/* Auth Section */}
        <div className="flex items-center">
          <SignedOut>
            <Button
              variant="outline"
              size="sm"
              className="border-zinc-700 bg-zinc-900 text-zinc-100 hover:bg-zinc-800 hover:text-white"
            >
              <SignInButton />
            </Button>
          </SignedOut>
          <SignedIn>
            <div className="flex items-center space-x-2">
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8 rounded-full ring-2 ring-zinc-700 hover:ring-zinc-600 transition-all",
                    userButtonPopoverCard: "bg-zinc-900 border-zinc-700",
                    userButtonPopoverActionButton: "text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800",
                  }
                }}
              />
            </div>
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default Navbar;