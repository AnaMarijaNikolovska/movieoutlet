import './App.css';
import React, {useEffect, useState} from "react";
import {navigate, Router} from "@reach/router";
import Header from "./components/Header";
import AccountDetails from "./account/pages/AccountDetails";
import LogIn from "./account/pages/LogIn";
import Register from "./account/pages/Register";
import CategoryDetails from "./categories/pages/CategoryDetails";
import AddCategory from "./categories/pages/AddCategory";
import Home from "./components/Home";
import ListMovies from "./movie/pages/ListMovies";
import MovieDetails from "./movie/pages/MovieDetails";
import ListCategories from "./categories/pages/ListCategories";
import AddMovie from "./movie/pages/AddMovie";
import {LoginUser} from "./account/AccountService";
import {accountContext} from "./components/accountContext";

function App() {
    const [user, setUser] = useState(null);

    const logoutUser = () => {
        setUser(null);
        sessionStorage.removeItem("accountCredentials");
        alert("You have been logged out");
        navigate("/");
    }

    const contextData = {
        user: user,
        logoutUser: logoutUser
    }

    useEffect(() => {
        let credentials = sessionStorage.getItem("accountCredentials");
        if (credentials) {
            let userData = atob(credentials.split(" ")[1]).split(":");
            let loginDto = {
                username: userData[0].trim(),
                password: userData[1].trim()
            }

            LoginUser(loginDto)
                .then(res => setUser(res.data))
        }
    }, [])

    return (
        <accountContext.Provider value={contextData}>
            <div className="App">
                <Header/>
                <Router>
                    <Home path={"/"}/>
                    <AccountDetails path={"/account/:username"}/>
                    <LogIn path={"/login"}/>
                    <Register path={"/register"}/>
                    <ListCategories path={"/category"}/>
                    <AddCategory path={"/category/add"} exact/>
                    <CategoryDetails path={"/category/:categoryId"}/>
                    <ListMovies path={"/movies"}/>
                    <AddMovie path={"/movies/add"} exact/>
                    <MovieDetails path={"/movies/:movieId"}/>
                </Router>
            </div>
        </accountContext.Provider>
    );
}

export default App;
