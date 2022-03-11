import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const [click, setClick] = useState(false);
    
    const handleClick = () => setClick (!click);
    const closeMobileMenu = () => setClick (false);

    const navBarItems = [
        { title:'Home', toUrl:'/' },
        { title:'Skills', toUrl:'/skills' },
        { title:'Projects', toUrl:'/projects' },
        { title:'Contact', toUrl:'/contact' }

        // <NavbarItem title='Home' toUrl='/' onClick={closeMobileMenu} />,
        // <NavbarItem title='Skills' toUrl='/skills' onClick={closeMobileMenu} />,
        // <NavbarItem title='Projects' toUrl='/projects' onClick={closeMobileMenu} />,
        // <NavbarItem title='Contact' toUrl='/contact' onClick={closeMobileMenu} />
    ];

    useEffect(() => {
        // showButton();
    }, []);
    
    return (
        <div className="navbar-container">
            <Link to='/' className='navbar-logo'>
                Paul
            </Link>
            <div className="menu-icon" onClick={handleClick}>
                <a href='/' onClick={e => e.preventDefault()} className={(click ? 'fas fa-times' : 'fas fa-bars')}> </a>
            </div>
            <ul className={(click ? 'nav-menu active' : 'nav-menu')}>
                {navBarItems.map( ({ title, toUrl }) => <NavbarItem key={title} title={title} toUrl={toUrl} onClick={closeMobileMenu} /> )}
            </ul>
        </div>
    )
}

function NavbarItem({ title, toUrl, onClick }) {
    return (
        <li key={title} className="nav-item">
            <Link to={toUrl} className='nav-links' onClick={onClick}>
                {title}
            </Link> 
        </li>
    )
}

export default Navbar
