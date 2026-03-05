import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";
import { TMDB_API_KEY } from "../../config";

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${TMDB_API_KEY}&language=en-US`,
        );

        const data = await res.json();

        console.log("API DATA:", data);

        // 🔥 find trailer from YouTube
        const trailer = data.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube",
        );

        if (trailer) {
          setVideo(trailer);
        } else if (data.results.length > 0) {
          setVideo(data.results[0]);
        }
      } catch (error) {
        console.error("Video fetch error:", error);
      }
    };

    fetchVideo();
  }, [id]);

  return (
    <div className="player">
      <img
        src={back_arrow_icon}
        alt="back"
        onClick={() => navigate(-1)}
        className="back-button"
      />

      {video ? (
        <>
          <iframe
            width="100%"
            height="500"
            src={`https://www.youtube.com/embed/${video.key}`}
            title="YouTube video player"
            frameBorder="0"
            allowFullScreen
          ></iframe>

          <div className="player-info">
            <p>{video.published_at?.slice(0, 10)}</p>
            <p>{video.name}</p>
            <p>{video.type}</p>
          </div>
        </>
      ) : (
        <p style={{ color: "white" }}>Loading trailer...</p>
      )}
    </div>
  );
};

export default Player;
