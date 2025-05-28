// backend/src/controllers/movieController.js
const { PrismaClient } = require('@prisma/client');
const fs = require("fs");
const sharp = require('sharp'); // For changing image size
const path = require('path');
const prisma = new PrismaClient();

const getMovies = async (req, res) => {
    try {
        const movies = await prisma.movie.findMany(); 
        res.json(movies);
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ message: 'Failed to fetch movies.' });
    }
};

// Add new movie
const addMovie = async (req, res) => {
    const { title, description, trailerPath } = req.body;

    if (!title || !description || !trailerPath || !req.file) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const uploadsDir = path.join(__dirname, '../../uploads');
        const originalPath = path.join(uploadsDir, req.file.filename);
        const resizedFilename = `resized-${Date.now()}-${req.file.filename}`;
        const resizedPath = path.join(uploadsDir, resizedFilename);

        // Image processing: resizing and cropping
        await sharp(originalPath)
            .resize(259, 194, { fit: 'cover' }) 
            .toFile(resizedPath);

        const newMovie = await prisma.movie.create({
            data: {
                title,
                description,
                imagePath: `/uploads/${resizedFilename}`, 
                trailerPath,
            },
        });

        // Remove the original image file
        fs.unlinkSync(originalPath);

        res.status(201).json(newMovie);
    } catch (error) {
        console.error('Error adding movie:', error);
        res.status(500).json({ message: 'Failed to add movie.' });
    }
};

const deleteMovie = async (req, res) => {
  const { id } = req.params;

  try {
    const movie = await prisma.movie.findUnique({ where: { id: Number(id) } });
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    await prisma.movie.delete({ where: { id: Number(id) } });
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    console.error("Error deleting movie:", error);
    res.status(500).json({ message: "Failed to delete movie." });
  }
};

const editMovie = async (req, res) => {
    const { id } = req.params;
    const { title, description, trailerPath } = req.body;

    try {
        const existingMovie = await prisma.movie.findUnique({ where: { id: Number(id) } });
        if (!existingMovie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        const updatedMovie = await prisma.movie.update({
            where: { id: Number(id) },
            data: { title, description, trailerPath }, 
        });

        res.json(updatedMovie);
    } catch (error) {
        console.error("Error updating movie:", error);
        res.status(500).json({ message: "Failed to update movie." });
    }
};

const getMovieById = async (req, res) => {
  const { id } = req.params;

  try {
      const movie = await prisma.movie.findUnique({ where: { id: Number(id) } });
      if (!movie) {
          return res.status(404).json({ error: "Movie not found" });
      }
      res.json(movie);
  } catch (error) {
      console.error("Error fetching movie:", error);
      res.status(500).json({ message: "Failed to fetch movie." });
  }
};

module.exports = { getMovies, addMovie, deleteMovie, editMovie, getMovieById };
