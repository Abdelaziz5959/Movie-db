import { useEffect, useState } from "react";
import MoviesServices from "../Services/MoviesServices";
import MovieCard from "../Components/MovieCard";
import { Button, Container, Form } from "react-bootstrap";
import Pagination from 'react-bootstrap/Pagination';

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(500);
    const [searchValue, setSearchValue] = useState('');
    const [searching, setSearching] = useState(false);

    const fetchMovies = async () => {
        try {
            const response = await MoviesServices.getAllMovies(currentPage);
            setMovies(response.data.results); // afficher le tableau des films sur la console.
            setMaxPage(500);
            setTimeout(() => {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "instant",
                });
            }, 50)
        } catch (error) {
            console.log(error);
        }
    }

    const searchFilm = async () => {
        if (searchValue == "") {
            fetchMovies();
            setSearching(false);

        } else {
            try {
                const response = await MoviesServices.getMovieByTitle(searchValue, currentPage);
                setMaxPage(response.data.total_pages);
                setMovies(response.data.results);
            } catch (error) {
                console.log(error);
            }
        }
    }
    useEffect(() => {
        if (searching == false) {
            fetchMovies();
        } else {
            searchFilm();
        }

    }, [currentPage])

    return <Container className="d-flex flex-column align-items-center gap-3">
        <h1>Page d&apos;acceuil</h1>
        <form onSubmit={(e) =>{
            e.preventDefault(); //evite le rechargement de la page
            setCurrentPage(1); 
            setSearching(true); 
            searchFilm();
        }}>
            <Form.Label htmlFor="search" >Rechercher un film</Form.Label>
            <Form.Control
                type="text"
                id="search"
                aria-describedby="search"
                placeholder="ex : DeadPool"
                className="mb-3"
                value={searchValue}
                onChange={(e) => {
                    setSearchValue(e.currentTarget.value);

                }}
            />
        </form>
        <Button variant="primary" className="col-12 mb-3" onClick={() => { setCurrentPage(1); setSearching(true); searchFilm(); }}> Rechercher</Button>
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