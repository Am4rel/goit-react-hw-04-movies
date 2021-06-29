import React, { Component } from 'react';
import fetch from '../Components/fetch';
import MovieList from '../Components/movieList'
import './Search.css';


class SearchMovie extends Component {
    state = {
        searchQuery: this.props.location.search.split("=")[1],
        movieList: []
    };

    onInput = e => (this.setState({ searchQuery: e.target.value }));

    async filmSearch() {
        const filmList = await fetch("search", null, this.state.searchQuery);
        console.log(filmList)
        this.setState({movieList: filmList.data.results });
    }

    onFormSubmit = async (e) => {
        e.preventDefault();
        this.setState({ movieList: [] });
        
        this.props.history.push(`${this.props.match.url}?query=${this.state.searchQuery}`);
        this.filmSearch();
    }

    async componentDidMount() {
        this.props.location.search !== "" && this.filmSearch();
    }

    render() {
        return (
            <>
                <form onSubmit={this.onFormSubmit}>
                    <label className="form">
                        Enter the part of film title:
                        <input type="text" onChange={this.onInput}></input>
                    </label>
                    <button type="submit">Search film!</button>
                </form>
                
                {this.props.location.search !== "" && <> <h2 className="title">Here's your search results:</h2><MovieList movies={this.state.movieList}  location={this.props.location} /></>}
            </>
        )
    }
}

export default SearchMovie;