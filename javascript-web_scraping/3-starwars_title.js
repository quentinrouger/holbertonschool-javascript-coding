#!/usr/bin/node
const request = require('request');

// Get the movie ID from the command line argument
const movieId = process.argv[2];

// Define the URL to the Star Wars API endpoint with the movie ID
const apiUrl = `https://swapi-api.hbtn.io/api/films/${movieId}`;

// Perform a GET request to fetch movie data
request.get(apiUrl, (error, response, body) => {
  if (error) {
    console.error('Error:', error.message);
  } else if (response.statusCode !== 200) {
    console.error(`Error: Status Code ${response.statusCode}`);
  } else {
      const movieData = JSON.parse(body);
      console.log(`Title: ${movieData.title}`);
    }
});
