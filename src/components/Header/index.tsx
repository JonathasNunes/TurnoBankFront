import React, { useContext } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await auth.signout();
        navigate('/');
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
            <Navbar.Brand href="#">Turno Bank</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                {!auth.user &&<Nav.Item as={Link} className="nav-link" to="/">Login</Nav.Item>}
                <Nav.Item as={Link} className="nav-link" to="/signup">Cadastro</Nav.Item>
                {auth.user && auth.user.type==='customer' && <Nav.Item as={Link} className="nav-link" to="/account">Conta</Nav.Item>}
                {auth.user && auth.user.type==='customer' && <Nav.Item as={Link} className="nav-link" to="/deposit">Deposito</Nav.Item>}
                {auth.user && auth.user.type==='customer' && <Nav.Item as={Link} className="nav-link" to="/purchase">Compra</Nav.Item>}
                {auth.user && auth.user.type==='admin' && <Nav.Item as={Link} className="nav-link" to="/transactions">Depósitos</Nav.Item>}
                {auth.user && <Nav.Item as={Link} className="nav-link" to="#" onClick={handleLogout}>Sair</Nav.Item>}
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
}

export default Header;