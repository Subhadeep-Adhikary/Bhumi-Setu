import { useEffect, useMemo, useState } from 'react';
import { Box, Button, FormControl, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { compensateProject } from '../api';
import { areAllDocumentsVerified, useProjectDetail } from '../hooks/projectdetail';

const multiplierMap = {
  Urban: 1,
  'Rural (2x)': 2,
};

const landUseOptions = [
  'Agricultural — Irrigated',
  'Agricultural — Unirrigated',
  'Residential',
  'Commercial',
  'Industrial',
];

function CompensationCalc({ projectId, projects, onUpdated }) {
  const project = useProjectDetail(projectId, projects);
  const projectData = useMemo(() => project || {
    compensation: { landArea: '0', marketValue: '0', multiplier: 'Urban', landUse: 'Agricultural — Irrigated', solatiumRate: 0, payments: [] },
    documents: [],
    stages: [],
  }, [project]);
  const [landArea, setLandArea] = useState(projectData.compensation.landArea);
  const [marketValue, setMarketValue] = useState(projectData.compensation.marketValue);
  const [multiplier, setMultiplier] = useState(projectData.compensation.multiplier);
  const [landUse, setLandUse] = useState(projectData.compensation.landUse);
  const [paying, setPaying] = useState('');
  const [paymentStatuses, setPaymentStatuses] = useState(() => (
    Object.fromEntries(projectData.compensation.payments.map((payment) => [payment.name, payment.status]))
  ));

  useEffect(() => {
    setLandArea(projectData.compensation.landArea);
    setMarketValue(projectData.compensation.marketValue);
    setMultiplier(projectData.compensation.multiplier);
    setLandUse(projectData.compensation.landUse);
    setPaymentStatuses(Object.fromEntries(
      projectData.compensation.payments.map((payment) => [payment.name, payment.status]),
    ));
  }, [projectData]);

  const calculations = useMemo(() => {
    const area = Number(landArea) || 0;
    const baseRate = Number(marketValue) || 0;
    const multiplierFactor = multiplierMap[multiplier] || 1;

    const base = area * baseRate;
    const additional = base * (multiplierFactor - 1);
    const baseMarketValue = base + additional;
    const solatium = baseMarketValue * projectData.compensation.solatiumRate;
    const totalComp = baseMarketValue + solatium;

    return {
      area,
      baseRate,
      base,
      additional,
      multiplierFactor,
      baseMarketValue,
      solatium,
      totalComp,
    };
  }, [landArea, marketValue, multiplier, projectData.compensation.solatiumRate]);

  const statusColor = {
    Paid: '#dfece7',
    Pending: '#f1e2c8',
    Processing: '#dfeaf9',
  };

  const statusTextColor = {
    Paid: '#0d6d5d',
    Pending: '#a76a17',
    Processing: '#2d6fbe',
  };

  const paymentReady = areAllDocumentsVerified(project) && calculations.totalComp > 0;

  async function payLandowner(name) {
    if (!paymentReady) return;
    setPaying(name);
    try {
      const updatedProject = await compensateProject(project._id || project.id, {
        area: multiplier === 'Rural (2x)' ? 'rural' : 'urban',
        realPrice: marketValue,
      });
      setPaymentStatuses(Object.fromEntries(
        updatedProject.compensation.payments.map((payment) => [payment.name, payment.status]),
      ));
      onUpdated(updatedProject);
    } finally {
      setPaying('');
    }
  }

  if (!project) return <Typography sx={{ p: 4, color: '#4d7866' }}>No project selected</Typography>;

  const formatCurrency = (value) => new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
  const formatNumber = (value) => new Intl.NumberFormat('en-IN').format(value);

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: 'calc(100vh - 90px)',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'stretch',
        gap: 3,
        bgcolor: '#f0f4ef',
        p: 2.5,
        boxSizing: 'border-box',
      }}
    >
      <Box sx={{ flex: 1, width: { xs: '100%', md: '50%' }, display: 'flex', flexDirection: 'column', gap: 2.5, bgcolor: '#fffdfa', borderRadius: 3, p: 4, border: '1px solid #e6e9e4', boxSizing: 'border-box' }}>
        <Box>
          <Typography sx={{ fontSize: 18, fontWeight: 900, mb: 1.2 }}>LAND AREA (HECTARES)</Typography>
          <TextField
            fullWidth
            value={landArea}
            onChange={(e) => setLandArea(e.target.value)}
            inputProps={{ style: { fontSize: 22, fontWeight: 800, padding: '18px 16px' } }}
            sx={{
              '& .MuiOutlinedInput-root': { bgcolor: '#fff', borderRadius: 2.5, height: 62 },
            }}
          />
          <Typography sx={{ fontSize: 15, fontWeight: 600, color: '#5a6f67', mt: 1 }}>Total affected area</Typography>
        </Box>

        <Box>
          <Typography sx={{ fontSize: 18, fontWeight: 900, mb: 1.2 }}>MARKET VALUE (₹/HA)</Typography>
          <TextField
            fullWidth
            value={marketValue}
            onChange={(e) => setMarketValue(e.target.value)}
            inputProps={{ style: { fontSize: 22, fontWeight: 800, padding: '18px 16px' } }}
            sx={{
              '& .MuiOutlinedInput-root': { bgcolor: '#fff', borderRadius: 2.5, height: 62 },
            }}
          />
          <Typography sx={{ fontSize: 15, fontWeight: 600, color: '#5a6f67', mt: 1 }}>As per collector rate</Typography>
        </Box>

        <Box>
          <Typography sx={{ fontSize: 18, fontWeight: 900, mb: 1.5 }}>RURAL/URBAN MULTIPLIER</Typography>
          <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
            {Object.keys(multiplierMap).map((option) => (
              <Box key={option} component="button" type="button" onClick={() => setMultiplier(option)} sx={{ cursor: 'pointer', px: 2.8, py: 1.3, borderRadius: 10, fontSize: 16, fontWeight: 800, bgcolor: multiplier === option ? '#0f5132' : '#fff', color: multiplier === option ? '#fff' : '#1a1a1a', border: `1px solid ${multiplier === option ? '#0f5132' : '#e0e5de'}` }}>
                {option}
              </Box>
            ))}
          </Stack>
        </Box>

        <Box>
          <Typography sx={{ fontSize: 18, fontWeight: 900, mb: 1.5 }}>LAND USE TYPE</Typography>
          <FormControl fullWidth>
            <Select
              value={landUse}
              onChange={(e) => setLandUse(e.target.value)}
              sx={{ bgcolor: '#fff', borderRadius: 2.5, height: 62, fontWeight: 700, fontSize: 19 }}
            >
              {landUseOptions.map((option) => (
                <MenuItem key={option} value={option} sx={{ fontSize: 17 }}>{option}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Box sx={{ flex: 1, width: { xs: '100%', md: '50%' }, display: 'flex', flexDirection: 'column', gap: 3, boxSizing: 'border-box' }}>
        <Box sx={{ bgcolor: '#fffdfa', borderRadius: 3, p: 4, border: '1px solid #e6e9e4', flex: 1 }}>
          <Typography sx={{ fontSize: 18, fontWeight: 900, mb: 2 }}>BASE MARKET VALUE</Typography>
          <Typography sx={{ fontSize: 22, fontWeight: 800 }}>{calculations.area} ha × ₹{formatNumber(calculations.baseRate)}/ha</Typography>
          <Typography sx={{ fontSize: 18, fontWeight: 700, mt: 2.5 }}>Additional Amount ({calculations.multiplierFactor}× multiplier)</Typography>
          <Typography sx={{ fontSize: 28, fontWeight: 900 }}>{formatCurrency(calculations.additional || calculations.base)}</Typography>
          <Typography sx={{ fontSize: 14, color: '#5a6f67' }}>Applied for rural areas</Typography>
          <Typography sx={{ fontSize: 17, fontWeight: 700, mt: 2.5 }}>Solatium @ {projectData.compensation.solatiumRate * 100} %</Typography>
          <Typography sx={{ fontSize: 20, fontWeight: 800 }}>{formatCurrency(calculations.solatium)}</Typography>
          <Typography sx={{ fontSize: 17, fontWeight: 700, mt: 1.5 }}>Total Compensation</Typography>
          <Typography sx={{ fontSize: 30, fontWeight: 900, color: '#0f5132' }}>{formatCurrency(calculations.totalComp)}</Typography>
        </Box>

        <Box sx={{ bgcolor: '#fffdfa', borderRadius: 3, p: 4, border: '1px solid #e6e9e4', flex: 1 }}>
          <Typography sx={{ fontSize: 18, fontWeight: 900, mb: 2.5 }}>DBT PAYMENT STATUS</Typography>

          <Stack spacing={3}>
            {projectData.compensation.payments.map((p) => {
              const paymentStatus = paymentStatuses[p.name] || p.status;

              return (
              <Box
                key={p.name}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Box sx={{ minWidth: 0 }}>
                  <Typography sx={{ fontSize: 17, fontWeight: 800 }}>{p.name}</Typography>
                  <Typography sx={{ fontSize: 14, color: '#5a6f67' }}>{formatCurrency(p.amount)} · {p.date || '—'}</Typography>
                </Box>

                <Stack direction="row" spacing={0.8} alignItems="center">
                  <Box
                    sx={{
                      bgcolor: statusColor[paymentStatus],
                      color: statusTextColor[paymentStatus],
                      borderRadius: 1.2,
                      px: 1.4,
                      py: 0.5,
                      fontSize: 13,
                      fontWeight: 900,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {paymentStatus}
                  </Box>
                  <Button
                    size="small"
                    variant="contained"
                    disabled={!paymentReady || paymentStatus === 'Paid' || Boolean(paying)}
                    onClick={() => payLandowner(p.name)}
                    title={paymentReady ? 'Pay this landowner' : 'Verify documents and calculate a valid compensation amount first'}
                    sx={{
                      minWidth: 52,
                      px: 1,
                      py: 0.45,
                      textTransform: 'none',
                      fontSize: 12,
                      fontWeight: 800,
                      opacity: paymentReady && paymentStatus !== 'Paid' && !paying ? 1 : 0.45,
                    }}
                  >
                    {paying === p.name ? 'Paying...' : 'Pay'}
                  </Button>
                </Stack>
              </Box>
              );
            })}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

export default CompensationCalc;
