// api.js

import axios from 'axios';

export const fetchRoverPhotos = async () => {
  try {
    const response = await axios.get('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY');
    return response.data.photos;
  } catch (error) {
    console.error('Error fetching Mars rover photos:', error);
    return [];
  }
};
