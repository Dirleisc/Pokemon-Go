import { Logo, Moon, Sun } from "./Icons";
import "./Navbar.css";

const NavBar = () => {
  return (
    <nav>
      <Logo />
      <div className="switch">
        <Sun />
        <label>
          <input type="checkbox" className="check-switch" hidden />
          <span className="slider"></span>
        </label>
        <Moon />
      </div>
    </nav>
  );
};

export default NavBar;
