import { Avatar, Dropdown, Navbar, TextInput } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const isActive = [
    location.pathname === "/",
    location.pathname === "/about",
    location.pathname === "/projects",
  ];

  return (
    <Navbar className="border-b-2" fluid rounded>
      <Navbar.Brand href="http://localhost:5173/">
        <img
          src="../../public/favicons/android-chrome-192x192.png"
          className="mr-3 h-6 sm:h-9"
          alt="Kurt's Blog Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Flowbite React
        </span>
      </Navbar.Brand>
      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          className="hidden md:block w-64"
          rightIcon={AiOutlineSearch}
        />
      </form>
      <UserPlace />
      <Navbar.Collapse>
        <Navbar.Link active={isActive[0]}>
          <Link to="/"> Home </Link>
        </Navbar.Link>
        <Navbar.Link active={isActive[1]}>
          <Link to="/about"> About </Link>
        </Navbar.Link>
        <Navbar.Link active={isActive[2]}>
          <Link to="/projects"> Projects </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;

function UserPlace() {
  return (
    <div className="flex md:order-2">
      <Dropdown
        arrowIcon={false}
        inline
        label={
          <Avatar
            alt="User settings"
            img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            rounded
          />
        }
      >
        <Dropdown.Header>
          <span className="block text-sm">Bonnie Green</span>
          <span className="block truncate text-sm font-medium">
            name@flowbite.com
          </span>
        </Dropdown.Header>
        <Dropdown.Item>Dashboard</Dropdown.Item>
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Item>Earnings</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>Sign out</Dropdown.Item>
      </Dropdown>
      <Navbar.Toggle />
    </div>
  );
}
