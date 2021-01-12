const {combineLatest} = require("rxjs");
const {fromHttpRequest} = require('../utils/http');

const movies = fromHttpRequest('https://orels-moviedb.herokuapp.com/movies')
const directors = fromHttpRequest('https://orels-moviedb.herokuapp.com/directors')
const genres = fromHttpRequest('https://orels-moviedb.herokuapp.com/genres')

combineLatest(movies, directors, genres
    ,(movies, directors, genres) => {
    return movies.map(movie => movie.title).concat(directors.map(director => director.name).concat(genres.map(genre => genre.name)))
    })
    .subscribe(console.log)

