import { useEffect, useMemo, useState } from 'react';
import { Box, Button, FormControl, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { areAllDocumentsVerified, isLandAcquired, useProjectDetail } from '../hooks/projectdetail';

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

function CompensationCalc({ projectId, projects }) {
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

    const baseMarketValue = area * baseRate * multiplierFactor;
    const solatium = baseMarketValue * projectData.compensation.solatiumRate;
    const totalComp = baseMarketValue + solatium;

    return {
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

  const paymentReady = areAllDocumentsVerified(project) && isLandAcquired(project);

  function payLandowner(name) {
    if (!paymentReady) return;
    setPaymentStatuses((current) => ({ ...current, [name]: 'Paid' }));
  }

  if (!project) return <Typography sx={{ p: 4, color: '#4d7866' }}>No project selected</Typography>;

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 980,
        bgcolor: '#eef2ed',
        borderRadius: 3,
        p: 2.8,
        boxSizing: 'border-box',
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2.7 }}>
        <Box>
          <Typography sx={{ fontSize: 28, fontWeight: 800, color: '#183f35' }}>
            Compensation &amp; Award Calculator
          </Typography>
          <Typography sx={{ fontSize: 16, color: '#4f7867', fontWeight: 500 }}>
            RFCTLARR Act — Real-time Management
          </Typography>
        </Box>

      </Stack>

      <Stack direction="row" spacing={3} sx={{ mb: 3 }}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontSize: 13, fontWeight: 800, letterSpacing: 1.2, color: '#315d4f', textTransform: 'uppercase', mb: 1.2 }}>
            Land Area (hectares)
          </Typography>
          <TextField
            fullWidth
            value={landArea}
            onChange={(e) => setLandArea(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: '#f1f4f0',
                borderRadius: 2,
                '& fieldset': { borderColor: '#d5ddd7' },
              },
            }}
          />
          <Typography sx={{ mt: 0.8, fontSize: 14, color: '#4b7366', fontWeight: 500 }}>
            Total affected area
          </Typography>
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontSize: 13, fontWeight: 800, letterSpacing: 1.2, color: '#315d4f', textTransform: 'uppercase', mb: 1.2 }}>
            Market Value (₹/HA)
          </Typography>
          <TextField
            fullWidth
            value={marketValue}
            onChange={(e) => setMarketValue(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: '#f1f4f0',
                borderRadius: 2,
                '& fieldset': { borderColor: '#d5ddd7' },
              },
            }}
          />
          <Typography sx={{ mt: 0.8, fontSize: 14, color: '#4b7366', fontWeight: 500 }}>
            As per collector rate
          </Typography>
        </Box>
      </Stack>

      <Stack direction="row" spacing={3} sx={{ mb: 3 }}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontSize: 13, fontWeight: 800, letterSpacing: 1.2, color: '#315d4f', textTransform: 'uppercase', mb: 1.2 }}>
            Rural/Urban Multiplier
          </Typography>

          <FormControl fullWidth>
            <Select
              value={multiplier}
              onChange={(e) => setMultiplier(e.target.value)}
              sx={{
                bgcolor: '#f1f4f0',
                borderRadius: 2,
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#d5ddd7' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#a9cdb8' },
              }}
            >
              <MenuItem value="Urban">Urban</MenuItem>
              <MenuItem value="Rural (2x)">Rural (2x)</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontSize: 13, fontWeight: 800, letterSpacing: 1.2, color: '#315d4f', textTransform: 'uppercase', mb: 1.2 }}>
            Land Use Type
          </Typography>

          <FormControl fullWidth>
            <Select
              value={landUse}
              onChange={(e) => setLandUse(e.target.value)}
              sx={{
                bgcolor: '#f1f4f0',
                borderRadius: 2,
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#d5ddd7' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#a9cdb8' },
              }}
            >
              {landUseOptions.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Stack>

      <Stack direction="row" spacing={3} sx={{ alignItems: 'stretch' }}>
        <Box sx={{ flex: 1.4, minWidth: 0, bgcolor: '#f4f7f3', borderRadius: 3, p: 2.4, border: '1px solid rgba(28,92,75,0.08)' }}>
          <Typography sx={{ fontSize: 14, fontWeight: 800, letterSpacing: 1.2, color: '#365f54', textTransform: 'uppercase', mb: 2 }}>
            Base Market Value
          </Typography>

          <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#183f35', mb: 1 }}>
            {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(calculations.baseMarketValue)}
          </Typography>
          <Typography sx={{ fontSize: 14, color: '#4d7866', fontWeight: 500 }}>
            Additional Amount (2x multiplier)
          </Typography>

          <Typography sx={{ fontSize: 18, fontWeight: 800, color: '#183f35', mt: 2.5 }}>
            {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(calculations.solatium)}
          </Typography>
          <Typography sx={{ fontSize: 14, color: '#4d7866', fontWeight: 500, mt: 0.5 }}>
            Applied for rural/remot e areas
          </Typography>

          <Typography sx={{ fontSize: 18, fontWeight: 800, color: '#183f35', mt: 2.5 }}>
            {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(calculations.totalComp)}
          </Typography>
          <Typography sx={{ fontSize: 14, color: '#4d7866', fontWeight: 500, mt: 0.5 }}>
            Total Compensation
          </Typography>
        </Box>

        <Box sx={{ flex: 1, minWidth: 0, bgcolor: '#f4f7f3', borderRadius: 3, p: 2.4, border: '1px solid rgba(28,92,75,0.08)' }}>
          <Typography sx={{ fontSize: 14, fontWeight: 800, letterSpacing: 1.2, color: '#365f54', textTransform: 'uppercase', mb: 2 }}>
            DBT Payment Status
          </Typography>

          <Stack spacing={1.2}>
            {projectData.compensation.payments.map((p) => {
              const paymentStatus = paymentStatuses[p.name] || p.status;

              return (
              <Box
                key={p.name}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 1,
                  bgcolor: '#f0f5f1',
                  borderRadius: 2,
                  px: 1.2,
                  py: 0.8,
                }}
              >
                <Box sx={{ minWidth: 0 }}>
                  <Typography sx={{ fontSize: 15, fontWeight: 700, color: '#183f35' }}>{p.name}</Typography>
                  <Typography sx={{ fontSize: 12, color: '#4d7866' }}>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(p.amount)}</Typography>
                </Box>

                <Stack direction="row" spacing={0.8} alignItems="center">
                  <Box
                    sx={{
                      bgcolor: statusColor[paymentStatus],
                      color: statusTextColor[paymentStatus],
                      borderRadius: 1.5,
                      px: 1.1,
                      py: 0.45,
                      fontSize: 12,
                      fontWeight: 800,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {paymentStatus}
                  </Box>
                  <Button
                    size="small"
                    variant="contained"
                    disabled={!paymentReady || paymentStatus === 'Paid'}
                    onClick={() => payLandowner(p.name)}
                    title={paymentReady ? 'Pay this landowner' : 'All documents must be verified and land must be acquired'}
                    sx={{
                      minWidth: 48,
                      px: 1,
                      py: 0.45,
                      textTransform: 'none',
                      fontSize: 12,
                      fontWeight: 800,
                      opacity: paymentReady && paymentStatus !== 'Paid' ? 1 : 0.45,
                    }}
                  >
                    Pay
                  </Button>
                </Stack>
              </Box>
              );
            })}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

export default CompensationCalc;
