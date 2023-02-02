import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { createRef } from "react";
import Footer from "../../components/Footer/footer";
import Header from "../../components/Header/header";
import Layout from "../../components/Layout/layout";
import News from "../../components/News/news";

import "./newsPage.scss";

export default function NewsPage() {
    const [news, setNews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const countNews = 10;
    const lastItem = createRef();
    const observerLoader = useRef();

    const [startPoint, setStartPoint] = useState(0);
    const [pullChange, setPullChange] = useState();
    const refreshCont = useRef(0);
    const refreshIcon = document.querySelector(".refresh-icon");

    const NEWS_API = `https://frontappapi.dock7.66bit.ru/api/news/get?page=${currentPage}&count=${countNews}`;

    function getNews() {
        fetch(NEWS_API)
            .then((response) => response.json())
            .then((data) => {
                setNews([...news, ...data]);
                setCurrentPage(currentPage + 1);
            });
    }

    function getRefreshedNews() {
        fetch(NEWS_API)
            .then((response) => response.json())
            .then((data) => {
                setNews(data);
                setCurrentPage(currentPage + 1);
            });
    }

    useEffect(() => {
        getNews();
    }, []);

    const actionInSight = (entries) => {
        if (entries[0].isIntersecting && currentPage <= 101) {
            getNews();
        }
    };

    useEffect(() => {
        if (observerLoader.current) observerLoader.current.disconnect();

        observerLoader.current = new IntersectionObserver(actionInSight);
        if (lastItem.current) observerLoader.current.observe(lastItem.current);
    }, [lastItem]);

    // pull to refresh

    useEffect(() => {
        window.addEventListener("touchstart", pullStart);
        window.addEventListener("touchmove", pull);
        window.addEventListener("touchend", endPull);
        return () => {
            window.removeEventListener("touchstart", pullStart);
            window.removeEventListener("touchmove", pull);
            window.removeEventListener("touchend", endPull);
        };
    });

    const initLoading = () => {
        setTimeout(() => {
            getRefreshedNews();
        }, 1000);
    };

    const pullStart = (e) => {
        const { screenY } = e.targetTouches[0];
        setStartPoint(screenY);
    };

    const pull = (e) => {
        const touch = e.targetTouches[0];
        const { screenY } = touch;
        let pullLength =
            startPoint < screenY ? Math.abs(screenY - startPoint) : 0;
        setPullChange(pullLength);
        if (pullLength > 150) {
            refreshIcon.style.display = "block";
        }
    };

    const endPull = (e) => {
        setStartPoint(0);
        setPullChange(0);
        if (pullChange > 220) initLoading();
        refreshIcon.style.display = "none";
    };

    return (
        <Layout>
            <Header
                text="Новости"
                iconIsShown={true}
                onReloadClick={() => {
                    getRefreshedNews();
                }}
            />
            <svg
                className="refresh-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                style={{ transform: `rotate(${pullChange}deg)` }}
            >
                <path d="m12,0c-6.6,0-12,5.4-12,12 0,2.7 0.9,5.2 2.4,7.2 0.1,0.1 0.1,0.2 0.1,0.3 0,0.3-0.2,0.5-0.5,0.5h-1c-0.6,0-1,0.4-1,1v2c0,0.6 0.4,1 1,1h8c0.6,0 1-0.4 1-1v-8c0-0.6-0.4-1-1-1h-2c-0.6,0-1,0.4-1,1v0.7c0,0.2-0.1,0.3-0.2,0.4-0.2,0.1-0.5,0.1-0.7-0.2-0.7-1.2-1.1-2.6-1.1-4 0-4.4 3.6-8 8-8s8,3.6 8,8c0,3.5-2.2,6.5-5.4,7.5-0.4,0.1-0.6,0.5-0.6,0.9v2.1c0,0.7 0.6,1.2 1.3,1 5-1.4 8.7-6.1 8.7-11.5 0-6.5-5.4-11.9-12-11.9z" />
            </svg>
            <div
                className="news"
                ref={refreshCont}
                style={{ marginTop: pullChange / 3.118 || "" }}
            >
                {news.map((item, index) => {
                    if (index + 1 === news.length) {
                        return (
                            <News
                                key={item.id}
                                title={item.title}
                                content={item.content}
                                ref={lastItem}
                            />
                        );
                    }

                    return (
                        <News
                            key={item.id}
                            title={item.title}
                            content={item.content}
                        />
                    );
                })}
            </div>
            <Footer />
        </Layout>
    );
}
