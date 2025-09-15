import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './App.css';

const FEATURED_INDEX = 0;

function App() {
  const [movies, setMovies] = useState([]);
  const [form, setForm] = useState({ title: '', director: '', releaseYear: '', genre: '', rating: '', poster: '' });
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const carouselRef = useRef(null);
  const [featuredIndex, setFeaturedIndex] = useState(FEATURED_INDEX);
  const [activeNav, setActiveNav] = useState('Discover');
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleNavClick = (nav) => {
    setActiveNav(nav);
  };

  const handleAddToList = (movie) => {
    if (!myList.some(m => m._id === movie._id)) {
      setMyList([...myList, movie]);
    }
  };

  const fetchMovies = async () => {
    const res = await axios.get('http://localhost:5000/api/movies');
    setMovies(res.data);
  };

  const handleScroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`http://localhost:5000/api/movies/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post('http://localhost:5000/api/movies', form);
    }
    setForm({ title: '', director: '', releaseYear: '', genre: '', rating: '', poster: '' });
    setShowForm(false);
    fetchMovies();
  };

  const handleEdit = (movie) => {
    setEditId(movie._id);
    setForm({
      title: movie.title,
      director: movie.director,
      releaseYear: movie.releaseYear,
      genre: movie.genre,
      rating: movie.rating,
      poster: movie.poster || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/movies/${id}`);
    fetchMovies();
  };

  const featuredMovie = movies[featuredIndex];

  return (
    <div className="app-container">
      <nav className="cinema-navbar">
        <div className="nav-left">
          <span className="cinema-logo">🎬</span>
          <span className="cinema-title">Cinema</span>
          <ul className="cinema-menu">
            <li className={activeNav === 'Discover' ? 'active' : ''} onClick={() => handleNavClick('Discover')}>Discover</li>
            <li className={activeNav === 'Movies' ? 'active' : ''} onClick={() => handleNavClick('Movies')}>Movies</li>
            <li className={activeNav === 'My List' ? 'active' : ''} onClick={() => handleNavClick('My List')}>My List</li>
          </ul>
        </div>
        <button className="add-movie-btn" onClick={() => setShowForm(!showForm)}>
          + Add Movie
        </button>
      </nav>

      {featuredMovie && (
        <section className="cinema-hero">
          <div className="hero-backdrop" style={{ backgroundImage: `url(${featuredMovie.poster})` }}></div>
          <div className="hero-content">
            <h2 className="hero-title">{featuredMovie.title}</h2>
            <p className="hero-desc">
              Directed by {featuredMovie.director}. {featuredMovie.genre} | {featuredMovie.releaseYear} | Rating: {featuredMovie.rating}
            </p>
            <div className="hero-actions">
              <button className="hero-btn play-btn">▶ Play</button>
              <button className="hero-btn secondary" onClick={() => handleAddToList(featuredMovie)}>+ My List</button>
            </div>
          </div>
        </section>
      )}

      {showForm && (
        <form className="movie-form" onSubmit={handleSubmit}>
          <div className="form-header">
            <h3>{editId ? 'Edit Movie' : 'Add New Movie'}</h3>
            <button type="button" className="close-btn" onClick={() => setShowForm(false)}>×</button>
          </div>
          <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
          <input name="director" placeholder="Director" value={form.director} onChange={handleChange} required />
          <input name="releaseYear" placeholder="Release Year" value={form.releaseYear} onChange={handleChange} required type="number" />
          <input name="genre" placeholder="Genre" value={form.genre} onChange={handleChange} required />
          <input name="rating" placeholder="Rating (0-10)" value={form.rating} onChange={handleChange} required type="number" step="0.1" min="0" max="10" />
          <input name="poster" placeholder="Poster URL" value={form.poster} onChange={handleChange} required />
          <div className="form-actions">
            <button type="submit" className="submit-btn">{editId ? 'Update Movie' : 'Add Movie'}</button>
            {editId && (
              <button type="button" className="cancel-btn" onClick={() => {
                setEditId(null);
                setForm({ title: '', director: '', releaseYear: '', genre: '', rating: '', poster: '' });
              }}>Cancel</button>
            )}
          </div>
        </form>
      )}

      <section className="carousel-section">
        <div className="carousel-header">
          <h3 className="carousel-title">Popular on Cinema</h3>
          <div className="carousel-controls">
            <button onClick={() => handleScroll('left')} className="carousel-control left">‹</button>
            <button onClick={() => handleScroll('right')} className="carousel-control right">›</button>
          </div>
        </div>
        <div className="carousel" ref={carouselRef}>
          {(activeNav === 'My List' ? myList : movies).map((movie, idx) => (
            <div className="carousel-card" key={movie._id} onClick={() => setFeaturedIndex(idx)}>
              <div className="card-poster">
                <img className="carousel-poster" src={movie.poster} alt={movie.title} />
                <div className="card-overlay">
                  <button className="play-btn">▶</button>
                  <div className="card-actions">
                    <button onClick={(e) => { e.stopPropagation(); handleEdit(movie); }} className="action-btn">Edit</button>
                    <button onClick={(e) => { e.stopPropagation(); handleDelete(movie._id); }} className="action-btn delete">Delete</button>
                  </div>
                </div>
              </div>
              <div className="carousel-card-content">
                <h4>{movie.title}</h4>
                <p>{movie.genre} | {movie.releaseYear}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
