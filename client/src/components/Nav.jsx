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

export const Nav = () => {

  const handleLogOut = () => {
    
  }

  return (
    <Navbar classNames={ {
      base: cn("bg-primaryGreen p-0 justify-around")
    }}>
      <NavbarBrand className="text-center">
        <h1 className="text-2xl md:text-4xl font-semibold tracking-wider p-2 ml-0">DUPLIFY</h1>
      </NavbarBrand>
      <NavbarContent>
      <NavbarItem>
        <Button className="rounded-md text-white bg-transparent hover:bg-primaryPurple text-xl uppercase font-semibold">Guide</Button>
      </NavbarItem>
      <NavbarItem>
        <Button onClick={() => handleLogOut()}
        className="rounded-md text-white bg-transparent hover:bg-primaryPurple text-xl uppercase font-semibold">Logout</Button>
      </NavbarItem>

      </NavbarContent>
    </Navbar>
  )
}