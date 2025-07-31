import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';
import './SurveyResults.css';
import logo from '../assets/logo.png';

function SurveyResults() {
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = () => {
    apiService.getAllSurveys()
      .then(data => setResults(data))
      .catch(err => console.error('Failed to fetch survey results:', err));
  };

  const deleteResult = (id) => {
    if (window.confirm(`Are you sure you want to delete survey ID ${id}?`)) {
      apiService.deleteSurvey(id)
        .then(() => loadResults())
        .catch(err => console.error(`Failed to delete survey ID ${id}:`, err));
    }
  };

  const editResult = (id) => {
    navigate(`/survey-form?edit=true&id=${id}`);
  };

  return (
    <div className="table-container my-2">
      <img className="logo mb-2" src={logo} alt="Logo" />
      <section className="mt-3">
        <h1 className="mb-1">Survey Results</h1>
      </section>
      <table className="results-table">
        <thead>
          <tr>
            <th className="col-id">ID</th>
            <th className="col-first">First</th>
            <th className="col-last">Last</th>
            <th className="col-street">Street</th>
            <th className="col-city">City</th>
            <th className="col-state">State</th>
            <th className="col-zip">Zip</th>
            <th className="col-phone">Phone</th>
            <th className="col-email">Email</th>
            <th className="col-svdate">Survey Date</th>
            <th className="col-gradm">Grad Month</th>
            <th className="col-grady">Grad Year</th>
            <th className="col-liked">Liked Most</th>
            <th className="col-interest">Interest Source</th>
            <th className="col-likelihood">Likelihood</th>
            <th className="col-comment">Additional Comments</th>
            <th className="actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {results.map(result => (
            <tr key={result.id}>
              <td className="id-row">{result.id}</td>
              <td>{result.stu_first}</td>
              <td>{result.stu_last}</td>
              <td>{result.stu_street}</td>
              <td>{result.stu_city}</td>
              <td>{result.stu_state}</td>
              <td>{result.stu_zip}</td>
              <td>{result.stu_phone}</td>
              <td>{result.stu_email}</td>
              <td>{result.survey_date}</td>
              <td>{result.stu_gradmonth}</td>
              <td>{result.stu_gradyear}</td>
              <td>{result.stu_likedmost}</td>
              <td>{result.stu_interestsource}</td>
              <td>{result.stu_likelihood}</td>
              <td>{result.additional_comments}</td>
              <td className="actions">
                <button onClick={() => editResult(result.id)}>Edit</button>
                <button onClick={() => deleteResult(result.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SurveyResults;
