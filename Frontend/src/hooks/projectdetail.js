import { useMemo } from 'react';

export function getProjectProgress(project) {
  if (!project) return 0;

  const stages = project.stages || [];
  const payments = project.compensation?.payments || [];
  const documents = project.documents || [];
  const completedStages = stages.filter((stage) => stage.status === 'completed').length;
  const paidCompensation = payments.filter((payment) => payment.status === 'Paid').length;
  const completedDocuments = documents.filter((document) => document.status === 'Verified').length;
  const totalItems = stages.length + payments.length + documents.length;

  if (totalItems === 0) return 0;
  return Math.round(((completedStages + paidCompensation + completedDocuments) / totalItems) * 100);
}

export function isProjectCompleted(project) {
  if (!project) return false;

  return (project.stages || []).every((stage) => stage.status === 'completed')
    && (project.compensation?.payments || []).every((payment) => payment.status === 'Paid')
    && (project.documents || []).every((document) => document.status === 'Verified');
}

export function areAllLandownersPaid(project) {
  const payments = project?.compensation?.payments || [];
  return payments.length > 0 && payments.every((payment) => payment.status === 'Paid');
}

export function areAllDocumentsVerified(project) {
  const documents = project?.documents || [];
  return documents.length > 0 && documents.every((document) => document.status === 'Verified');
}

export function isLandAcquired(project) {
  if (!project) return false;
  if (project.landStatus === 'acquired' || project.acquisitionStatus === 'acquired') return true;

  const preCompensationStages = (project.stages || []).filter((stage) => stage.title !== 'Compensation');
  return preCompensationStages.length > 0
    && preCompensationStages.every((stage) => stage.status === 'completed');
}

export function useProjectDetail(projectId, projects = []) {
  return useMemo(
    () => projects.find((project) => project.id === projectId) || null,
    [projectId, projects],
  );
}

export default useProjectDetail;
