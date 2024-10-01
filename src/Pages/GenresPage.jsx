import { useEffect, useState } from "react";
import GenreService from "../Services/GenreServices";
import { Button, Container } from "react-bootstrap";

const GenresPage = () => {

    const [genre, setGenre] = useState([]);

    const fetchGenre = async () => {
        try {
            const response = await GenreService.getAllGenres();
            setGenre(response.data.genres);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchGenre()
    }, [])

    return <Container className="d-flex flex-column align-items-center">
        <h1>Genres</h1>
        <div className="d-flex justify-content-center flex-wrap gap-3">
            {genre.map((genre) => {
                return <Button variant="primary" key={genre.id}>{genre.name}</Button>
            })}
        </div>
    </Container>;
}

export default GenresPage;