const apiBaseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const tokenStorageKey = 'bhumiSetuToken';
const userStorageKey = 'bhumiSetuUser';

function getToken() {
  return localStorage.getItem(tokenStorageKey);
}

async function request(path, options = {}) {
  const headers = {
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
    ...options.headers,
  };
  const response = await fetch(`${apiBaseUrl}${path}`, { ...options, headers });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Unable to reach the backend');
  }

  return data;
}

function saveSession(data) {
  localStorage.setItem(tokenStorageKey, data.token);
  localStorage.setItem(userStorageKey, JSON.stringify(data.user));
  return data;
}

export function hasSession() {
  return Boolean(getToken());
}

export function authenticate(mode, credentials) {
  return request(`/auth/${mode}`, {
    method: 'POST',
    body: JSON.stringify(credentials),
  }).then(saveSession);
}

export function getProjects() {
  return request('/projects');
}

export function createProject(project) {
  return request('/projects', {
    method: 'POST',
    body: JSON.stringify({
      ...project,
      compensation: Number(project.compensation || 0),
    }),
  });
}
