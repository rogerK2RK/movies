import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

export const MovieContext = createContext(null);

export const MovieController = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);

    const API_KEY = "065b298d1d4d73b7f9b69fd2f3eb974d";

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/trending/movie/day`,
                    {
                        params: {
                            api_key: API_KEY,
                            language: "fr-FR",
                            page: 1,
                        },
                    }
                );
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

    return (
        <MovieContext.Provider
            value={{
                movies,
                setMovies,
                filteredMovies,
                setFilteredMovies,
                searchQuery,
                setSearchQuery,
                loading,
            }}
        >
            {children}
        </MovieContext.Provider>
    );
};