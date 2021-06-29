import fetch from '../Components/fetch';
import React, {Component} from 'react';

class MovieInfoCast extends Component {
    state = {
        cast: []
    }

    async componentDidMount() {
        const castList = await fetch("actors", this.props.match.params.movieId);

        this.setState({cast: castList.data.cast})
    }

    render() {
        return (
            <>
                <h2 className="title">Cast:</h2>
                {this.state.cast.length > 0 &&
                    <ul className="listBox">
                        {this.state.cast.map(({ profile_path, name, character }) => {
                            const actorImg = profile_path ? `https://image.tmdb.org/t/p/w200${profile_path}` : "https://www.kstech.com//images/easyblog_images/4072/incognito_mode_400.jpg"
                            return <li key={name} className="listItem">
                                <img src={actorImg} alt={name}/>
                                <p>{name}</p>
                                <p>Character: {character}</p>
                            </li>
                        })}
                    </ul>}
            </>
        )
    }
}

export default MovieInfoCast;