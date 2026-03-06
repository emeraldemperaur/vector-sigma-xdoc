import { NavLink, useNavigate  } from 'react-router-dom';
import '../styles/main.scss';
import { useState } from 'react';

const NavigationMenu = ({darkModeToggle, darkMode} : {darkModeToggle: () => void, darkMode: boolean}) => {
    const navigator = useNavigate();
    const homeNavigator = () => { navigator('/') };
    const [logotext, setLogoText] = useState(<>V&Sigma;CTOR &sigma;</>);

    const logo = document.getElementById('vectorsigma-logo');

    if (logo) {
        logo.addEventListener('mouseover', () => {
            setLogoText(<>V&Sigma;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>)
        });
        logo.addEventListener('mouseout', () => {
            setLogoText(<>V&Sigma;CTOR &sigma;</>)
        });
    }

   

    return(
    <>
    <>
        <div className='header-menu'>
        <nav>
        <div className="wrapper">
            <div className="logo" id='vectorsigma-logo'>
                <NavLink to="/">
                 <span onClick={homeNavigator} className='logo-vector-text'>{logotext}</span>
                </NavLink>
            </div>
            <input type="radio" name="slider" id="menu-btn"/>
            <input type="radio" name="slider" id="close-btn"/>
            <ul className="nav-links">
            <label htmlFor="close-btn" className="btn close-btn"><i className="fas fa-times"></i></label>
            <li><NavLink style={({ isActive }) => isActive ? {background:'#000000', color: '#ffffff'} : {}} to="documentation">V&Sigma; Documentation</NavLink></li>
            <li><NavLink style={({ isActive }) => isActive ? {background:'#000000', color: '#ffffff'} : {}} to="components">χForm Components</NavLink></li>
            <li><NavLink style={({ isActive }) => isActive ? {background:'#000000', color: '#ffffff'} : {}} to="showcase">&Omega; Showcase</NavLink></li>
            <li><NavLink style={({ isActive }) => isActive ? {background:'#000000', color: '#ffffff'} : {}} to="integrations">&alpha; Integrations</NavLink></li>
            <li>
            <a href='https://github.com/emeraldemperaur/vector-sigma' target='_blank'  className="desktop-item"><i className="header-menu-icon fa-brands fa-github"></i></a>
            </li>
            <li>
            <a onClick={() => darkModeToggle()} className="desktop-item">
                <i onClick={() => darkModeToggle()} className={`header-menu-icon ${darkMode ? 'fa-regular fa-lightbulb' : 'fa-regular fa-moon'}`}></i>
            </a>
            </li>
            </ul>
            <label htmlFor="menu-btn" className="btn menu-btn"><i className="mobile-menu-icon fas fa-bars"></i></label>
        </div>
        </nav>
        </div>
        </>
    
    
    </>
    )

}

export default NavigationMenu;