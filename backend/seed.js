require('dotenv').config();
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  director: String,
  releaseYear: Number,
  genre: String,
  rating: Number,
  poster: String
});

const Movie = mongoose.model('Movie', movieSchema);

const seedMovies = [
  {
    title: "Oppenheimer",
    director: "Christopher Nolan",
    year: 2023,
    genre: "Biography, Drama, History",
    rating: 8.4,
    poster: "https://image.tmdb.org/t/p/original/8Gxv8gSFCU0XGDyKEGv7zR1n2ua.jpg"
  },
  {
    title: "The Dark Knight",
    director: "Christopher Nolan",
    releaseYear: 2008,
    genre: "Action, Crime, Drama",
    rating: 9.0,
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
  },
  {
    title: "The Matrix",
    director: "Lana Wachowski, Lilly Wachowski",
    releaseYear: 1999,
    genre: "Action",
    rating: 8.7,
    poster: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg"
  },
  {
    title: "Interstellar",
    director: "Christopher Nolan",
    releaseYear: 2014,
    genre: "Sci-Fi",
    rating: 8.6,
    poster: "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg"
  },
  {
    title: "The Godfather",
    director: "Francis Ford Coppola",
    releaseYear: 1972,
    genre: "Crime",
    rating: 9.2,
    poster: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg"
  }
];

async function seedDB() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/movies', { useNewUrlParser: true, useUnifiedTopology: true });
  await Movie.deleteMany({});
  await Movie.insertMany(seedMovies);
  console.log('Database seeded with 5 movies');
  mongoose.disconnect();
}

seedDB();