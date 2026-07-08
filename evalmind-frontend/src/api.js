import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
  headers: { 'Content-Type': 'application/json' },
});

export const startInterview = (level) =>
  api.post('/start-interview', { level }).then(r => r.data);

export const submitAnswer = (session_id, question_id, user_answer) =>
  api.post('/submit-answer', { session_id, question_id, user_answer }).then(r => r.data);

export const pauseInterview = (session_id) =>
  api.post('/pause-interview', { session_id }).then(r => r.data);

export const resumeInterview = (session_id) =>
  api.post('/resume-interview', { session_id }).then(r => r.data);

export const stopInterview = (session_id) =>
  api.post('/stop-interview', { session_id }).then(r => r.data);

export const getInterviewResult = (session_id) =>
  api.get(`/get-interview-result/${session_id}`).then(r => r.data);

export const evaluateInterview = (responses) =>
  api.post('/evaluate', { responses }).then(r => r.data);
