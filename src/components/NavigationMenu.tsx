import { NavLink, Link } from 'react-router-dom';
import { useState } from 'react';
import '../styles/main.scss';

const NavigationMenu = ({ darkModeToggle, darkMode }: { darkModeToggle: () => void, darkMode: boolean }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const toggleMobile = () => setIsMobileOpen(!isMobileOpen);
    const closeMobile = () => setIsMobileOpen(false);

    return (
        <header className={`header-menu ${darkMode ? 'theme-dark' : 'theme-light'}`}>
            <nav className="nav-container">
                <div className="nav-wrapper">
                    <Link 
                        to="/" 
                        className="logo"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={closeMobile}
                    >
                        <span className="logo-vector-text">
                            {isHovered ? <>V&Sigma;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</> : <>V&Sigma;CTOR &sigma;</>}
                        </span>
                    </Link>

                    <div className={`nav-overlay ${isMobileOpen ? 'open' : ''}`} onClick={closeMobile}></div>

                    <ul className={`nav-links ${isMobileOpen ? 'mobile-open' : ''}`}>
                        <button className="mobile-close-btn" onClick={closeMobile} aria-label="Close menu">
                            <i className="fas fa-times"></i>
                        </button>
                        
                        <li><NavLink to="documentation" onClick={closeMobile}>Documentation</NavLink></li>
                        <li><NavLink to="components" onClick={closeMobile}>Components</NavLink></li>
                        <li><NavLink to="showcase" onClick={closeMobile}>Showcase</NavLink></li>
                        <li><NavLink to="integrations" onClick={closeMobile}>Integrations</NavLink></li>
                        
                        <li className="nav-actions">
                            <a href='https://github.com/emeraldemperaur/vector-sigma' target='_blank' rel="noreferrer" className="action-link">
                                <i className="fa-brands fa-github"></i>
                            </a>
                            <button onClick={() => { darkModeToggle(); closeMobile(); }} className="action-btn theme-toggle">
                                <i className={darkMode ? 'fa-regular fa-lightbulb' : 'fa-regular fa-moon'}></i>
                            </button>
                        </li>
                    </ul>

                    <button className="mobile-menu-btn" onClick={toggleMobile} aria-label="Open menu">
                        <i className="fas fa-bars"></i>
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default NavigationMenu;