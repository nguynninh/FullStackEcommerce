import Login from "./Login.jsx";
import {Route, Routes, Link} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import HeaderPage from "./pages/HeaderPage.jsx";
import FooterPage from "./pages/FooterPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import ShopPage from "./pages/ShopPage.jsx";
import AccountPage from "./pages/AccountPage.jsx";

export default function App() {
    // const isLogin = localStorage.getItem("jwtToken")
    return (
        <>
            <div className="bg-gray-100">
                <HeaderPage/>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/shop" element={<ShopPage/>}/>
                    <Route path="/account" element={<AccountPage/>}/>

                    <Route path="/login" element={<Login/>}/>
                    <Route path="*" element={<ErrorPage/>}/>
                </Routes>
                <FooterPage/>
            </div>
        </>
    )
}
