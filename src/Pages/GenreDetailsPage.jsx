import { useLocation, useParams } from "react-router-dom";
import GenreServices from "../Services/GenreServices";
import { useEffect, useState } from "react";
import MovieCard from "../Components/MovieCard";
import { Container, Pagination } from "react-bootstrap";

const GenreDetailsPage = () => {

    const { id } = useParams();
    const location = useLocation();
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const[maxPage, setMaxPage] = useState(500);

    const fetchMoviesByGenreID = async () => {
        try {
            const response = await GenreServices.getMoviesByGenreID(currentPage, id)
            setMovies(response.data.results);
                 
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        fetchMoviesByGenreID();
    }, [currentPage])

    console.log(location);  
    return <Container className="d-flex flex-column align-items-center"> 
        <h1>{location.state.genre.name} </h1>
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

export default GenreDetailsPage;