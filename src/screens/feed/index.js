import React, { useState, useEffect } from "react";
import APIKit from "../../spotify";
import { IconContext } from "react-icons";
import { AiFillPlayCircle } from "react-icons/ai";
import "./feed.css";
import { useNavigate } from "react-router-dom";

export default function Feed() {
  const [tracks, setTracks] = useState(null);

  useEffect(() => {
    const playlistId = "7coqmFu8e6CPu2y73PNEJK"; // Your playlist ID
    
    APIKit.get(`playlists/${playlistId}`).then(function (response) {
      setTracks(response.data.tracks.items.map(item => item.track));
    }).catch(error => {
      console.error("Error fetching playlist tracks:", error);
    });
  }, []);

  const navigate = useNavigate();

  const playTrack = (trackId) => {
    navigate("/player", { state: { id: trackId } });
  };

  return (
    <div className="screen-container">
      <div className="feed-body">
        {tracks?.map((track) => (
          <div
            className="track-card"
            key={track.id}
            onClick={() => playTrack(track.id)}
          >
            <img
              src={track.album.images[0].url}
              className="track-image"
              alt="Track-Art"
            />
            <p className="track-title">{track.name}</p>
            <p className="track-artist">{track.artists.map(artist => artist.name).join(", ")}</p>
            <div className="track-fade">
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

