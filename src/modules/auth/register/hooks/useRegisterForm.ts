'use client';

import { useRegisterState } from './useRegisterState';

export function useRegisterForm() {
  const s = useRegisterState();

  const validateInfo = () => {
    const e: Record<string, string> = {};
    if (!s.firstName.trim()) e.firstName = 'Introduza o seu nome.';
    if (!s.lastName.trim()) e.lastName = 'Introduza o seu apelido.';
    if (!s.email.trim()) e.email = 'Introduza um endereço de e-mail.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.email.trim()))
      e.email = 'Introduza um endereço de e-mail válido.';
    s.setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validatePassword = () => {
    const e: Record<string, string> = {};
    if (!s.password) e.password = 'Introduza uma palavra-passe.';
    else if (s.password.length < 8)
      e.password = 'Utilize 8 carateres ou mais para a palavra-passe.';
    if (!s.confirmPassword) e.confirmPassword = 'Confirme a sua palavra-passe.';
    else if (s.password !== s.confirmPassword)
      e.confirmPassword = 'As palavras-passe não coincidem.';
    s.setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (!validateInfo()) return;
    s.setIsLoading(true);
    setTimeout(() => {
      s.setIsLoading(false);
      s.setDirection(1);
      s.setStep('password');
    }, 350);
  };

  const handleBack = () => {
    s.setErrors({});
    s.setDirection(-1);
    s.setStep('info');
  };

  return { ...s, validatePassword, handleNext, handleBack };
}
