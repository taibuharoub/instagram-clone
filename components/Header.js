import Image from "next/image";
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { signIn, signOut, useSession } from "next-auth/react";

function Header() {
  const { data: session, status } = useSession();
  console.log(status);
  return (
    <header className="shadow-md border-b bg-white sticky top-0 z-50">
      <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
        {/* left side  */}
        {/* when using fill, make the parnet container relative */}
        <div className="relative hidden lg:inline-grid w-24 cursor-pointer">
          <Image
            src="https://links.papareact.com/ocw"
            layout="fill"
            alt="main-logo"
            objectFit="contain" // prevents image from being stretched
          />
        </div>

        {/* will do the opposite of the above */}
        {/* flex-shrink-0 => don't make the smaller as the screen shrinks keep it at specified size */}
        <div className="relative w-10 lg:hidden flex-shrink-0 cursor-pointer">
          <Image
            src="https://links.papareact.com/jjm"
            layout="fill"
            alt="main-logo"
            objectFit="contain" // prevents image from being stretched
          />
        </div>

        {/* middle side- search input field */}
        <div className="max-w-xs">
          <div className="mt-1 relative p-3 rounded-md">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
              {/* will hold our search icon */}
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300
                focus:ring-black focus:border-black rounded-md"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>

        {/* right side */}
        <div className="flex items-center justify-end space-x-4">
          <HomeIcon className="nav-btn" />
          <MenuIcon className="h-10 md:hidden cursor-pointer" />

          {session ? (
            <>
              <div className="relative nav-btn">
                <PaperAirplaneIcon className="nav-btn rotate-45" />
                <div
                  className="absolute -top-1 -right-2 text-xs w-5 h-5
            bg-red-500 rounded-full flex justify-center items-center animate-pulse text-white"
                >
                  3
                </div>
              </div>
              <PlusCircleIcon className="nav-btn" />
              <UserGroupIcon className="nav-btn" />
              <HeartIcon className="nav-btn" />
              <img
                onClick={signOut}
                src={session.user?.image}
                alt=""
                loading="lazy"
                className="h-10 w-10 rounded-full cursor-pointer"
              />{" "}
            </>
          ) : (
            <button onClick={signIn}>Sign In</button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
