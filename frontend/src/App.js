import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Mars from './pages/Mars';
import nasaLogo from './assets/nasa-logo.png';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NoAppBar><Signin /></NoAppBar>} />
        <Route path="/Signup" element={<NoAppBar><Signup /></NoAppBar>} />
        <Route path="/Home" element={<AppBarComponent><Home /></AppBarComponent>} />
        <Route path="/Mars" element={<AppBarComponent><Mars /></AppBarComponent>} />
      </Routes>
    </BrowserRouter>
  );
}

const AppBarComponent = ({ children }) => {
  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/Home">Astronomy Picture of the Day (APOD)</Navbar.Brand>
          <Navbar.Brand as={Link} to="/Mars">Mars Rover Photos</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <img src={nasaLogo} alt="NASA Logo" style={{ height: '70px', marginRight: '10px' }} />
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {children}
    </>
  );
};

const NoAppBar = ({ children }) => {
  return <>{children}</>;
};

export default App;
