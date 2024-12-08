import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Singlegif from "./pages/Single-gif";
import Category from "./pages/Category";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import "./App.css";
import ContextProvider from "./context/Context";

function App() {
  return (
    <ContextProvider>
      <div className=" bg-gray-950 text-white min-h-screen ">
        <div className=" px-20 py-4 mx-auto">
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/:type/:slug" element={<Singlegif />}></Route>
              <Route path="/:category" element={<Category />}></Route>
              <Route path="/search/:query" element={<Search />}></Route>
              <Route path="/favorites" element={<Favorites />}></Route>
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </ContextProvider>
  );
}

export default App;
