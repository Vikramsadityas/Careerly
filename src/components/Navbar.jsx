import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button} from "@nextui-org/react";
import { Link } from "react-router-dom";

export default function NavbarComp() {
  const isAuthenticated = true;
  const logout = () => {
    // logout logic here
  };
  return (
    <Navbar position="static" className="mb-10 backdrop-blur-md bg-gray-200 bg-opacity-30 border border-gray-300 rounded-md">
      <NavbarBrand>
        <p className="font-bold text-3xl text-inherit cursor-pointer">CAREERLY</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" to="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link to="/jobs" aria-current="/jobs">
            Jobs
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" to="/messages">
            Interactions
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        { (isAuthenticated)?(<NavbarItem className="hidden lg:flex">
          <Link to="/logout">logout {onclick=>(logout())}</Link>
        </NavbarItem>
        ):(<><NavbarItem className="hidden lg:flex">
          <Link to="/login">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" to="/signup" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
        </>)
        
        }
      </NavbarContent>
    </Navbar>
  );
}