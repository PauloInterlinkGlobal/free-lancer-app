'use client';

import { useLoginState } from './useLoginState';

export function useLoginForm() {
  const s = useLoginState();

  const handleNextStep = () => {
    const trimmed = s.email.trim();
    if (!trimmed) {
      s.setEmailError('Introduza um e-mail ou telefone.');
      s.emailRef.current?.focus();
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      s.setEmailError('Introduza um e-mail válido.');
      s.emailRef.current?.focus();
      return;
    }
    s.setEmailError('');
    s.setIsLoading(true);
    setTimeout(() => {
      s.setIsLoading(false);
      s.setDirection(1);
      s.setStep('password');
    }, 350);
  };

  const handleBack = () => {
    s.setPasswordError('');
    s.setDirection(-1);
    s.setStep('email');
  };

  return { ...s, handleNextStep, handleBack };
}
