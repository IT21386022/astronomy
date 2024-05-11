import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

const MarsRoverPhotosPage = () => {
  const [roverPhotos, setRoverPhotos] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState('');
  const [selectedEarthDate, setSelectedEarthDate] = useState('');
  const [uniqueCameras, setUniqueCameras] = useState([]);
  const [uniqueEarthDates, setUniqueEarthDates] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    fetchRoverPhotos();
  }, []);

  const fetchRoverPhotos = async () => {
    try {
      const response = await axios.get('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY');
      setRoverPhotos(response.data.photos);
      const cameras = response.data.photos.map(photo => photo.camera.full_name);
      setUniqueCameras([...new Set(cameras)]);
      const earthDates = response.data.photos.map(photo => photo.earth_date);
      setUniqueEarthDates([...new Set(earthDates)]);
    } catch (error) {
      console.error('Error fetching Mars rover photos:', error);
    }
  };

  const handleCameraChange = (event) => {
    setSelectedCamera(event.target.value);
    setSelectedPhoto(null); // Reset selected photo when changing cameras
  };

  const handleEarthDateChange = (event) => {
    setSelectedEarthDate(event.target.value);
    setSelectedPhoto(null); // Reset selected photo when changing Earth dates
  };

  const handleShowDetails = (photo) => {
    setSelectedPhoto(photo);
  };

  const handleCloseDetails = () => {
    setSelectedPhoto(null);
  };

  const filteredPhotos = roverPhotos.filter(photo => {
    if (selectedCamera && selectedEarthDate) {
      return photo.camera.full_name === selectedCamera && photo.earth_date === selectedEarthDate;
    } else if (selectedCamera) {
      return photo.camera.full_name === selectedCamera;
    } else if (selectedEarthDate) {
      return photo.earth_date === selectedEarthDate;
    } else {
      return true;
    }
  });

  return (
    <div className="container-fluid bg-light p-4">
      <h1 className="text-center mb-4">Mars Rover Photos</h1>
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <select
          className="form-select me-2"
          value={selectedCamera}
          onChange={handleCameraChange}
        >
          <option value="" disabled>Filter by Camera</option>
          {uniqueCameras.map((camera, index) => (
            <option key={index} value={camera}>{camera}</option>
          ))}
        </select>
        <select
          className="form-select"
          value={selectedEarthDate}
          onChange={handleEarthDateChange}
        >
          <option value="" disabled>Filter by Earth Date</option>
          {uniqueEarthDates.map((earthDate, index) => (
            <option key={index} value={earthDate}>{earthDate}</option>
          ))}
        </select>
      </div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {filteredPhotos.map((photo, index) => (
          <div key={index} className="col">
            <div className="card h-100">
              <img src={photo.img_src} className="card-img-top" alt={`Mars Rover Photo ${index}`} style={{ height: '200px', objectFit: 'cover' }} />
              <div className="card-body">
                <h5 className="card-title">Photo ID: {photo.id}</h5>
                {selectedPhoto === photo ? (
                  <div>
                    <p className="card-text">Sol: {photo.sol}</p>
                    <p className="card-text">Earth Date: {photo.earth_date}</p>
                    <p className="card-text">Camera Full Name: {photo.camera.full_name}</p>
                    <p className="card-text">Rover Name: {photo.rover.name}</p>
                    <p className="card-text">Rover Landing Date: {photo.rover.landing_date}</p>
                    <p className="card-text">Rover Launch Date: {photo.rover.launch_date}</p>
                    <p className="card-text">Rover Status: {photo.rover.status}</p>
                    <button className="btn btn-primary" onClick={handleCloseDetails}>Close Details</button>
                  </div>
                ) : (
                  <button className="btn btn-primary" onClick={() => handleShowDetails(photo)}>Show Details</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarsRoverPhotosPage;
