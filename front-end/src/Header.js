import { Container, Nav, Navbar } from "react-bootstrap";

function Header() {
    return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" className="mb-4">
        <Container>
          <Navbar.Brand href="#home"><span className="text-warning">MyHour</span>Calendar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/events">Atividades</Nav.Link>
            <Nav.Link href="/report">Relatório</Nav.Link>
            <Nav.Link href="/profile">Perfil</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
