import { useEffect, useState } from 'react';
import { createProject, getProjects, hasSession } from '../api';

export default function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!hasSession()) return;

    setLoading(true);
    getProjects()
      .then(setProjects)
      .catch((requestError) => setError(requestError.message || 'Unable to load projects'))
      .finally(() => setLoading(false));
  }, []);

  async function addProject(project) {
    const createdProject = await createProject(project);
    setProjects((currentProjects) => [createdProject, ...currentProjects]);
    return createdProject;
  }

  return { projects, addProject, loading, error };
}
