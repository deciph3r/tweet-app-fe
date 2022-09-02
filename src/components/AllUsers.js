import { useEffect, useState } from 'react'
import { Card, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { getAllUsers } from '../service.ts'

function User({ data }) {
    return (
        <>
            <Card className='my-2'>
                <Card.Body>
                    <Card.Title>{`${data['firstName']} ${data['lastName']}`}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">@{data['username']}</Card.Subtitle>
                    <Card.Text>
                        {data['email']}
                    </Card.Text>
                    <Link className='card-link' to={`/tweets?id=${data['username']}`}>View All Teets</Link>
                </Card.Body>
            </Card>
        </>
    )
}


function AllUsers() {

    const [users, setUsers] = useState([]);
    useEffect(() => {
        (async () => {
            const data = await getAllUsers();
            setUsers(data);
        })()
    }, [])

    return (
        <>
            <Container className='justify-content-center'>
                {users.map((e) => <User key={e['username']} data={e} />)}
            </Container>
        </>
    )
}


export default AllUsers