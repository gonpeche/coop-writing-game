Juego

Para iniciar:

Ir a server --> correr `yarn dev`

To deploy to Heroku (the server), change package.json from nodemon server.js to node server.js
To deploy to Netlify (the client), change:
const ENDPOINT = "localhost:5000";
to
const ENDPOINT = "https://garralapala.herokuapp.com/";
