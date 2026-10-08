'use client';

import { useForgotState } from './useForgotState';

export function useForgotPasswordForm() {
  const s = useForgotState();

  const handleSendCode = () => {
    const trimmed = s.email.trim();
    if (!trimmed) {
      s.setErrors({ email: 'Introduza o seu endereço de e-mail.' });
      s.emailRef.current?.focus();
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      s.setErrors({ email: 'Introduza um endereço de e-mail válido.' });
      s.emailRef.current?.focus();
      return;
    }
    s.setErrors({});
    s.setIsLoading(true);
    setTimeout(() => {
      s.setIsLoading(false);
      s.setDirection(1);
      s.setStep('code');
    }, 350);
  };

  const handleVerifyCode = () => {
    if (!s.code.trim()) {
      s.setErrors({ code: 'Introduza o código de verificação.' });
      s.codeRef.current?.focus();
      return;
    }
    if (s.code.trim().length < 6) {
      s.setErrors({ code: 'O código deve ter 6 dígitos.' });
      s.codeRef.current?.focus();
      return;
    }
    s.setErrors({});
    s.setIsLoading(true);
    setTimeout(() => {
      s.setIsLoading(false);
      s.setDirection(1);
      s.setStep('newPassword');
    }, 350);
  };

  const validateNewPassword = () => {
    const e: Record<string, string> = {};
    if (!s.password) e.password = 'Introduza uma nova palavra-passe.';
    else if (s.password.length < 8)
      e.password = 'Utilize 8 carateres ou mais para a palavra-passe.';
    if (!s.confirmPassword)
      e.confirmPassword = 'Confirme a nova palavra-passe.';
    else if (s.password !== s.confirmPassword)
      e.confirmPassword = 'As palavras-passe não coincidem.';
    s.setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleBack = () => {
    s.setErrors({});
    s.setDirection(-1);
    if (s.step === 'code') s.setStep('email');
    else if (s.step === 'newPassword') s.setStep('code');
  };

  return {
    ...s,
    handleSendCode,
    handleVerifyCode,
    validateNewPassword,
    handleBack,
  };
}
