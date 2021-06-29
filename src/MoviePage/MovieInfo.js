import React, { Component } from 'react';
import fetch from '../Components/fetch';
import MovieInfoCast from './MovieInfoCast';
import MovieInfoReviews from './MovieInfoReviews';
import { NavLink, Route, Switch } from 'react-router-dom';
import './moviePage.css';


class MovieInfo extends Component {
    state = {
        title: "",
        userScore: 0,
        overview: "",
        genres: [],
        date: "",
        poster: ""
    }
    async componentDidMount() {
        const movie = await fetch("filmInfo", this.props.match.params.movieId);
        const { title, overview, vote_average, genres, release_date, poster_path } = movie.data;
        const genresList=[]
        genres.map((genre) => { return genresList.push(genre.name) })
        const posterImg = poster_path ? `https://image.tmdb.org/t/p/w300${poster_path}` : "https://image.flaticon.com/icons/png/512/2790/2790961.png"

        this.setState({title: title, userScore: vote_average, overview: overview, genres: genresList, date: release_date, poster: posterImg})
    }

    onBackButtonClick = () => {
        const { state } = this.props.location;

        if (state) {
            this.props.history.push(state.from);
            return;
        };
        
        this.props.history.push({
            pathname: '/',
        });
    }

    render() {
        const { title, poster, date, userScore, overview, genres } = this.state;
        const productionYear = date.split("-")[0];
        return (
            <>
                <div>
                    <div className="filmInfoBox">
                        <img src={poster} alt={`${title} poster`} width="300" />
                        <div className="filmInfoBoxMain">
                            <button type="button" onClick={this.onBackButtonClick}>{`<-- Back`}</button>
                            <h2 className="filmInfoBoxItem">{title} ({productionYear})</h2>
                            <p className="filmInfoBoxItem">User score: {userScore}</p>
                            <h4 className="filmInfoBoxItem">Overwiev</h4>
                            <p className="filmInfoBoxItem">{overview ? overview : <span>Here should be an overview, but we don't have it yet...</span>}</p>
                            <h4 className="filmInfoBoxItem">Genres</h4>
                            <ul className="filmInfoBoxItem">
                                {genres.map(genre => <li key={genre}>{genre}</li>)}
                            </ul>
                        </div>
                    </div>
                    <div className="additionalInfo">
                        <h2 className="title">Additional information:</h2>
                        <ul className="additionalInfoList">
                            <li>
                                <NavLink  className="NavLink" activeClassName="NavLink-active"
                                    to={{
                                        pathname: `${this.props.match.url}/cast`,
                                        state: this.props.location.state && { from: this.props.location.state.from },
                                    }}>Cast
                                </NavLink>
                            </li>
                            <li>
                                <NavLink  className="NavLink" activeClassName="NavLink-active"
                                    to={{pathname: `${this.props.match.url}/reviews`,
                                        state: this.props.location.state && { from: this.props.location.state.from },
                                    }}>Reviews
                                </NavLink>
                            </li>
                        </ul>
                
                    </div>
                </div>
                <Switch>
                    <Route path={`${this.props.match.path}/cast`} component={MovieInfoCast} />
                    <Route path={`${this.props.match.path}/reviews`} component={MovieInfoReviews} />
                </Switch>
            </>
        )
    }
}

export default MovieInfo;