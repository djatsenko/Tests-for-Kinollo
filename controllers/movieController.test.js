const { deleteMovie } = require('./movieController');

describe('deleteMovie', () => {
  it('должен удалить фильм успешно', async () => {
    const req = { params: { id: '1' } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    const prismaMock = {
      movie: {
        findUnique: jest.fn().mockResolvedValue({ id: 1 }),
        delete: jest.fn().mockResolvedValue({}),
      },
    };

    await deleteMovie(req, res, prismaMock);

    expect(prismaMock.movie.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(prismaMock.movie.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Movie deleted successfully" });
  });

  it('должен вернуть 404, если фильм не найден', async () => {
    const req = { params: { id: '2' } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    const prismaMock = {
      movie: {
        findUnique: jest.fn().mockResolvedValue(null),
        delete: jest.fn(),
      },
    };

    await deleteMovie(req, res, prismaMock);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Movie not found" });
  });

  it('должен вернуть 500 при ошибке', async () => {
    const req = { params: { id: '3' } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    const prismaMock = {
      movie: {
        findUnique: jest.fn().mockRejectedValue(new Error('Ошибка')),
        delete: jest.fn(),
      },
    };

    await deleteMovie(req, res, prismaMock);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Failed to delete movie." });
  });
});
