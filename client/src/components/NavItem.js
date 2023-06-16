import { Link } from "react-router-dom";

const NavItem = ({ text, href, active }) => {
  return (
    <Link href={href} legacyBehavior>
      <a className={`nav__link`}>{text}</a>
    </Link>
  );
};

export default NavItem;
