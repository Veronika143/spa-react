import React, { useContext, useEffect } from "react";
import { ThemeContext } from "../../context/themeContext";
import "./layout.scss";

export default function Layout({ children }) {
    const theme = useContext(ThemeContext);

    useEffect(() => {
        const currentTheme = JSON.parse(localStorage.getItem("theme"));
        if (currentTheme) {
            theme.setTheme(currentTheme);
        } else {
            theme.theme.name = "light";
        }
    }, []);

    return (
        <div className={"layout " + `layout-${theme.theme.name}`}>
            {children}
        </div>
    );
}
