import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_KEY = "065b298d1d4d73b7f9b69fd2f3eb974d";

export function Films() {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/day`, {
                    params: {
                        api_key: API_KEY,
                        language: "fr-FR",
                        page: 1,
                    },
                });
                setMovies(response.data.results);
                setFilteredMovies(response.data.results);
                setLoading(false);
            } catch (error) {
                console.error("Erreur du chargement :", error);
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

   
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const filtered = movies.filter((movie) =>
            movie.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredMovies(filtered);
    };

    if (loading) {
        return <p>Chargement des données...</p>;
    }

    return (
        <div className="contents">
            <form onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Recherchez un film..."
                />
                <button type="submit">Rechercher</button>
            </form>

            <div className="box-all-films">
                {filteredMovies.length > 0 ? (
                    filteredMovies.map((movie) => (
                        <Link to={`/film/${movie.id}`} className="box-films" key={movie.id}>
                            <img
                                className="box-film-img"
                                src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                                alt={movie.title}
                            />
                            <div className="box-film-content">
                                <h2 className="title-films">{movie.title}</h2>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>Aucun film trouvé pour votre recherche.</p>
                )}
            </div>
        </div>
    );
}
