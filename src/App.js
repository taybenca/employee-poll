import './App.css';
import LoginPage from './components/LoginPage';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { handleInitialData } from './actions/shared';
import { connect } from 'react-redux';
import { LoadingBar } from 'react-redux-loading-bar';
import AuthorisedRoute from './components/AuthorisedRoute';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import PollPage from './components/PollPage';

function App(props) {

  // getting all data from api
  useEffect(() => {
    let mounted = true
    if (mounted) {
      props.dispatch(handleInitialData())
    }
    return () => {
      mounted = false
    }
  }, [])
console.log(props)

  return (
    <div className="App">
      <LoadingBar />
      <div>
        {props.authedUser ? <Navbar /> : <></>}
        <Routes>
          <Route
            path="/"
            element={
              <AuthorisedRoute>
                <HomePage />
              </AuthorisedRoute>
            }
          />
          <Route
            exact
            path="/add"
            element={
              <AuthorisedRoute>
                {/* <NewPoll /> */}
              </AuthorisedRoute>
            }
          />
          <Route
            exact
            path="/leaderboard"
            element={
              <AuthorisedRoute>
                {/* <Leaderboard /> */}
              </AuthorisedRoute>
            }
          />
          <Route
            exact
            path="/questions/:id"
            element={
              <AuthorisedRoute>
                <PollPage />
              </AuthorisedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/404" element={<Error404Page />} /> */}
        </Routes>
      </div>
    </div>
  );
}

const mapStateToProps = ({ authedUser }) => ({
  authedUser: authedUser ? true : false,
});

export default connect(mapStateToProps)(App);

