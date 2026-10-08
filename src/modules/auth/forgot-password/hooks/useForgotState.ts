import { useState, useRef, useEffect } from 'react';

export function useForgotState() {
  const [step, setStep] = useState<'email' | 'code' | 'newPassword'>('email');
  const [direction, setDirection] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const codeRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      if (step === 'email') emailRef.current?.focus();
      else if (step === 'code') codeRef.current?.focus();
      else passwordRef.current?.focus();
    }, 250);
    return () => clearTimeout(t);
  }, [step]);

  const clearError = (f: string) => {
    setErrors((p) => {
      const n = { ...p };
      delete n[f];
      return n;
    });
  };

  return {
    step,
    setStep,
    direction,
    setDirection,
    email,
    setEmail,
    code,
    setCode,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    errors,
    setErrors,
    isLoading,
    setIsLoading,
    emailRef,
    codeRef,
    passwordRef,
    clearError,
  };
}
