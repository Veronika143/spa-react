import { React, useEffect, useState } from "react";

export default function useTheme() {
    const [theme, changeTheme] = useState({});
    const setTheme = (URL) => {
        fetch(URL)
            .then((res) => res.json())
            .then((x) => {
                setTheme(x);
                localStorage.setItem("theme", JSON.stringify(x));
            });
    };

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("theme"));
        if (data) changeTheme(data);
    }, []);

    return { theme, setTheme };
}
