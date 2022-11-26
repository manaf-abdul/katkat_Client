import Axios from "../axiose";
import "../style/Row.css";
import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import { useNavigate } from "react-router-dom";
import { BASEURL } from "../Constants";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const navigate=useNavigate()
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  //Asnippet of code which runs based on a specific conditions

  useEffect(() => {
    async function fetchData() {
      const request = await Axios.get(`${BASEURL}movie/all-movie`);
      setMovies(request.data.data);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  // console.log(movies);
  const baseurl = "https://image.tmdb.org/t/p/original/";

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  const handleClick = (movie) => {
    navigate(`/movie/${movie._id}`)
  };
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={movie.posterImage.location}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;
