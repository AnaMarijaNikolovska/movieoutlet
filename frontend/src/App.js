import './App.css';
import React from "react";
import {Router} from "@reach/router";
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

function App() {
  return (
    <div className="App">
      <Header/>
      <Router>
          <Home path={"/"}/>
          <AccountDetails path={"/account/:username"}/>
          <LogIn path={"/login"}/>
          <Register path={"/register"}/>
          <ListCategories  path={"/category"} />
          <AddCategory path={"/category/add"} exact/>
          <CategoryDetails path={"/category/:categoryId"}/>
          <ListMovies  path={"/movies"} />
          <AddMovie path={"/movies/add"} exact/>
          <MovieDetails  path={"/movies/:movieId"} />
      </Router>
    </div>
  );
}

export default App;
