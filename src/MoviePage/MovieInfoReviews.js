import React, { Component } from 'react';
import fetch from '../Components/fetch';

class MovieInfoReviews extends Component {
    state = {
        reviews: []
    }

    async componentDidMount() {
        const reviewsList = await fetch("reviews", this.props.match.params.movieId);
        this.setState({reviews: reviewsList.data.results})
    }

    render() {
        return (
            <>
                <h2 className="title">Reviews:</h2>
                {this.state.reviews.length > 0 ?
                    <ul>
                        {this.state.reviews.map(({ author, content }) => {
                            return <li key="content">
                                <p>Author: {author}</p>
                                <p>{content}</p>
                            </li>
                        })}
                    </ul> :
                    <p>We don't have any review of this film yet. You can be first!</p>}
            </>
        )
    }
}

export default MovieInfoReviews;