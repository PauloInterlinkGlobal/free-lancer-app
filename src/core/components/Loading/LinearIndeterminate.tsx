'use client';

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

interface LinearIndeterminateProps {
  className?: string;
}

export function LinearIndeterminate({
  className = '',
}: LinearIndeterminateProps) {
  return (
    <Box sx={{ width: '100%' }} className={className}>
      <LinearProgress
        aria-label="Loading…"
        sx={{
          height: 4,
          backgroundColor: 'rgb(var(--color-primary) / 0.2)',
          '& .MuiLinearProgress-bar': {
            backgroundColor: 'rgb(var(--color-primary))',
          },
        }}
      />
    </Box>
  );
}

export default LinearIndeterminate;
