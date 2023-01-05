import './App.css';
import { LoginPage } from './components/loginPage';
import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { handleInitialData } from './actions/shared'
import { connect } from 'react-redux'
import { LoadingBar } from 'react-redux-loading-bar'

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


  return (
    <div className="App">
      <LoadingBar />
      <Routes>
        <Route exact path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

const mapStateToProps = ({ authedUser }) => ({
  authedUser: authedUser ? true : false,
});

export default connect(mapStateToProps)(App);
