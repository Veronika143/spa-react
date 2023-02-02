import React, { useContext } from "react";
import { ThemeContext } from "../../context/themeContext";

import "./header.scss";

export default function Header({ text, iconIsShown, onReloadClick }) {
    const theme = useContext(ThemeContext);

    if (localStorage.length === 0) {
        theme.theme.mainColor = "rgb(206, 240, 227)";
    }

    return (
        <header
            className="header"
            style={{ background: theme.theme.mainColor }}
        >
            <div className="header__title">{text}</div>
            {iconIsShown && (
                <svg
                    className="header__reload"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    onClick={onReloadClick}
                >
                    <path d="m12,0c-6.6,0-12,5.4-12,12 0,2.7 0.9,5.2 2.4,7.2 0.1,0.1 0.1,0.2 0.1,0.3 0,0.3-0.2,0.5-0.5,0.5h-1c-0.6,0-1,0.4-1,1v2c0,0.6 0.4,1 1,1h8c0.6,0 1-0.4 1-1v-8c0-0.6-0.4-1-1-1h-2c-0.6,0-1,0.4-1,1v0.7c0,0.2-0.1,0.3-0.2,0.4-0.2,0.1-0.5,0.1-0.7-0.2-0.7-1.2-1.1-2.6-1.1-4 0-4.4 3.6-8 8-8s8,3.6 8,8c0,3.5-2.2,6.5-5.4,7.5-0.4,0.1-0.6,0.5-0.6,0.9v2.1c0,0.7 0.6,1.2 1.3,1 5-1.4 8.7-6.1 8.7-11.5 0-6.5-5.4-11.9-12-11.9z" />
                </svg>
            )}
        </header>
    );
}
