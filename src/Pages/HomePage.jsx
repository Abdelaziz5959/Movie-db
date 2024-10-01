import { useEffect, useState } from "react";
import MoviesServices from "../Services/MoviesServices";
import MovieCard from "../Components/MovieCard";
import { Container } from "react-bootstrap";
import Pagination from 'react-bootstrap/Pagination';

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(500);

    const fetchMovies = async () => {
        try {
            const response = await MoviesServices.getAllMovies(currentPage);
            setMovies(response.data.results); // afficher le tableau des films sur la console.
            // setMaxPage(response.data.total_pages);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchMovies()
    }, [currentPage])

    return <Container className="d-flex flex-column align-items-center">
        <h1>Page d&apos;acceuil</h1>
        <div className="d-flex justify-content-center flex-wrap gap-3">
            {movies.map((movie) => {
                return <MovieCard movieCard={movie} key={movie.id}></MovieCard>

            })}
        </div>
        <Pagination className="mt-5">
            {currentPage > 1 && <>     {/* Si ma page courante est > à 1  alors affiché ...( si ma condition est bonne alors tu m'affiche ça, le alors =&&)*/}
                <Pagination.First onClick={() => { setCurrentPage(1) }} />
                <Pagination.Prev onClick={() => { setCurrentPage(currentPage - 1) }} />
                <Pagination.Item onClick={() => { setCurrentPage(1) }}>{1}</Pagination.Item>
            </>}
            {currentPage - 5 > 0 && <>
                <Pagination.Ellipsis onClick={() => { setCurrentPage(currentPage - 5) }} />
            </>}

            {(currentPage != 2 && currentPage > 1) && <>
                <Pagination.Item onClick={() => { setCurrentPage(currentPage - 1) }}>{currentPage - 1}</Pagination.Item>
            </>}


            <Pagination.Item active>{currentPage}</Pagination.Item>

            {currentPage + 1 < maxPage && <>
                <Pagination.Item onClick={() => { setCurrentPage(currentPage + 1) }}>{currentPage + 1}</Pagination.Item>
            </>}

            {currentPage + 5 <= maxPage && <>
                <Pagination.Ellipsis onClick={() => { setCurrentPage(currentPage + 5) }} />
            </>}

            {currentPage < maxPage && <>
                <Pagination.Item onClick={() => { setCurrentPage(maxPage) }}>{maxPage}</Pagination.Item>
                <Pagination.Next onClick={() => { setCurrentPage(currentPage + 1) }} />
                <Pagination.Last onClick={() => { setCurrentPage(maxPage) }} />
            </>}

        </Pagination>
    </Container>;
}

export default HomePage;