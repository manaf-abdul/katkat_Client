import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import Row from '../Components/Row';

const Movie = () => {
    const [movie, setMovie] = useState({});

    const handleClick=(async)=>{
        console.log("here");
    }

    const [video, setVideo] = useState()

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }
    useEffect(() => {
        async function getData() {
            try {
                const { data } = await axios.get(`http://localhost:5001/api/movie/63777de59c4a30d6d5d93443`)
                setMovie(data.data)
            } catch (error) {
                toast(error.message)
            }
        }
        getData()
    }, [])

    return (
        <>
            <header
                className="banner"
                style={{
                    backgroundSize: "cover",
                    backgroundImage: `url(${movie?.posterImage?.location})`,
                    backgroundPosition: 'center center'
                }}
            >
                <>
                    <div className="banner_contetents">
                        {/* title */}
                        <h1 className="banner_title">
                            {movie?.title || movie?.name || movie?.original_name}
                        </h1>
                        {/* button */}
                        <button className="banner_button">PLAY</button>
                        <button className="banner_button">MY LIST</button>
                        {/* description */}
                        <h1 className="banner_desscription">{truncate(movie?.overview, 150)}</h1>
                    </div>
                    <div className='banner_fadeBottom'></div>
                </>
            </header>
            <div style={{ color: "white", padding: "5rem", paddingTop: 0 }}>
                <h1>{movie.title}</h1>
                <h2 style={{ color: "grey" }}>{movie.description}</h2>
                {movie.isSeries ? <>
                    <div className="row">
                        <div className="row_posters">
                            <h4>Seasons</h4>
                            {movie.series.map(season => (
                                <img
                                key={season._id}
                                onClick={() => handleClick(movie)}
                                className="row_poster row_posterLarge"
                                src={season.image}
                                alt={season.title}
                              />
                            ))}
                        </div>
                    </div>
                </>
                    :

                    ""
                }
            </div>
        </>
    )
}

export default Movie