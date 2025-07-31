import {BrowserRouter as Router, Route, Routes } from'react-router-dom'
import Navbar from './components/Navbar'
import AboutPage from './components/AboutPage'
import SurveyForm from './components/SurveyForm'
import SurveyResults from './components/SurveyResults'

import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<AboutPage />} />
        <Route path="/survey-form" element={<SurveyForm />} />
        <Route path="/survey-results" element={<SurveyResults />} />
        <Route path="/edit/:id" element={<SurveyForm editMode />} />
      </Routes>
    </Router>
  );
}

export default App;
