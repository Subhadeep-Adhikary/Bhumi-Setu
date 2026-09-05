const apiBaseUrl = process.env.REACT_APP_API_URL || '/api';
const tokenStorageKey = 'bhumiSetuToken';
const userStorageKey = 'bhumiSetuUser';

function getToken() {
  return localStorage.getItem(tokenStorageKey);
}

export function clearSession() {
  localStorage.removeItem(tokenStorageKey);
  localStorage.removeItem(userStorageKey);
}

async function request(path, options = {}) {
  const headers = {
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
    ...options.headers,
  };
  let response;
  try {
    response = await fetch(`${apiBaseUrl}${path}`, { ...options, headers });
  } catch (error) {
    throw new Error(
      `Cannot connect to the backend at ${apiBaseUrl}. Start MongoDB and the backend server, or set REACT_APP_API_URL correctly.`,
    );
  }
  const data = await response.json().catch(() => ({}));

  if (response.status === 401) {
    clearSession();
    if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
      window.location.assign('/login');
    }
  }

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

export function getCurrentUser() {
  const storedUser = localStorage.getItem(userStorageKey);
  if (!storedUser) return null;

  try {
    return JSON.parse(storedUser);
  } catch (error) {
    return null;
  }
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
    body: JSON.stringify(project),
  });
}
