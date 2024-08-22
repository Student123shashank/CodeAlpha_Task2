import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import { setClientToken } from "../../spotify";
import Login from "../auth/login";
import Favorites from "../favorites";
import Feed from "../feed";
import Library from "../library";
import Player from "../player";
import Trending from "../trending";
import "./home.css";

export default function Home() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = window.localStorage.getItem("token");
    const hash = window.location.hash;
    window.location.hash = "";

    if (!storedToken && hash) {
      const params = new URLSearchParams(hash.substring(1));
      const _token = params.get("access_token");
      console.log("Token from hash:", _token); // Debugging line
      window.localStorage.setItem("token", _token);
      setToken(_token);
      setClientToken(_token);
    } else if (storedToken) {
      console.log("Token from localStorage:", storedToken); // Debugging line
      setToken(storedToken);
      setClientToken(storedToken);
    }
  }, []);

  return !token ? (
    <Login />
  ) : (
    <Router>
      <div className="main-body">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Library />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/player" element={<Player />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
}


