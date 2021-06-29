import React, {Component, lazy, Suspense} from 'react';
import { Route, Switch } from 'react-router-dom';
import Navigation from './Navigation/Navigation';
import './styles.css'

const MainView = lazy(() => import('./MainPage/Main' /* webpackChunkName: "home-page" */));
const MovieInfoView = lazy(() => import('./MoviePage/MovieInfo' /* webpackChunkName: "movie-page" */));
const SearchView = lazy(() => import('./SearchMovie/SearchMovie' /* webpackChunkName: "search-page" */));

class App extends Component {
  render() {
    return (
      <>
        <Navigation />

        <Suspense fallback="Loading...">
          <Switch>
            <Route path="/" exact component={MainView} />
            <Route path="/movies/:movieId" component={MovieInfoView} />
            <Route path="/movies" component={SearchView} />
          </Switch> 
        </Suspense>
        
        
      </>
    );
  }
}

export default App;
