import './App.css';
import { LoginPage } from './components/loginPage';
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
