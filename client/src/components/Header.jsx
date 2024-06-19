import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";

const userData = {
  userName: "Kurt Zhang",
  email: "example@email.com",
  profilePicture: "/user/profile.jpg",
};

function Header() {
  const path = useLocation().pathname;

  const [isSignedIn, setIsSignedIn] = useState(false);
  const handleSignIN = () => setIsSignedIn(!isSignedIn);

  return (
    <Navbar className="border-b-2" fluid rounded>
      <div className="flex items-center">
        <Toggle />
        <Logo />
      </div>
      <SeachBar />
      {isSignedIn ? (
        <UserMenu userData={userData} />
      ) : (
        <SignINBtn handleSignIN={handleSignIN} />
      )}
      <MenuBar path={path} />
    </Navbar>
  );
}

export default Header;

function Toggle() {
  return (
    <div className="lg:hidden md:hidden">
      <Navbar.Toggle />
    </div>
  );
}

function Logo() {
  return (
    <Navbar.Brand href="http://localhost:5173/">
      <img
        src="/favicons/android-chrome-192x192.png"
        className="mr-1 h-8 sm:h-10"
        alt="Kurt's Blog Logo"
      />
      <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
        Kurt&apos;s Blog
      </span>
    </Navbar.Brand>
  );
}

function SeachBar() {
  return (
    <>
      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          className="hidden lg:block md:block w-64"
          rightIcon={AiOutlineSearch}
        />
      </form>

      <Button className="w-10 h-10 lg:hidden md:hidden" color="gray">
        <AiOutlineSearch className="w-5 h-5" />
      </Button>
    </>
  );
}

function MenuBar({ path }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  const isNotSm = !(windowWidth <= 768);

  return (
    <Navbar.Collapse>
      <Navbar.Link active={path === "/"}>
        <Link to="/"> Home </Link>
      </Navbar.Link>
      <Navbar.Link active={path === "/about"}>
        <Link to="/about"> About </Link>
      </Navbar.Link>
      <Navbar.Link active={path === "/projects"}>
        <Link to="/projects"> Projects </Link>
      </Navbar.Link>
      {isNotSm && <ThemeSwitch />}
    </Navbar.Collapse>
  );
}

function ThemeSwitch() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <Navbar.Link>
      <button>
        <a onClick={() => setIsDarkMode(!isDarkMode)}>
          {isDarkMode ? (
            <MdOutlineDarkMode className="w-5 h-5 " />
          ) : (
            <MdOutlineLightMode className="w-5 h-5" />
          )}
        </a>
      </button>
    </Navbar.Link>
  );
}

function SignINBtn({ handleSignIN }) {
  return (
    <div className="d-md-block">
      <Button onClick={handleSignIN} pill>
        登录
      </Button>
    </div>
  );
}

function UserMenu({ userData }) {
  return (
    <div className="flex md:order-2 d-md-block">
      <Dropdown
        arrowIcon={false}
        inline
        label={
          <Avatar alt="User settings" img={userData.profilePicture} rounded />
        }
      >
        <Dropdown.Header>
          <span className="block text-sm">{userData.userName}</span>
          <span className="block truncate text-sm font-medium">
            {userData.email}
          </span>
        </Dropdown.Header>
        <Dropdown.Item>
          <Link to="/dashboard">Dashboard</Link>
        </Dropdown.Item>
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Item>Earnings</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>Sign out</Dropdown.Item>
      </Dropdown>
    </div>
  );
}
