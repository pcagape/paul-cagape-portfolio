import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    
    const handleClick = () => setClick (!click);
    const closeMobileMenu = () => setClick (false);
    
    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener('resize', showButton);
    
    return (
        <div className="navbar">
            <div className="navbar-container">
                <Link to='/' className='navbar-logo'>
                    Paul
                </Link>
                <div className="menu-icon" onClick={handleClick}>
                    <a href='/' onClick={e => e.preventDefault()} className={(click ? 'fas fa-times' : 'fas fa-bars')}> </a>
                </div>
                <ul className={(click ? 'nav-menu active' : 'nav-menu')}>
                    <li className="nav-item">
                        <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                            Home
                        </Link> 
                    </li>
                    <li className="nav-item">
                        <Link to='/skills' className='nav-links' onClick={closeMobileMenu}>
                            Skills
                        </Link> 
                    </li>
                    <li className="nav-item">
                        <Link to='/projects' className='nav-links' onClick={closeMobileMenu}>
                            Projects
                        </Link> 
                    </li>
                    <li className="nav-item">
                        <Link to='/contact' className='nav-links' onClick={closeMobileMenu}>
                            Contact {button}
                        </Link> 
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar
