import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewsPage from "./pages/NewsPage/newsPage";
import ThemesPage from "./pages/ThemesPage/themesPage";
import { ThemeProvider } from "./context/themeContext";

function App() {
    return (
        <div className="App">
            <ThemeProvider>
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element={<NewsPage />} />
                        <Route exact path="/themes" element={<ThemesPage />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </div>
    );
}

export default App;
