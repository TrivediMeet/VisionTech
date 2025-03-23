
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface NavLinkProps {
  isActive: boolean;
}

const getNavLinkClass = ({ isActive }: NavLinkProps) => {
  return `px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50 ${
    isActive ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50" : "text-gray-700 dark:text-gray-400"
  }`;
};

export const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700 fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <NavLink to="/" className="font-bold text-xl text-gray-800 dark:text-gray-50">
                AgriChain
              </NavLink>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink to="/marketplace" className={getNavLinkClass}>
                  Marketplace
                </NavLink>
                <NavLink to="/farmers" className={getNavLinkClass}>
                  Farmers
                </NavLink>
                <NavLink to="/community" className={getNavLinkClass}>
                  Community
                </NavLink>
                <NavLink to="/sustainability" className={getNavLinkClass}>
                  Sustainability
                </NavLink>
                <NavLink to="/equipment-sharing" className={getNavLinkClass}>
                  Equipment Sharing
                </NavLink>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.photo || ""} alt={user.name || "Avatar"} />
                      <AvatarFallback>{user.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/cart')}>
                    Cart
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-4">
                <NavLink to="/login" className={getNavLinkClass}>
                  Login
                </NavLink>
                <NavLink to="/signup" className={getNavLinkClass}>
                  Sign Up
                </NavLink>
              </div>
            )}
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="bg-white dark:bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavLink to="/marketplace" className={({ isActive }) => getNavLinkClass({ isActive })}>
            Marketplace
          </NavLink>
          <NavLink to="/farmers" className={({ isActive }) => getNavLinkClass({ isActive })}>
            Farmers
          </NavLink>
          <NavLink to="/community" className={({ isActive }) => getNavLinkClass({ isActive })}>
            Community
          </NavLink>
          <NavLink to="/sustainability" className={({ isActive }) => getNavLinkClass({ isActive })}>
            Sustainability
          </NavLink>
          <NavLink to="/equipment-sharing" className={({ isActive }) => getNavLinkClass({ isActive })}>
            Equipment Sharing
          </NavLink>
        </div>
        {user ? (
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.photo || ""} alt={user.name || "Avatar"} />
                  <AvatarFallback>{user.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                </Avatar>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800 dark:text-gray-50">{user.name}</div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{user.email}</div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <NavLink
                to="/profile"
                className={({ isActive }) => getNavLinkClass({ isActive })}
              >
                Profile
              </NavLink>
              <NavLink
                to="/cart"
                className={({ isActive }) => getNavLinkClass({ isActive })}
              >
                Cart
              </NavLink>
              <button
                onClick={handleLogout}
                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Log out
              </button>
            </div>
          </div>
        ) : (
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/login" className={({ isActive }) => getNavLinkClass({ isActive })}>
              Login
            </NavLink>
            <NavLink to="/signup" className={({ isActive }) => getNavLinkClass({ isActive })}>
              Sign Up
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};
