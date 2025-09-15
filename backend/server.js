require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Movie Schema
const movieSchema = new mongoose.Schema({
  title: String,
  director: String,
  releaseYear: Number,
  genre: String,
  rating: Number,
  poster: String
});

const Movie = mongoose.model('Movie', movieSchema);

// REST API Endpoints
app.get('/api/movies', async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

app.post('/api/movies', async (req, res) => {
  const movie = new Movie(req.body);
  await movie.save();
  res.status(201).json(movie);
});

app.put('/api/movies/:id', async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(movie);
});

app.delete('/api/movies/:id', async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/movies', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error(err));