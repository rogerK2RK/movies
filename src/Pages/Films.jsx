import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MovieContext } from "../context/movieContext";

export function Films() {
    const { movies, filteredMovies, setFilteredMovies, searchQuery, setSearchQuery, loading } = useContext(MovieContext);


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
