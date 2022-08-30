import { Navbar as BNavbar,Nav,Container } from 'react-bootstrap'
import { Link }from 'react-router-dom';
import logo from '../logo.svg'
function Navbar() {
    return (
        <>
        <BNavbar bg="primary" variant="dark">
            <Container>
            <BNavbar.Brand>
                <img
                src={logo}
                width="60"
                height="60"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
                />
            </BNavbar.Brand>
            <Nav className="me-auto">
            <Link className='nav-link' to="/login">
                Login
            </Link>
            <Link className='nav-link' to="/register">
               Register
            </Link>
            <Link className='nav-link' to = "/tweets">
                Tweets
            </Link>
            <Link className='nav-link' to="/all-users">
               All Users
            </Link>
            <Link className='nav-link' to = "/logout">
                Logout
            </Link>
            </Nav>
            </Container>
        </BNavbar>
    </>
    )
}

export default Navbar;