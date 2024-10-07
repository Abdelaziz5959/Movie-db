import { useEffect, useState } from "react";
import PeopleService from "../Services/PeopleService";
import { useNavigate } from "react-router-dom";
import { Button, Container, Pagination } from "react-bootstrap";
import PeopleCard from "../Components/PeopleCard";


const PeoplePage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(500);

    const  [ people, setPeople] = useState ([]);

    const navigate = useNavigate ();
    const navigateTo = (people) => {
        navigate("/people/"+people.id, {state : {"people" : people}});
    }


    const fetchActor = async () => {
        try {  
            const response = await PeopleService.GetAllPeople(currentPage);         
            setPeople(response.data.results);
            setTimeout(() => {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "instant",
                  });
            },50)   
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        fetchActor()
    }, [currentPage])
   
    
    
     return <Container className="d-flex flex-column align-items-center">
     <h1>Acteur</h1>
     <div className="d-flex justify-content-center flex-wrap gap-3">
         {people.map((people) => {
             return <PeopleCard peopleCard={people} key={people.id}></PeopleCard>
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
 
export default PeoplePage ;