import { useMemo } from 'react';

const projectRecords = [
  {
    id: 'P001',
    name: 'Polavaram Irrigation Canal Network',
    state: 'Andhra Pradesh',
    district: 'West Godavari',
    status: 'completed',
    progress: 100,
    risk: 'Low',
    stages: [
      { title: 'Social Impact Assessment', short: 'SIA', description: 'Pre-Process', date: 'Sec. 15', status: 'completed' },
      { title: 'Preliminary Notification', short: 'S.19', description: 'Declaration', date: 'Sec. 19', status: 'completed' },
      { title: 'Objections & Hearing', short: 'S.23', description: 'Hearing', date: 'Sec. 23', status: 'completed' },
      { title: 'Declaration', short: 'S.77', description: 'Award & Acquisition', date: 'Sec. 77', status: 'completed' },
      { title: 'Award', short: 'S.77', description: 'Compensation', date: 'Sec. 77', status: 'completed' },
      { title: 'Compensation', short: 'S.77', description: 'Disbursement', date: 'Sec. 77', status: 'completed' },
    ],
    compensation: {
      landArea: '2.4',
      marketValue: '1200000',
      multiplier: 'Rural (2x)',
      landUse: 'Agricultural — Irrigated',
      solatiumRate: 0.1,
      payments: [
        { name: 'Ramesh Kumar Singh', amount: 2880000, date: '12 Jul 2026', status: 'Paid' },
        { name: 'Sunita Devi', amount: 1320000, date: '—', status: 'Pending' },
        { name: 'Prakash Naik', amount: 960000, date: '—', status: 'Processing' },
      ],
    },
    documents: [
      { name: 'Jambandi_NH44_Parcel_2341.pdf', owner: 'Ramesh Kumar Singh', plot: '2341', area: '2.4 ha', match: 98, status: 'Verified', action: 'View' },
      { name: 'Khatiyan_DFC_Parcel_8812.pdf', owner: 'Sunita Devi', plot: '8812', area: '1.1 ha', match: 63, status: 'Mismatch', action: 'View', flagged: true },
      { name: 'Form_712_Pune_Metro_P842.pdf', owner: 'Prakash Naik', plot: 'P842', area: '0.8 ha', match: 0, status: 'Processing...', action: 'View', pending: true },
    ],
  },
  {
    id: 'P002',
    name: 'Pune-Mumbai Hyperloop Corridor',
    state: 'Maharashtra',
    district: 'Pune',
    status: 'pending',
    progress: 42,
    risk: 'Medium',
    stages: [
      { title: 'Social Impact Assessment', short: 'SIA', description: 'Pre-Process', date: 'Sec. 15', status: 'completed' },
      { title: 'Preliminary Notification', short: 'S.19', description: 'Declaration', date: 'Sec. 19', status: 'completed' },
      { title: 'Objections & Hearing', short: 'S.23', description: 'Hearing', date: 'Sec. 23', status: 'active', activeLabel: 'In Progress' },
      { title: 'Declaration', short: 'S.77', description: 'Award & Acquisition', date: 'Sec. 77', status: 'pending' },
      { title: 'Award', short: 'S.77', description: 'Compensation', date: 'Sec. 77', status: 'pending' },
      { title: 'Compensation', short: 'S.77', description: 'Disbursement', date: 'Sec. 77', status: 'pending' },
    ],
    compensation: {
      landArea: '1.8',
      marketValue: '1850000',
      multiplier: 'Urban',
      landUse: 'Residential',
      solatiumRate: 0.1,
      payments: [
        { name: 'Meena Joshi', amount: 3663000, date: '—', status: 'Pending' },
        { name: 'Vijay Patil', amount: 1980000, date: '—', status: 'Pending' },
      ],
    },
    documents: [
      { name: 'PropertyCard_Pune_104.pdf', owner: 'Meena Joshi', plot: '104', area: '1.2 ha', match: 96, status: 'Verified', action: 'View' },
      { name: '7_12Extract_Pune_218.pdf', owner: 'Vijay Patil', plot: '218', area: '0.6 ha', match: 78, status: 'Mismatch', action: 'View', flagged: true },
    ],
  },
];

export function getProjectProgress(project) {
  const completedStages = project.stages.filter((stage) => stage.status === 'completed').length;
  const paidCompensation = project.compensation.payments.filter((payment) => payment.status === 'Paid').length;
  const completedDocuments = project.documents.filter((document) => document.status === 'Verified').length;
  const totalItems = project.stages.length + project.compensation.payments.length + project.documents.length;

  if (totalItems === 0) return 0;

  return Math.round(((completedStages + paidCompensation + completedDocuments) / totalItems) * 100);
}

export function isProjectCompleted(project) {
  return project.stages.every((stage) => stage.status === 'completed')
    && project.compensation.payments.every((payment) => payment.status === 'Paid')
    && project.documents.every((document) => document.status === 'Verified');
}

export const projectDetails = projectRecords.map((project) => ({
  ...project,
  status: isProjectCompleted(project) ? 'completed' : 'pending',
  progress: getProjectProgress(project),
}));

export function useProjectDetail(projectId) {
  return useMemo(
    () => projectDetails.find((project) => project.id === projectId) || projectDetails[0],
    [projectId],
  );
}

export default useProjectDetail;