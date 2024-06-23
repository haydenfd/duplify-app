import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Link,
  Button,
  cn,
  NavbarItem,
} from "@nextui-org/react";
import { useLocation } from "react-router-dom";

export const Nav = () => {
  const location = useLocation();

  const signOut = () => {
    localStorage.removeItem("duplify_token");
    window.location.href = "/";
  };

  return (
    <Navbar
      classNames={{
        base: cn("bg-primaryGreen p-0 max-w-[100%]"),
        wrapper: cn("max-w-[100%]"),
      }}
      position="static"
    >
      <NavbarBrand className="text-center ">
        <h1 className="text-2xl md:text-4xl font-semibold tracking-wider p-3 ml-0 mr-0">
          DUPLIFY
        </h1>
      </NavbarBrand>

      <NavbarContent className="self-end" justify="center">
        <NavbarItem>
          {location.pathname === "/home" ? (
            <Link
              href="/guide"
              className="rounded-md text-white bg-transparent hover:bg-primaryPurple"
            >
              <Button className="bg-transparent text-white text-xl uppercase font-semibold">
                Guide
              </Button>
            </Link>
          ) : (
            <Link
              href="/home"
              className="rounded-md text-white bg-transparent hover:bg-primaryPurple"
            >
              <Button className="bg-transparent text-white text-xl uppercase font-semibold">
                Home
              </Button>
            </Link>
          )}
        </NavbarItem>

        <NavbarItem>
          <Link
            href="/"
            className="rounded-md text-white bg-transparent hover:bg-primaryPurple"
          >
            <Button
              onClick={() => signOut()}
              className="rounded-md text-white bg-transparent hover:bg-primaryPurple text-xl uppercase font-semibold"
            >
              Logout
            </Button>
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
