import { useEffect, useState } from 'react'
import { Card, Container, InputGroup, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { getAllUsers, searchUser } from '../service.ts'

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
    const [searchKey, setSearchKey] = useState('');

    useEffect(() => {
        (async () => {
            const data = await getAllUsers();
            setUsers(data);
        })()
    }, [])

    useEffect(() => {
        const t = setTimeout((async () => {
            const data = (searchKey === '') ? await getAllUsers() : await searchUser(searchKey);
            setUsers(data);
        }), 5000);
        return (() => clearTimeout(t));
    }, [searchKey])
    return (
        <>
            <InputGroup className="my-3">
                <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
                <Form.Control
                    placeholder="Enter username"
                    aria-label="Enter username"
                    aria-describedby="search input"
                    onChange={(e) => setSearchKey(e.target.value)}
                />
            </InputGroup>
            <Container className='justify-content-center'>
                {users.map((e) => <User key={e['username']} data={e} />)}
            </Container>
        </>
    )
}


export default AllUsers;