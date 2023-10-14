import { 
  Navbar, 
  NavbarBrand,
  NavbarContent,
  Link,
  Button,
  cn,
  NavbarMenu,
  NavbarMenuItem,
  NavbarItem
 } from "@nextui-org/react";
import Cookies from "js-cookie";

export const Nav = () => {

  const logout = () => {

    Cookies.remove('duplify_access_token')

  }

  return (

    <Navbar classNames={ {
      base: cn("bg-primaryGreen p-0 justify-around")
    }}>
      <NavbarBrand className="text-center bg-red-500">
        <h1 className="text-2xl md:text-4xl font-semibold tracking-wider p-3 ml-0">DUPLIFY</h1>
      </NavbarBrand>

      <NavbarContent className="bg-blue-500 self-end" justify="center">
      <NavbarItem>
        <Link href="/guide" className="rounded-md text-white bg-transparent hover:bg-primaryPurple">
        <Button className="bg-transparent text-white text-xl uppercase font-semibold">Guide</Button>
        </Link>
      </NavbarItem>

      <NavbarItem>
        <Link href="/" className="rounded-md text-white bg-transparent hover:bg-primaryPurple">
          <Button onClick={() => logout()} className="rounded-md text-white bg-transparent hover:bg-primaryPurple text-xl uppercase font-semibold">Logout</Button>
        </Link>
      </NavbarItem>

      </NavbarContent>
    </Navbar>
  )
}