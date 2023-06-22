import { Link } from "react-router-dom";

import React, { useEffect, useState } from "react";
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

function AdminNavbar() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <CNavbar expand="lg" colorScheme="light" className="bg-light">
        <CContainer fluid>
          <CNavbarBrand href="/admin/openBookings">Admin</CNavbarBrand>
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
              <CNavItem>
                <CNavLink href="/admin/openBookings" active>
                  Open-Bookings
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="/admin/contacts" active>
                  Open Contact Requests
                </CNavLink>
              </CNavItem>

              <CNavItem></CNavItem>
            </CNavbarNav>
          </CCollapse>
        </CContainer>
      </CNavbar>
    </>
  );
}

export default AdminNavbar;
