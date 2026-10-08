'use client';

import { useState } from 'react';
import { AccountActivationStatus } from '../interfaces/pending-activation';

export function usePendingActivation(
  initialStatus: AccountActivationStatus = 'pending'
) {
  const [status, setStatus] = useState<AccountActivationStatus>(initialStatus);
  const [isChecking, setIsChecking] = useState(false);

  const checkStatus = () => {
    setIsChecking(true);
    setTimeout(() => {
      setIsChecking(false);
    }, 700);
  };

  const simulateApproval = () => {
    setStatus('approved');
  };

  const simulateRejection = () => {
    setStatus('rejected');
  };

  return {
    status,
    isChecking,
    checkStatus,
    simulateApproval,
    simulateRejection,
  };
}

export default usePendingActivation;
