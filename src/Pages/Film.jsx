import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import ReactPlayer from "react-player";

const API_KEY = "e814a776b659687282d7e7d257401a67";
const YOUTUBE_API_KEY = "AIzaSyBAMPCWsBBl-sygmeX2nJmG_op6VFI8Yfo";

export function Film() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [videoId, setVideoId] = useState(null);


    useEffect(() => {
        const fetchSerie = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
                    params: {
                        api_key: API_KEY,
                        language: "fr-FR",
                    },
                });
                setMovie(response.data);
                setLoading(false);

            } catch (error) {
                console.error("Erreur lors du chargement :", error);
                setError("Impossible de charger les informations de la série.");
                setLoading(false);
            }
        };

        fetchSerie();
    }, [id]);

    console.log(movie);

    useEffect(() => {
        if (movie?.title) {
            const fetchTrailer = async () => {
                try {
                    const response = await fetch(
                        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${movie.title} trailer&key=${YOUTUBE_API_KEY}`
                    );
                    const data = await response.json();

                    if (data.items && data.items.length > 0) {
                        setVideoId(data.items[0].id.videoId);
                    }
                } catch (error) {
                    console.error("Erreur lors de la récupération du trailer :", error);
                }
            };

            fetchTrailer();
        }
    }, [movie]);

    if (loading) return <p>Chargement en cours...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="box-film">
            <h1 className="title">{movie.title}</h1>
            <div className="box-image">
                <img className="film-img" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
            </div>
            <div className="box-content">
                <p><span className="txt-bld">Titre : </span>{movie.title}</p>
                <p><span className="txt-bld">Lien : </span><a href={movie.homepage}>{movie.homepage}</a></p>
                <p><span className="txt-bld">Déscription : </span>{movie.overview}</p>
                <div className="trailer">
                    <h2>Bande-annonce</h2>
                    {videoId ? (
                        <ReactPlayer
                            url={`https://www.youtube.com/watch?v=${videoId}`}
                            controls
                            width="60%"
                            height="300px"
                        />
                    ) : (
                        <p>Aucune bande-annonce trouvée.</p>
                    )}
                </div>
            </div>
        </div>
    )
}