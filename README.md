# Super-Hero-App

## General Info 
Super Hero App is a react application built for a challenge. The goal was to create an app that makes use of an external api to build a team of heroes which can include up to 3 good heroes and 3 bad heroes. The team's data should then be displayed in the home screen.

It wasn't a requirement but a backend was built to handle the external API requests since doing this client side would result in a CORS error.

## Technologies
 * React (with hooks: useReducer, useEffect, useState, useContext, useHistory)
 * NodeJS
 * Express
 * Bootstrap
 * Sass
 
## React Libraries
 * React Testing Library
 * ReactCardFlip
 * React Toastify
 * Helmet
 * Recharts
 * Axios
 * Formik
 * Yup
 * Lodash

## Known Issues
 * Was not able to complete tests for components. Could not find a way to test formik onSubmit.
 * ReactFlipCard was complicated to set dynamic height on the card, so I used fixed heights. Caused some issues on responsiveness where it would sometimes overflow on the x axis.
 * Initially included .env file on first commit.
