import { Fragment, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const router = useRouter();
  const { isLoggedIn, role } = useAuth();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/best-deals" },
    { name: "Contact Us", href: "/contact" },
  ];

  const handleAuthClick = () => {
    if (isLoggedIn) {
      router.push("/logout");
    } else {
      router.push("/login");
    }
  };

  return (
    <header className="bg-white shadow">
      <nav className="mx-auto md:px-14" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-lg font-bold text-gray-900">
              TrackKart
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex lg:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-md font-medium text-gray-700 hover:text-gray-900 hover:font-bold"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Login/Logout */}
          <div className="relative flex items-center space-x-4">
            {role === "admin" && (
              <Link
                href="/admin"
                className="absolute top-[1px] right-25 px-3 py-1.5 rounded-md whitespace-nowrap text-sm font-medium bg-red-600 hover:text-red-800 hover:font-bold"
              >
                Admin Dashboard
              </Link>
            )}
            <button
              onClick={handleAuthClick}
              className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700 cursor-pointer"
            >
              {isLoggedIn ? "Logout" : "Login"}
            </button>

            {/* Mobile Menu */}
            <Popover className="lg:hidden">
              {({ open }) => (
                <>
                  <Popover.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none">
                    <span className="sr-only">Open menu</span>
                    {open ? (
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    )}
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Popover.Panel className="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition lg:hidden">
                      <div className="rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="flex items-center justify-between px-5 pt-4">
                          <Link
                            href="/"
                            className="text-lg font-bold text-gray-900"
                          >
                            TrackKart
                          </Link>
                          <Popover.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none">
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </Popover.Button>
                        </div>
                        <div className="space-y-1 px-5 pb-4">
                          {navigation.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="block rounded-md py-2 px-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            >
                              {item.name}
                            </Link>
                          ))}
                          {role === "admin" && (
                            <Link
                              href="/admin"
                              className="block rounded-md py-2 px-3 text-base font-medium text-red-600 hover:bg-red-700 hover:text-white"
                            >
                              Admin Dashboard
                            </Link>
                          )}
                          <button
                            onClick={handleAuthClick}
                            className="mt-2 w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700"
                          >
                            {isLoggedIn ? "Logout" : "Login"}
                          </button>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </div>
        </div>
      </nav>

      <div className="mx-auto w-[93vw] border-t border-gray-300"></div>
    </header>
  );
};

export default Navbar;
