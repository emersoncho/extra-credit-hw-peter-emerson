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
              <td>{result.first_name}</td>
              <td>{result.last_name}</td>
              <td>{result.street_address}</td>
              <td>{result.city}</td>
              <td>{result.state}</td>
              <td>{result.zip}</td>
              <td>{result.telephone}</td>
              <td>{result.email}</td>
              <td>{result.date_of_survey}</td>
              <td>{result.graduation_month}</td>
              <td>{result.graduation_year}</td>
              <td>{result.liked_most}</td>
              <td>{result.interest_source}</td>
              <td>{result.likelihood}</td>
              <td>{result.comments}</td>
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
