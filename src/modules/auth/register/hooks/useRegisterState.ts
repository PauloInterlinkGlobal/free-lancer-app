import { useState, useRef, useEffect } from 'react';

export function useRegisterState() {
  const [step, setStep] = useState<'info' | 'password'>('info');
  const [direction, setDirection] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const firstNameRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      if (step === 'info') firstNameRef.current?.focus();
      else passwordInputRef.current?.focus();
    }, 250);
    return () => clearTimeout(t);
  }, [step]);

  const clearError = (f: string) => {
    setErrors((prev) => {
      const n = { ...prev };
      delete n[f];
      return n;
    });
  };

  return {
    step,
    setStep,
    direction,
    setDirection,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    phone,
    setPhone,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    errors,
    setErrors,
    isLoading,
    setIsLoading,
    firstNameRef,
    passwordInputRef,
    clearError,
  };
}
