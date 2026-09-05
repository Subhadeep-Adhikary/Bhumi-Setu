import { useEffect, useState } from 'react';
import { createProject, getProjects, hasSession } from '../api';

export default function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const authenticated = hasSession();

  useEffect(() => {
    if (!authenticated) return;

    setLoading(true);
    getProjects()
      .then(setProjects)
      .catch((requestError) => setError(requestError.message || 'Unable to load projects'))
      .finally(() => setLoading(false));
  }, [authenticated]);

  async function addProject(project) {
    const createdProject = await createProject(project);
    setProjects((currentProjects) => [createdProject, ...currentProjects]);
    return createdProject;
  }

  function updateProject(updatedProject) {
    setProjects((currentProjects) => currentProjects.map((project) => (
      project.id === updatedProject.id ? updatedProject : project
    )));
  }

  return { projects, addProject, updateProject, loading, error };
}
