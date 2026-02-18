// src/components/layout/Header.jsx

import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/LOGO.png';
import './header.css';

const menuItems = [
  { label: 'About Us', path: '/about' },
  { label: 'Code Insight', path: '/code-insight' },
  {
    label: 'More',
    path: null,
    dropdown: [
      { label: 'Sub Menu 1', path: '/more/sub1' },
      { label: 'Sub Menu 2', path: '/more/sub2' },
      { label: 'Sub Menu 3', path: '/more/sub3' },
    ],
  },
];

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleDropdownClose = () => {
    setDropdownOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <NavLink to="/" className="header-logo">
          <img src={logo} alt="RE:FACTORY Logo" />
        </NavLink>

        <nav className="header-nav">
          <ul className="nav-menu">
            {menuItems.map((item) =>
              item.dropdown ? (
                <li
                  key={item.label}
                  className="nav-item has-dropdown"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={handleDropdownClose}
                >
                  <button
                    className={`nav-link dropdown-toggle ${dropdownOpen ? 'active' : ''}`}
                    onClick={handleDropdownToggle}
                  >
                    {item.label}
                    <span className="dropdown-arrow">▼</span>
                  </button>
                  {dropdownOpen && (
                    <ul className="dropdown-menu">
                      {item.dropdown.map((subItem) => (
                        <li key={subItem.path}>
                          <NavLink
                            to={subItem.path}
                            className={({ isActive }) =>
                              `dropdown-link ${isActive ? 'active' : ''}`
                            }
                            onClick={handleDropdownClose}
                          >
                            {subItem.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={item.path} className="nav-item">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `nav-link ${isActive ? 'active' : ''}`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              )
            )}
            <li className="nav-item">
              <NavLink to="/login" className="nav-link login-btn">
                LOGIN
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
