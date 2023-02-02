import { useContext } from "react";
import { createContext, React, useState } from "react";

export const ThemeContext = createContext({
    theme: JSON.parse(window.localStorage.getItem("theme")),
    setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState({});

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
