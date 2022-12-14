import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom'
import "../style/Row.css";
import ReactPlayer from 'react-player';
import { BASEURL } from '../Constants';
import { UserState } from '../Context';
import { Button, Modal } from 'antd';

const Movie = () => {
    const navigate=useNavigate()
    const { user, setUser } = UserState()
    const params = useParams()
    const [movie, setMovie] = useState({});

    const handleClick = (async) => {
        console.log("here");
    }

    const [video, setVideo] = useState()

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }
    const [payModalShow, setpayModalShow] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    useEffect(() => {
        async function getData() {
            try {
                const { data } = await axios.get(`${BASEURL}movie/${params.id}`)
                setMovie(data.data)
            } catch (error) {
                toast(error.message)
            }
        }
        getData()
    }, [])

    const handlePlay = async () => {
        if (user.isSubscribed) {
            console.log("INSIDE IF");
            setShow(true)
        }
        else {
            console.log("INSIDE IF");
            setIsModalOpen(true)
        }
    }

    const handleOk = () => {
        setIsModalOpen(false);
        navigate('/plans')
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="Subcribe">
                <h1>Please subscribe to continue watching...</h1>
            </Modal>
            {/* <ReactPlayer url='https://bizsapp.s3.amazonaws.com/netflix/blog/8ltuj4e77rdh84p2g81pln.mp4'/> */}
            {
                show ?
                    <div className='watch'>
                        <div className="back" onClick={() => setShow(false)}>
                            X
                        </div>
                        <video className="video" style={{ width: "100%", height: "100%", zIndex: 10000 }} autoPlay progress controls src={movie?.video?.location} />
                    </div>
                    :
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
                                    <button className="banner_button" onClick={handlePlay}>PLAY</button>
                                    <button className="banner_button">MY LIST</button>
                                    {/* description */}
                                    <h1 className="banner_desscription">{truncate(movie?.overview, 150)}</h1>
                                </div>
                                <div className='banner_fadeBottom'></div>
                            </>
                        </header>
                        <div style={{ color: "white", padding: "5rem", paddingTop: 0 }}>
                            <h2 style={{ color: "grey" }}>{movie.description}</h2>
                            {movie.isSeries ? <>
                                {/* <div className="row" style={{backgroundColor:"#111"}}> */}
                                <h4>Seasons</h4>
                                <div className="row_posters">
                                    {movie.series.map(season => (
                                        <img
                                            key={season._id}
                                            onClick={() => handleClick(movie)}
                                            className="row_poster row_posterLarge"
                                            src={season.image.location}
                                            alt={season.title}
                                        />
                                    ))}
                                </div>
                            </>
                                :
                                ""
                            }
                        </div>
                    </>
            }
        </>
    )
}

export default Movie