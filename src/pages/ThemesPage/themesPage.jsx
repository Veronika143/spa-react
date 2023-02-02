import React, { useEffect } from "react";
import Footer from "../../components/Footer/footer";
import Header from "../../components/Header/header";
import Layout from "../../components/Layout/layout";
import { useTheme } from "../../context/themeContext";

import "./themesPage.scss";

export default function ThemesPage() {
    const themeContext = useTheme();

    const DARK_API =
        "https://frontappapi.dock7.66bit.ru/api/theme/get?name=dark";
    const LIGHT_API =
        "https://frontappapi.dock7.66bit.ru/api/theme/get?name=light";
    const BLUE_API =
        "https://frontappapi.dock7.66bit.ru/api/theme/get?name=blue";

    const fetchData = (url) => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                themeContext.setTheme(data);
                localStorage.setItem("theme", JSON.stringify(data));
            });
    };

    return (
        <Layout>
            <Header text="Темы" iconIsShown={false} />
            <main className="themes">
                <button
                    className="themes-btn dark"
                    onClick={() => fetchData(DARK_API)}
                >
                    Темная тема
                </button>
                <button
                    className="themes-btn light"
                    onClick={() => fetchData(LIGHT_API)}
                >
                    Светлая тема
                </button>
                <button
                    className="themes-btn blue"
                    onClick={() => fetchData(BLUE_API)}
                >
                    Синяя тема
                </button>
            </main>
            <Footer />
        </Layout>
    );
}
