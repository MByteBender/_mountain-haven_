import { Link } from "react-router-dom";

import React, { useState } from "react";
import {
  CNavbar,
  CContainer,
  CNavbarBrand,
  CCollapse,
  CNavbarToggler,
  CNavbarNav,
  CNavItem,
  CNavLink,
  CDropdown,
  CDropdownToggle,
  CDropdownItem,
  CDropdownDivider,
  CDropdownMenu,
} from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import NavItem from "./NavItem";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <CNavbar expand="lg" colorScheme="light" className="bg-light">
        <CContainer fluid>
          <CNavbarBrand href="/">Mountain Haven</CNavbarBrand>
          <CNavbarToggler
            aria-label="Toggle navigation"
            aria-expanded={visible}
            onClick={() => setVisible(!visible)}
          />
          <CCollapse className="navbar-collapse" visible={visible}>
            <CNavbarNav>
              <CNavItem>
                <CNavLink href="/" active>
                  Home
                </CNavLink>
              </CNavItem>
              <CDropdown variant="nav-item" popper={false}>
                <CDropdownToggle color="secondary">Apartments </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem href="/apartment1">Apartment 1</CDropdownItem>
                  <CDropdownItem href="#">Apartment 2</CDropdownItem>
                  <CDropdownDivider />
                  <CDropdownItem href="#">Something else here</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>

              <CNavItem>
                <CNavLink href="/register">Register/Login</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="/openBookings">Open Bookings</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="/blogs">Blogs</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="/impressum">Impressum</CNavLink>
              </CNavItem>
            </CNavbarNav>
          </CCollapse>
        </CContainer>
      </CNavbar>
    </>
  );
};

export default Navbar;
