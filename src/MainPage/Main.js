import React, { Component } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import MovieList from '../Components/movieList'

const AUTH_TOKEN = "4e3ee43a33940cdc2c536aa8c24e20b3";

class Main extends Component {
    state = {
        movies: []
    };
  
  async componentDidMount() {
        const moviesList = await axios(`https://api.themoviedb.org/3/trending/all/day?api_key=${AUTH_TOKEN}`);
        this.setState({ movies: moviesList.data.results })
    }

    render() {
        return (
            <>
                <h1 className="title">Trending movies today:</h1>
                {this.state.movies.length > 0 ? <MovieList movies={this.state.movies} location={this.props.location}/> : <h2>Loading...</h2>}
            </>
        )}
}

export default Main;