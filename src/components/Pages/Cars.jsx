import {useEffect, useState} from "react";
import axios from "axios";

export function Cars() {
    const [cars, setCars] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get(`http://localhost:3002/cars`,);
                console.log(response)
                setCars(response.data);
                setLoading(false);

            } catch (error) {
                console.error("Erreur lors du chargement :", error);
                setError("Impossible de charger les informations des voitures.");
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    if (loading) return <p>Chargement en cours...</p>;
    return (
        <div>
            <h2>Page CARS</h2>
            <div className="box-all-films">
                {cars.length > 0 ? (
                    cars.map((car) => (
                        <div className="box-films" key={car.id}>
                            <div className="box-film-content">
                                <h2 className="title-films">Marque : {car.marque}</h2>
                                <h2 className="title-films">Nom : {car.name}</h2>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Aucun car trouvé pour votre recherche.</p>
                )}
            </div>
        </div>
    )
}