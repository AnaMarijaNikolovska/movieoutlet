import './App.css';
import React from "react";
import {Router} from "@reach/router";
import Header from "./components/Header";
import AccountDetails from "./account/pages/AccountDetails";
import LogIn from "./account/pages/LogIn";
import Register from "./account/pages/Register";
import CategoryDetails from "./categories/pages/CategoryDetails";
import AddCategory from "./categories/pages/AddCategory";

function App() {
  return (
    <div className="App">
      <Header/>
      <Router>
          <AccountDetails path={"/account/:username"}/>
          <LogIn path={"/login"}/>
          <Register path={"/register"}/>
          <AddCategory path={"/category/add"} exact/>
          <CategoryDetails path={"/category/:categoryId"}/>
      </Router>
    </div>
  );
}

export default App;
