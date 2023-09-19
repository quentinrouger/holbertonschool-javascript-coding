#!/usr/bin/node
const request = require('request');

// Get the URL to request from the command line argument
const url = process.argv[2];

// Perform a GET request
request.get(url, (error, response) => {
  if (error) {
    console.error('Error:', error.message);
  } else {
    console.log(`code: ${response.statusCode}`);
  }
});
