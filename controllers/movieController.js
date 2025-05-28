let prisma;
try {
  const { PrismaClient } = require('@prisma/client');
  prisma = new PrismaClient();
} catch (e) {
  prisma = {
    movie: {
      findMany: async () => [],
      findUnique: async () => null,
      delete: async () => ({}),
    },
  };
}

const getMovies = async (req, res, prismaInstance = prisma) => {
  try {
    const movies = await prismaInstance.movie.findMany(); 
    res.json(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ message: 'Failed to fetch movies.' });
  }
};

const deleteMovie = async (req, res, prismaInstance = prisma) => {
  const { id } = req.params;

  try {
    const movie = await prismaInstance.movie.findUnique({ where: { id: Number(id) } });
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    await prismaInstance.movie.delete({ where: { id: Number(id) } });
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    console.error("Error deleting movie:", error);
    res.status(500).json({ message: "Failed to delete movie." });
  }
};

module.exports = { getMovies, deleteMovie };
