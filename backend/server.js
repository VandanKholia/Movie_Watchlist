const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoDBUrl = process.env.URI;
require('dotenv').config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB
mongoose.connect(mongoDBUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const movieSchema = new mongoose.Schema({
  imdbID: String,
  title: String,
  year: String,
  poster: String,
});

const Movie = mongoose.model('Movie', movieSchema);


app.delete('/api/watchlist/:imdbID', async (req, res) => {
  const { imdbID } = req.params;

  try {
    const result = await Movie.findOneAndDelete({ imdbID });
    
    if (!result) {
      return res.status(404).json({ message: 'Movie not found in the watchlist' });
    }

    res.status(200).json({ message: 'Movie removed from watchlist' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


app.post('/api/watchlist', async (req, res) => {
  const { imdbID, title, year, poster } = req.body;

  
  const existingMovie = await Movie.findOne({ imdbID });
  if (existingMovie) {
    return res.status(400).json({ message: 'Movie already in watchlist' });
  }

  const newMovie = new Movie({ imdbID, title, year, poster });
  await newMovie.save();
  res.status(201).json(newMovie);
});


app.get('/api/watchlist', async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});


app.listen(3001, () => console.log(`Server running on port 3001`));
