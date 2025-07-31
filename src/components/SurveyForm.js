import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import apiService from '../services/apiService';
import zipcodes from '../assets/zipcodes.json';
import logo from '../assets/logo.png';

const likedOptions = ['Students', 'Location', 'Campus', 'Atmosphere', 'Dorm Rooms', 'Sports'];
const interestSources = ['Friends', 'Television', 'Internet', 'Other'];

function SurveyForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isEditMode, setIsEditMode] = useState(false);
  const [surveyForm, setSurveyForm] = useState({
    id: null,
    stu_first: '',
    stu_last: '',
    stu_street: '',
    stu_city: '',
    stu_state: '',
    stu_zip: '',
    stu_phone: '',
    stu_email: '',
    survey_date: '',
    stu_gradmonth: '',
    stu_gradyear: '',
    stu_likedmost: '',
    stu_interestsource: '',
    stu_likelihood: 'Very Likely',
    additional_comments: ''
  });

  // Check query string to detect edit mode
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    const edit = params.get('edit') === 'true';

    if (edit && id) {
      setIsEditMode(true);
      apiService.getSurveyById(id)
        .then(data => setSurveyForm({ ...data }))
        .catch(err => console.error('Failed to load survey:', err));
    } else {
      resetForm();
    }
  }, [location.search]);

  // zip code validation and auto-fill city and state based on zip code
  useEffect(() => {
    const zip = surveyForm.stu_zip.trim();
    if (/^\d{5}$/.test(zip)) {
      const match = zipcodes.find(z => String(z.zip_code) === zip);
      if (match) {
        setSurveyForm(prev => ({ ...prev, stu_city: match.city, stu_state: match.state }));
        return;
      }
    }
    setSurveyForm(prev => ({ ...prev, stu_city: '', stu_state: '' }));
  }, [surveyForm.stu_zip]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && name === 'stu_likedmost') {
      const current = surveyForm.stu_likedmost ? surveyForm.stu_likedmost.split(',') : [];
      const updated = checked ? [...new Set([...current, value])] : current.filter(v => v !== value);
      setSurveyForm(prev => ({ ...prev, stu_likedmost: updated.join(',') }));
    } else {
      setSurveyForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = ['stu_first', 'stu_last', 'stu_zip', 'survey_date'];
    const isValid = requiredFields.every(field => surveyForm[field]);

    if (!isValid) return console.warn('Missing required fields');

    try {
      const formData = {
        ...surveyForm,
        stu_likedmost: surveyForm.stu_likedmost.split(',').map(s => s.trim()).join(',')
      };
      if (isEditMode && formData.id) {
        await apiService.updateSurvey(formData.id, formData);
      } else {
        await apiService.addSurvey(formData);
      }
      navigate('/survey-results');
    } catch (err) {
      console.error('Submit error:', err);
    }
  };

  const onDelete = async () => {
    if (surveyForm.id && window.confirm(`Delete survey ID ${surveyForm.id}?`)) {
      try {
        await apiService.deleteSurvey(surveyForm.id);
        navigate('/survey-results');
      } catch (err) {
        console.error('Delete error:', err);
      }
    }
  };

  const onCancelEdit = () => {
    setIsEditMode(false);
    navigate('/survey-results');
    resetForm();
  };

  const resetForm = () => {
    setSurveyForm({
      id: null,
      stu_first: '',
      stu_last: '',
      stu_street: '',
      stu_city: '',
      stu_state: '',
      stu_zip: '',
      stu_phone: '',
      stu_email: '',
      survey_date: '',
      stu_gradmonth: '',
      stu_gradyear: '',
      stu_likedmost: '',
      stu_interestsource: '',
      stu_likelihood: 'Very Likely',
      additional_comments: ''
    });
  };

  return (
    <div className="container my-2">
      <img className="logo mb-2" src={logo} alt="Logo" />
      <section className="mt-3">
        <h1 className="mb-1">Survey for Prospective Students</h1>
        {isEditMode && surveyForm.id && (
          <div className="mb-3"><strong>Now editing Record ID:</strong> {surveyForm.id}</div>
        )}
      </section>

      <form onSubmit={handleSubmit} autoComplete="on">
        {/* Each input should follow the same pattern: label + value + validation */}
        {/* For brevity, only a few inputs shown here, full set in your original Vue file should be copied */}

        {/* First Name */}
        <div className="row mb-3 justify-content-center item">
          <div className="col-md-4">
            <label className="form-label" htmlFor="stu_first">First Name<span className="text-danger">*</span></label>
            <input type="text" name="stu_first" className="form-control" value={surveyForm.stu_first} onChange={handleChange} required />
          </div>
        
        {/* Last Name */}
          <div className="col-md-4">
            <label className="form-label" htmlFor="stu_last">Last Name<span className="text-danger">*</span></label>
            <input type="text" name="stu_last" className="form-control" value={surveyForm.stu_last} onChange={handleChange} required />
          </div>
        </div>

        <div className="row mb-3 justify-content-center item">
                {/* Street Address */}
                <div className="col-md-8">
                    <label className="form-label" htmlFor="stu_street">Street Address<span className="text-danger">*</span></label>
                    <input type="text" name="stu_street" className="form-control" value={surveyForm.street} onChange={handleChange} placeholder="123 Main St" required />
                </div>
            </div>

        <div className="row mb-3 justify-content-center item">
            <div className="col-md-4">
                {/* City */}
                <label className="form-label" htmlFor="stu_city">City<span className="text-danger">*</span></label>
                <input type="text" name="stu_city" className="form-control" value={surveyForm.stu_city} readOnly />
            </div>
            <div className="col-md-2">
                {/* State */}
                <label className="form-label" htmlFor="stu_state">State<span className="text-danger">*</span></label>
                <input type="text" name="stu_state" className="form-control" value={surveyForm.stu_state} readOnly />
            </div>
            <div className="col-md-2">
                {/* Zip Code */}
                <label className="form-label" htmlFor="stu_zip">Zip Code<span className="text-danger">*</span></label>
                <input type="text" name="stu_zip" className="form-control" placeholder="22030" pattern="\d{5}" value={surveyForm.stu_zip} onChange={handleChange} required />
            </div>
        </div>

        <div className="row mb-3 justify-content-center item">
            <div className="col-md-3">
                {/* Phone Number */}
                <label className="form-label" htmlFor="stu_phone">Phone Number<span className="text-danger">*</span></label>
                <input
                type="tel"
                name="stu_phone"
                className="form-control"
                placeholder="7031234567"
                pattern="\d{10}"
                value={surveyForm.stu_phone}
                onChange={handleChange}
                required
                />
            </div>
            <div className="col-md-5">
                {/* Email */}
                <label className="form-label" htmlFor="stu_email">Email<span className="text-danger">*</span></label>
                <input
                type="email"
                name="stu_email"
                className="form-control"
                placeholder="example@domain.com"
                value={surveyForm.stu_email}
                onChange={handleChange}
                required
                />
            </div>
        </div>

        <div className="row mb-3 justify-content-center item">
            <div className="col-md-4">
                {/* Date of Survey */}
                <label className="form-label" htmlFor="survey_date">Date of Survey<span className="text-danger">*</span></label>
                <input
                type="date"
                name="survey_date"
                className="form-control"
                value={surveyForm.survey_date}
                onChange={handleChange}
                required
                />
            </div>
        </div>

        <div className="row mb-3 justify-content-center item">
            <div className="col-md-4">
                {/* Graduation Month */}
                <label className="form-label" htmlFor="stu_gradmonth">HS Graduation Month</label>
                <select name="stu_gradmonth" className="form-select" value={surveyForm.stu_gradmonth} onChange={handleChange}>
                <option value="">Select a month</option>
                {['January','February','March','April','May','June','July','August','September','October','November','December'].map(m => (
                    <option key={m}>{m}</option>
                ))}
                </select>
            </div>
            <div className="col-md-4">
                {/* Graduation Year */}
                <label className="form-label" htmlFor="stu_gradyear">HS Graduation Year</label>
                <input
                type="text"
                name="stu_gradyear"
                className="form-control"
                placeholder="2023"
                pattern="\d{4}"
                value={surveyForm.stu_gradyear}
                onChange={handleChange}
                />
            </div>
        </div>

        <div className="row mb-3 justify-content-center item">
            <div className="col-md-8">
                {/* Liked Most */}
                <label className="form-label" htmlFor="stu_likedmost">What did you like most about our campus?</label>
                <div className="row">
                {[0, 1].map(col => (
                    <div className="col-md-6" key={`liked-col-${col}`}>
                    {likedOptions.slice(col * 3, col * 3 + 3).map(option => (
                        <div className="form-check" key={option}>
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id={option}
                            name="stu_likedmost"
                            value={option}
                            checked={surveyForm.stu_likedmost.split(',').includes(option)}
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor={option}>{option}</label>
                        </div>
                    ))}
                    </div>
                ))}
                </div>
            </div>
        </div>

        <div className="row mb-3 justify-content-center item">
            <div className="col-md-8">
                {/* Interest Source */}
                <label className="form-label" htmlFor="stu_interestsource">How did you become interested in enrolling at George Mason?</label>
                <div className="row">
                {[0, 1].map(col => (
                    <div className="col-md-6" key={`source-col-${col}`}>
                    {interestSources.slice(col * 2, col * 2 + 2).map(source => (
                        <div className="form-check" key={source}>
                        <input
                            type="radio"
                            className="form-check-input"
                            name="stu_interestsource"
                            id={source}
                            value={source}
                            checked={surveyForm.stu_interestsource === source}
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor={source}>{source}</label>
                        </div>
                    ))}
                    </div>
                ))}
                </div>
            </div>
        </div>

        <div className="row mb-3 justify-content-center item">
            <div className="col-md-8">
                {/* Likelihood */}
                <label className="form-label" htmlFor="stu_likelihood">How likely would you recommend this school?</label>
                <select
                name="stu_likelihood"
                className="form-select"
                value={surveyForm.stu_likelihood}
                onChange={handleChange}
                >
                <option value="Very Likely">Very Likely</option>
                <option value="Likely">Likely</option>
                <option value="Unlikely">Unlikely</option>
                </select>
            </div>
        </div>

        <div className="row mb-3 justify-content-center item">
            <div className="col-md-8">
                {/* Additional Comments */}
                <label className="form-label" htmlFor="additional_comments">Additional Comments</label>
                <textarea
                name="additional_comments"
                className="form-control"
                rows="3"
                placeholder="Your comments here..."
                value={surveyForm.additional_comments}
                onChange={handleChange}
                />
            </div>
        </div>

        <div className="row mb-3 justify-content-center item">
          <button type="submit" className={`btn ${isEditMode ? 'btn-primary' : 'btn-success'} w-50`}>
            {isEditMode ? 'Update' : 'Submit'}
          </button>
        </div>

        {!isEditMode && (
        <div className="row mb-3 justify-content-center item">
            <button
            type="reset"
            className="btn btn-secondary w-50"
            onClick={resetForm}
            >
            Cancel / Reset
            </button>
        </div>
        )}
        
        {isEditMode && (
          <>
            <div className="row mb-3 justify-content-center item">
              <button type="button" className="btn btn-danger w-50" onClick={onDelete}>Delete this Survey</button>
            </div>
            <div className="row mb-3 justify-content-center item">
              <button type="button" className="btn btn-secondary w-50" onClick={onCancelEdit}>Cancel edit</button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default SurveyForm;
