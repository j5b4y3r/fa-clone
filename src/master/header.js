import React from 'react';
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <>
            <hrader id="header" className="app-header col">
                <div className="container d-flex row justify-content-center">
                    <div className="wrapper-header">
                        <div className="flag-icon">
                            <Link to="/">
                                <span className="flag-icon">
                                    <i className="fa-regular fa-flag"></i>
                                </span>
                            </Link>
                        </div>
                        <div className="app-header-links">
                            <div className="wrap-links d-flex">
                                <span className="links-name">Start</span>
                                <span className="links-name">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </span>
                                <span className="links-name">Icons</span>
                                <span className="links-name">Docs</span>
                                <span className="links-name">Plans</span>
                                <span className="links-name">Support</span>
                                <span className="links-name">Podcast</span>
                            </div>
                        </div>
                    </div>
                    <div className="app-header-account">
                        <span>
                            <i className="fa-solid fa-arrow-right-to-bracket"></i>
                        </span>
                    </div>
                </div>
            </hrader>
        </>
    );
};

export default Header;