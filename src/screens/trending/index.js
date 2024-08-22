import React, { useState, useEffect } from "react";
import APIKit from "../../spotify";
import { IconContext } from "react-icons";
import { AiFillPlayCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "./trending.css"; // Assuming you will have a CSS file for styling

export default function Trending() {
  const [trendingItems, setTrendingItems] = useState(null);

  useEffect(() => {
    // Fetch trending playlists or tracks from Spotify API
    APIKit.get("browse/featured-playlists").then(function (response) {
      setTrendingItems(response.data.playlists.items);
    });
  }, []);

  const navigate = useNavigate();

  const playItem = (id) => {
    navigate("/player", { state: { id: id } });
  };

  return (
    <div className="screen-container">
      <div className="trending-body">
        {trendingItems?.map((item) => (
          <div
            className="playlist-card"
            key={item.id}
            onClick={() => playItem(item.id)}
          >
            <img
              src={item.images[0].url}
              className="playlist-image"
              alt="Playlist-Art"
            />
            <p className="playlist-title">{item.name}</p>
            <p className="playlist-subtitle">{item.tracks.total} Songs</p>
            <div className="playlist-fade">
              <IconContext.Provider value={{ size: "50px", color: "#E99D72" }}>
                <AiFillPlayCircle />
              </IconContext.Provider>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
