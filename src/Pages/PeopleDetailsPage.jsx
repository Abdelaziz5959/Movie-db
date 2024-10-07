import { useNavigate, useParams } from "react-router-dom";
import PeopleService from "../Services/PeopleService";
import { useEffect, useState } from "react";
import { Button, Container, Pagination } from "react-bootstrap";
import MovieCard from "../Components/MovieCard";



const PeopleDetailsPage = () => {
    const { id } = useParams();
    const [people, setPeople] = useState({});
    const [movie, setMovie] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setmaxPage] = useState([20]);


    const fetchPeopleByID = async () => {
        try {
            const response = await PeopleService.getPeopleById(id);
            // console.log(response.data);
            setPeople(response.data);
            setTimeout(() => {
                list.current.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "instant",
                  });
            },50)   

        } catch (error) {
            console.log(error);
        }
    }

    const fetchMovieByPeople = async () => {
        try {
            const response = await PeopleService.getMovieByPeople(currentPage, id);
            // console.log(response.data);
            setmaxPage(response.data.total_pages)
            setMovie(response.data.results);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPeopleByID();
    }, [])

    
    useEffect(() => {
        fetchMovieByPeople();
    }, [currentPage])

    return <Container className="d-flex flex-column align-items-center gap-3">
        <h1>{people.name}</h1>
        <img  src={"https://image.tmdb.org/t/p/w300" + people.profile_path} alt={"photo-film"}/>
        <p> Résume : {people.biography} </p>
        {people.birthday}

        <div className="d-flex justify-content-center flex-wrap gap-3">
            {movie.map((movie) => {
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
export default PeopleDetailsPage;