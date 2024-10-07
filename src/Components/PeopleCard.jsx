import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PeopleCard = ({peopleCard}) => {

    const navigate = useNavigate ();
    const navigateTo = (people) => {
        navigate("/people/"+people.id, {state : {"people" : people}});
    }
     


    return <>
    <Card style={{ width: '18rem' }} onClick={() => {navigateTo(peopleCard)}}>
     <Card.Img variant="top" src={"https://image.tmdb.org/t/p/original" +peopleCard.profile_path} />
     <Card.Body>
       <Card.Title>{peopleCard.name}</Card.Title>
       <Card.Text>
         {peopleCard.overview}
       </Card.Text>
       <Button variant="primary">detail</Button>
     </Card.Body>
   </Card>
   
   
   </>
}
 
export default PeopleCard;