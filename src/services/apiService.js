import axios from 'axios';

//const API_URL = 'http://localhost:6420/api/surveys'; // Backend API base URL
const API_URL = 'http://127.0.0.1:5000/surveys'

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
const headers = {
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin':'http://127.0.0.1:5000/surveys'
    };
const apiService = {
  getAllSurveys: async () => {
    try {
      const response = await axios.get(API_URL, headers);
      return response.data;
    } catch (error) {
      console.error('Error fetching surveys:', error);
      throw error;
    }
  },

  getSurveyById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching survey ID ${id}:`, error);
      throw error;
    }
  },

  addSurvey: async (surveyData) => {
    try {
      const response = await axios.post(API_URL, surveyData, {headers});
      return response.data;
    } catch (error) {
      console.error('Error adding new survey:', error);
      throw error;
    }
  },

  updateSurvey: async (id, updatedData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedData);
      return response.data;
    } catch (error) {
      console.error(`Error updating survey ID ${id}:`, error);
      throw error;
    }
  },

  deleteSurvey: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error(`Error deleting survey ID ${id}:`, error);
      throw error;
    }
  }
};

export default apiService;
