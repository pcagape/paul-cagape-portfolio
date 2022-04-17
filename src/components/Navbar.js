import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';

// CSS
import '../styles/Navbar.css';

let _pathTransitioning = false;

function Navbar({ routes, triggerTransition }) {
    const [showDropdown, setShowDropdown] = useState(false);
    const { push: goToUrl, location: { pathname: urlPathname } } = useHistory();

    async function onClickGoToLink({ path }) {
        // prevent transition when path is already the same
        if (urlPathname === path || _pathTransitioning) return;

        _pathTransitioning = true;
        triggerTransition(false);
        // pause ms while current component exit transition
        await ((ms) => new Promise(resolve => setTimeout(resolve, ms)))(250);
        goToUrl(path);
        triggerTransition(true);
        _pathTransitioning = false;
    }

    return (
        <header className="header border-light shadow-lg position-absolute w-100 top-0">
            <div className="px-1 py-1 text-white" >
                <div className="container-fluid" >
                    <div className="row align-items-center justify-content-center" >
                        <a href='/' className="col-4 align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none" >
                            <h1>Paul</h1>
                        </a>

                        <nav className="col-8 nav col-lg-auto my-2 justify-content-end my-md-0 text-small" >

                            {/* Navbar items */}
                            {routes.map((item) => (
                                <li key={item.name} className={'nav-item'} >
                                    <Link to='' onClick={e => { e.preventDefault(); onClickGoToLink(item) }} className={`nav-link ${urlPathname.indexOf(item.url) > -1 ? 'active ' : ' '}link-light text-white`} >
                                        <i className={`d-block text-center fs-2 bi ${item.bi || 'bi-house-door'}`} />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}

                            {/* Button menu for dropdown */}
                            <li className={'nav-dropdown-btn'} onClick={() => setShowDropdown(!showDropdown)}>
                                <a href='/' onClick={e => e.preventDefault()} className="nav-link text-white" >
                                    <i className="d-block text-center fs-1 bi bi-list" />
                                </a>

                                <div className={"dropdown-menu align-items-stretch p-3 rounded-3 shadow-lg end-0 dropdown-menu" + (showDropdown ? ` shown` : '')}>
                                    <nav className="d-grid gap-2 col-8">

                                        {/* Dropdown items */}
                                        {routes.map((item) => (
                                            <Link to='' onClick={e => { e.preventDefault(); onClickGoToLink(item) }} key={item.name} className={"btn btn-hover-light d-flex align-items-center gap-3 py-2 px-3 lh-sm"}>
                                                <i className={`d-block text-center fs-2 bi bi-house-fill ${item.bi}`} />
                                                <div><strong className="d-block">{item.name}</strong></div>
                                            </Link>
                                        ))}

                                    </nav>
                                </div>

                            </li>

                        </nav>

                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar;