const express = require('express');
const { getMovies, deleteMovie } = require('./controllers/movieController');

const app = express();
app.use(express.json());

// Маршруты API
app.get('/api/movies', (req, res) => getMovies(req, res));
app.delete('/api/movies/:id', (req, res) => deleteMovie(req, res));

// Экспортируем для supertest
module.exports = app;
