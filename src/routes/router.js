import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import { useState } from "react";
import Home from "../pages/home";
import Login from "../pages/login";
import CreatePost from "../pages/createPost";
import NavBar from "../components/navBar";

const RouterApp = () => {
    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
    return (
        <Router>
            <NavBar isAuth={isAuth} setIsAuth={setIsAuth} />
            <Routes>
                <Route path="/" element={<Home isAuth={isAuth} />}/>
                <Route path="/login" element={<Login setIsAuth={setIsAuth} />}/>
                <Route path="/createpost" element={<CreatePost isAuth={isAuth}/>}/>
            </Routes>
        </Router>
    )
}

export default RouterApp;