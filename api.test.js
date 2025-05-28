const request = require('supertest');
const app = require('./app');

// Мокаем контроллеры, чтобы не подключаться к реальной базе
jest.mock('./controllers/movieController', () => ({
  getMovies: (req, res) => res.json([{ id: 1, title: 'Mocked Movie' }]),
  deleteMovie: (req, res) => {
    if (req.params.id === '999') {
      return res.status(404).json({ message: 'Movie not found' });
    }
    return res.status(200).json({ message: 'Movie deleted successfully' });
  },
}));

describe('API /api/movies', () => {
  it('GET /api/movies должен вернуть список фильмов', async () => {
    const response = await request(app).get('/api/movies');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ id: 1, title: 'Mocked Movie' }]);
  });

  it('DELETE /api/movies/:id должен вернуть 200 при успешном удалении', async () => {
    const response = await request(app).delete('/api/movies/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Movie deleted successfully' });
  });

  it('DELETE /api/movies/:id должен вернуть 404, если фильм не найден', async () => {
    const response = await request(app).delete('/api/movies/999');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Movie not found' });
  });
});
