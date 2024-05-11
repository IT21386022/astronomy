import React, { useState, useEffect } from 'react';
import { Button, Card, Collapse, Form, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

const NASA_API_KEY = 'ztAA72aycIHWLS1WjtdWhSIZzB7M5MvVnSCTEIu4';

const App = () => {
  const [photoOfTheDay, setPhotoOfTheDay] = useState([]);
  const [searchDate, setSearchDate] = useState('');
  const [expandedIndex, setExpandedIndex] = useState(-1);

  useEffect(() => {
    fetchPhotoOfTheDay();
  }, []);

  const fetchPhotoOfTheDay = async () => {
    try {
      const response = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&count=20`
      );
      setPhotoOfTheDay(response.data.sort((a, b) => new Date(b.date) - new Date(a.date)));
    } catch (error) {
      console.error('Error fetching photo of the day:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&date=${searchDate}`
      );
      setPhotoOfTheDay([response.data]);
    } catch (error) {
      console.error('Error searching photo:', error);
    }
  };

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? -1 : index);
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4">NASA Astronomy Picture of the Day</h1>
      <Row className="mb-3">
        <Col md={4}>
          <Form.Control
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
        </Col>
        <Col md={2}>
          <Button variant="primary" onClick={handleSearch}>Search</Button>
        </Col>
      </Row>
      {photoOfTheDay.map((photo, index) => (
        <Card key={index} className="mb-2">
          <Row>
            <Col md={4}>
              <Card.Img variant="top" src={photo.url} style={{ height: '200px', objectFit: 'cover' }} />
            </Col>
            <Col md={8}>
              <Card.Body>
                <Card.Title>{photo.title && <strong>{photo.title}</strong>} - {photo.date}</Card.Title>
                <Collapse in={expandedIndex === index}>
                  <Card.Text>
                    {photo.explanation}
                  </Card.Text>
                </Collapse>
                <Button
                  onClick={() => toggleExpand(index)}
                  variant="primary"
                  size="sm"
                  className="mb-2"
                >
                  {expandedIndex === index ? 'Close Explanation' : 'Open Explanation'}
                </Button>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      ))}
    </Container>
  );
};

export default App;
